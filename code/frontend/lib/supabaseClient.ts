import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function parseAuthFragment() {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    
    return {
        access_token: params.get("access_token"),
        refresh_token: params.get("refresh_token"),
        expires_in: params.get("expires_in"),
        token_type: params.get("token_type"),
        type: params.get("type")
    }
}

export default supabase;