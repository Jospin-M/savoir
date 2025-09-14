import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom React Query hook for fetching and caching data.
 *
 * @param queryKey - Unique key array used by React Query to identify and cache the query's data.
 * @param queryFunction - Function responsible for making the request that retrieves the data. 
 *                                   Receives the `id` as its single argument.
 * @param id - the unique identifier of the user making the request
 */
export function useData<T>(queryKey: string[], queryFunction: (id?: string) => Promise<T>, id?: string) {
    const { data, refetch,  } = useQuery({
        queryKey: queryKey,
        queryFn: () => id ? queryFunction(id): queryFunction(),
        enabled: id ? Boolean(id): true, // only run when id exists
        staleTime: Infinity, // 5 minutes, treat cached data as fresh
        refetchOnMount: false,   
        refetchOnWindowFocus: false
    });

    return { data: data as T, refetch };
}

/**
 * Checks if the cached query data differs from the provided current value by performing
 * a deep comparison using JSON serialization.
 * 
 * @param queryKey - The React Query key used to identify the cached data.
 * @param currentValue - The current value to compare against the cached data.
 */
export function isDataUpdated<T>(queryKey: string[], currentValue: T) {
    const { data } = useData(queryKey, () => new Promise((_resolve, _reject) => {}));
    console.log(JSON.stringify(data) !== JSON.stringify(currentValue))
    console.log(data, currentValue)
    return JSON.stringify(data) !== JSON.stringify(currentValue);
}