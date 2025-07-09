import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
function createHTTPRequest(method: string, body: Object) {
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
export async function sendHTTPRequest(endpoint: string, method: string, payload: Object) {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
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
export async function sendAuthenticatedHTTPRequest(endpoint: string, method: string, payload: Object) {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, await createAuthenticatedHTTPRequest(method, payload));
    const response = await result.json();

    return response;
}

/**
 * Parses the fragment identifier that appears in the browser URL when the user is changing their password
 * to obtain their current session.
 * 
 * @returns an object containing access and refresh tokens.
 */
export function parseAuthFragment() {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    
    return {
        access_token: params.get("access_token"),
        refresh_token: params.get("refresh_token")
    }
}

export async function getAuthenticatedUserId() {
    const { data: { user } } = await supabase.auth.getUser();
    const { id } = user!;

    return id;
}

/**
 * Retrieves a cookie from localStorage.
 * 
 * @param name - the name of the cookie
 */
function getCookie(name: string) {
    const cookies = document.cookie.split(";");

    for(let cookie of cookies) {
        const [key, value] = cookie.split("=");

        if(key.trim() === name) {
            return decodeURIComponent(value);
        }
    }

    return null;
}

/**
 * Save the user's uid to localStorage so that calls to the API are reduced.
 * 
 * @param userID - the user's uid obtained after authentication
 */
export function saveUserID(userID: string) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

    document.cookie = `user_id=${encodeURIComponent(userID)}; expires=${expires}; path=/`;
}

export function getUserID() {
    return getCookie("user_id");
}