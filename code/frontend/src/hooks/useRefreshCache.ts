import { sendAuthenticatedHTTPRequest } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type QueryKey = { 
    key: string
    param?: string
}

export function useRefreshCache<T>(endpoint: string, queryKey: QueryKey) {
    const qc = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (updatedData: T[]) => {
            return await sendAuthenticatedHTTPRequest(endpoint, "POST", updatedData)
        },

        onMutate: async function(updatedData: T[]) {
            await qc.cancelQueries({ queryKey: [queryKey.key, queryKey.param] });

            // snapshot the previous data
            const previousData = qc.getQueryData([queryKey.key, queryKey.param]);

            // optimistically update the cache 
            qc.setQueryData([queryKey.key], () => updatedData);

            // return context value with snapshotted data
            return { previousData };
        },

        // roll back on mutation fail
        onError: (_err, _updateSkills, context) => {
            qc.setQueryData([queryKey.key], context?.previousData);
        },

        // trigger a refetch to update the cache after we have sent the request
        onSettled: () => {
            qc.invalidateQueries({ queryKey: [queryKey.key] });
        }
    });

    function refresh(updatedData: T[]) {
        mutate(updatedData);
    }

    return { refresh };
}