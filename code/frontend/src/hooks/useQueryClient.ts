import { useQuery } from "@tanstack/react-query";

/**
 * Custom React Query hook for fetching and caching data tied to a specific ID.
 *
 * @param queryKey - Unique key array used by React Query to identify and cache the query's data.
 * @param queryFunction - Function responsible for making the request that retrieves the data. 
 *                                   Receives the `id` as its single argument.
 * @param id - the unique identifier of the user making the request
 */
export function useQueryClient<T>(queryKey: string[], queryFunction: (id?: string) => Promise<T>, id?: string) {
    const { data, refetch } = useQuery({
        queryKey: queryKey,
        queryFn: () => id ? queryFunction(id): queryFunction(),
        enabled: id ? Boolean(id): true, // only run when id exists
        staleTime: Infinity, // 5 minutes, treat cached data as fresh
        refetchOnMount: false,   
        refetchOnWindowFocus: false
    });

    // attach a type to the data that matches the shape of the expected response
    const typedData =  data as T;

    return { data: typedData, refetch };
}