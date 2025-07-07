import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

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

export default supabase;