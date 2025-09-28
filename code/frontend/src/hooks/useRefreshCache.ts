import { revalidateTag } from "../../app/lib/actions";
import { sendAuthenticatedHTTPRequest } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type QueryKey = { 
    key: string
    param?: string
}

export function useRefreshCache<T extends object>(endpoint: string, method: string, queryKey: QueryKey) {
    const queryClient = useQueryClient();
    const fullQueryKey = queryKey.param ? [queryKey.key, queryKey.param]: [queryKey.key]; // Build consistent key
    
    const { mutate } = useMutation({
        mutationFn: async (updatedData: T) => {
            const cachedData = queryClient.getQueryData(fullQueryKey)
            const isDataUpdated = JSON.stringify(cachedData) !== JSON.stringify(updatedData);
            
            if(isDataUpdated) {
                await sendAuthenticatedHTTPRequest(endpoint, method, updatedData);
            } else {
                throw new Error("NO_CHANGES");
            }
        },

        onMutate: async function() {
            await queryClient.cancelQueries({ queryKey: fullQueryKey });
            
            // Snapshot previous data
            const previousData = queryClient.getQueryData(fullQueryKey);
            
            return { previousData };
        },

        onError: (err, _updatedData, context) => {
            if(err.message !== "NO_CHANGES") {
                queryClient.setQueryData(fullQueryKey, context?.previousData);
            }
        },
    
        onSuccess: () => {
            // invalidate cache 
            revalidateTag(queryKey.key)
        }
    });
    
    function refresh(updatedData: T) {
        mutate(updatedData);
    }

    return { refresh };
}