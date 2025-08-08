import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * A browser client for Supabase that manages the user's session.
 */
const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

export default supabase;

/**
 * Creates an HTTP request object.
 * 
 * @param method - the HTTP method of the request.
 * @param body - the payload sent from the browser.
 */
function createHTTPRequest(method: string, body: object) {
    return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
}

/**
 * Sends a request to the server and receives the response.
 * 
 * @param endpoint - the location of the requested resource.
 * @param method - the HTTP method to be used.
 * @param payload - the data to be sent
 * 
 * @returns the server's response
 */
export async function sendHTTPRequest(endpoint: string, method: string, payload: object) {
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, createHTTPRequest(method, payload));
    const response = await result.json();
    
    return response;
}

/**
 * Create a request to the server that is authenticated by the access token provided with the user's session.
 * 
 * @param method - the HTTP method to use
 * @param body - the payload sent from the browser.
 */
async function createAuthenticatedHTTPRequest(method: string, body: object) {
    const { data: { session } } = await supabase.auth.getSession();
    const { access_token } = session!;

    if(method === "GET") {
        return {
            method: method,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        };
    }

    return {
        method: method,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(body)
    };
}

/**
 * Sends an authenticated request to the server and receives the response.
 * 
 * @param endpoint - the location of the requested resource.
 * @param method - the HTTP method to be used.
 * @param payload - the data to be sent
 * 
 * @returns the server's response
 */
export async function sendAuthenticatedHTTPRequest(endpoint: string, method: string, payload: object) {
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, await createAuthenticatedHTTPRequest(method, payload));
    const response = await result.json();

    return response;
}