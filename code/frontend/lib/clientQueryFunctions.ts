import { sendAuthenticatedHTTPRequest } from "./utils.ts";

export type ProfileLanguageItem = {
    id: number,
    name: string,
    proficiency: "Fluent" | "Intermediate" | "Beginner"
}

export type ProfileData = {
    fullName: string,
    bio: string,
    profilePhoto: {
        buffer: { data: number[], name: string },
        location: string
    },
    coverPhoto: {
        buffer: { data: number[], name: string },
        location: string
    },
    languages: ProfileLanguageItem[]
}

/**
 * Retrieves the necessary data for the profile page to be populated.
 * 
 * @param id - the user's id
 */
export async function getProfileData(id?: string): Promise<ProfileData> {
    const data = await sendAuthenticatedHTTPRequest(`/profiles/${id}`, "GET");
    
    return data;
}

export type Language = {
    id: string,
    name: string
}

/**
 * Retrieves the list of languages the user can potentially add to their profile.
 * 
 * NOTE: "Potentially" is used here since the user can only select a maximum of 5 languages, but
 * the response returned by the server contains a list longer than 5.
 */
export async function getLanguages(): Promise<Language[]> {
    const data = await sendAuthenticatedHTTPRequest(`/references/languages`, "GET");
    
    return data;
}
