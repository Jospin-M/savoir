import { type Buffer, sendAuthenticatedHTTPRequest } from "./utils.ts";

export type ProfileLanguageItem = {
    id: number,
    name: string,
    proficiency: "Fluent" | "Intermediate" | "Beginner"
}

export type ProfileData = {
    fullName: string,
    bio: string,
    profilePhoto: {
        buffer: Buffer,
        location: string
    },
    coverPhoto: {
        buffer: Buffer,
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

export type Entity = {
    id: string
    name: string
};

export type Language = Entity;

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

export type Category = Entity;

export async function getCategories(): Promise<Category[]> {
    const { data } = await sendAuthenticatedHTTPRequest(`/skills/categories`, "GET");
    
    return data;
}
