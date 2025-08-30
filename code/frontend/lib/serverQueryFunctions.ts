import { getSupabaseSession } from "../utils/supabase/server";
import { sendAuthenticatedHTTPRequest } from "./utils";

export async function getProfileData(id: string)  {
    return await sendAuthenticatedHTTPRequest(
        `/profiles/${id}`, 
        "GET", 
        undefined, 
        await getSupabaseSession(), 
        {
            cache: "force-cache",
            next: { tags: ["user-profile"] }
        }
    );
}

export async function getLanguages() {
    return await sendAuthenticatedHTTPRequest(
        "/references/languages",
        "GET", 
        undefined, 
        await getSupabaseSession(), 
        {
            cache: "force-cache"
        }
    );
}

export async function getCategories() {
    return await sendAuthenticatedHTTPRequest(
        "/skills/categories",
        "GET", 
        undefined, 
        await getSupabaseSession(), 
        {
            cache: "force-cache"
        }
    );
}