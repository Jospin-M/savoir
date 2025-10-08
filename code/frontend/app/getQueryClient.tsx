import { isServer, QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined

function makeQueryClient() {
    return new QueryClient();
}

export function getQueryClient() {
    if(isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        if(!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
