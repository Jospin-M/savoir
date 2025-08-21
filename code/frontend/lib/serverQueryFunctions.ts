import { getSupabaseSession } from "../utils/supabase/server";
import { sendAuthenticatedHTTPRequest } from "./utils";

export async function getProfileData(id: string)  {
    return await sendAuthenticatedHTTPRequest(`/profiles/${id}`, "GET", {}, await getSupabaseSession());
}

export async function getLanguages() {
    return await sendAuthenticatedHTTPRequest("/references/languages", "GET", {}, await getSupabaseSession());
}