import { useUserStore } from "../stores/useUserStore";
import { revalidateTag } from "../../app/lib/actions";
import { sendAuthenticatedHTTPRequest } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type QueryKey = { 
    key: string
    param?: string
}

export function useRefreshCache<T extends object>(endpoint: string, method: string, queryKey: QueryKey) {
    const queryClient = useQueryClient();
    const userID = useUserStore(state => state.userID);
    const fullQueryKey = queryKey.param ? [queryKey.key, queryKey.param]: [queryKey.key]; // Build consistent key

    const { mutate } = useMutation({
        mutationFn: async (updatedData: T) => {
            await sendAuthenticatedHTTPRequest(endpoint, method, updatedData);
        },

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: fullQueryKey });
            
            // Snapshot previous data
            const previousData = queryClient.getQueryData(fullQueryKey);

            const tag = `${queryKey.key}-${userID}`;
            
            // invalidate Next cache 
            revalidateTag(tag)

            return { previousData };
        },

        onError: (_err, _updatedData, context) => {
            queryClient.setQueryData(fullQueryKey, context?.previousData);
        }
    });
    
    function refresh(updatedData: T) {
        mutate(updatedData);
    }

    return { refresh };
}