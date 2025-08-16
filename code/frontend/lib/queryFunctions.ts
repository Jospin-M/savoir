import supabase, { sendAuthenticatedHTTPRequest } from "../lib/utils.ts";
import type { LanguageItem } from "../src/components/profile/edit_profile/Languages.tsx";

export type ProfileData = {
    fullName: string,
    bio: string,
    profileImageUrl: string,
    coverImageUrl: string,
    languages: LanguageItem[]
}

/**
 * Retrieves the necessary data for the profile page to be populated.
 * 
 * @param id - the user's id
 */
export async function getProfileData(id?: string): Promise<ProfileData> {
    const { data: { session } } = await supabase.auth.getSession();
    const data = await sendAuthenticatedHTTPRequest(`/profile/${id}`, "GET", {}, session?.access_token!);
    
    return data;
}

export type LanguageNameOnly = {
    name: string
}

/**
 * Retrieves the list of languages the user can potentially add to their profile.
 * 
 * NOTE: "Potentially" is used here since the user can only select a maximum of 5 languages, but
 * the response contains a list longer than 5.
 */
export async function getLanguages(): Promise<LanguageNameOnly[]> {
    const { data: { session } } = await supabase.auth.getSession();
    const data = await sendAuthenticatedHTTPRequest(`/reference/languages`, "GET", {}, session?.access_token!);
    
    return data;
}
