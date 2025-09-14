import { sendAuthenticatedHTTPRequest } from "../../lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore, type UserState } from "../stores/useUserStore";
import { useData } from "./useQueryClient";

type QueryKey = { 
    key: string
    param?: string
}

export function useRefreshCache<T>(endpoint: string, queryKey: QueryKey) {
    const queryClient = useQueryClient();
    const { refetch } = useData([queryKey.key], () => sendAuthenticatedHTTPRequest("/profiles/me/skills", "GET"))
    
    const { mutate } = useMutation({
        mutationFn: async (updatedData: T[]) => {
            await sendAuthenticatedHTTPRequest(endpoint, "POST", updatedData);
            //await refetch();
        },

        onMutate: async function(updatedData: T[]) {
            await queryClient.cancelQueries({ queryKey: [queryKey.key, queryKey.param] });
            console.log("updating cache", updatedData)
            // snapshot the previous data
            const previousData = queryClient.getQueryData([queryKey.key, queryKey.param]);

            // optimistically update the cache 
            console.log(queryKey.key)
            //queryClient.setQueryData([queryKey.key], updatedData);
            queryClient.invalidateQueries({ queryKey: [queryKey.key] });
            

            // return context value with snapshotted data
            return { previousData };
        },

        // roll back on mutation fail
        onError: (_err, _updateSkills, context) => {
            
            queryClient.setQueryData([queryKey.key], context?.previousData);
        },

        // trigger a refetch to update the cache after we have sent the request
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey.key] });
        }
    });

    function refresh(updatedData: T[]) {
        mutate(updatedData);
    }

    return { refresh };
}