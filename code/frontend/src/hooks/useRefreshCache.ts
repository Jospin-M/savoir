import { sendAuthenticatedHTTPRequest } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useData } from "./useQueryClient";
import { getAuthenticatedUserSkills } from "../../lib/queryFunctions";

type QueryKey = { 
    key: string
    param?: string
}

export function useRefreshCache<T>(endpoint: string, queryKey: QueryKey) {
    const queryClient = useQueryClient();
    const fullQueryKey = queryKey.param ? [queryKey.key, queryKey.param]: [queryKey.key]; // Build consistent key
    const { refetch } = useData([queryKey.key], () => new Promise((_resolve, _reject) => {}));
    
    const { mutate } = useMutation({
        mutationFn: async (updatedData: T[]) => {
            await sendAuthenticatedHTTPRequest(endpoint, "POST", updatedData);
        },

        onMutate: async function(updatedData: T[]) {
            await queryClient.cancelQueries({ queryKey: fullQueryKey });
            
            // Snapshot previous data
            const previousData = queryClient.getQueryData(fullQueryKey);
            
            // Update cache with same key
            await queryClient.setQueryData(fullQueryKey, updatedData);
            
            return { previousData };
        },

        onError: (_err, _updateData, context) => {
            const fullQueryKey = queryKey.param 
                ? [queryKey.key, queryKey.param] 
                : [queryKey.key];
            queryClient.setQueryData(fullQueryKey, context?.previousData);
        },
    
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: [queryKey.key] });
            await queryClient.fetchQuery({
                queryKey: fullQueryKey,
                queryFn: getAuthenticatedUserSkills
            });
            await refetch();
        }
    });
    function refresh(updatedData: T[]) {
        mutate(updatedData);
    }

    return { refresh };
}