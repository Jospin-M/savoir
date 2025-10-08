import { createClient, getSupabaseSession } from "../utils/supabase/server";
import { sendAuthenticatedHTTPRequest } from "./utils";

export type ProfileLanguageItem = {
    id: number,
    name: string,
    proficiency: "Fluent" | "Intermediate" | "Beginner"
}

type Photo = {
    url: string,
    location: string
}

export type ProfileData = {
    fullName: string,
    bio: string,
    profilePhoto: Photo
    coverPhoto: Photo,
    languages: ProfileLanguageItem[]
}

async function makeRequest(endpoint: string, tag?: string) {
    return await sendAuthenticatedHTTPRequest(
        endpoint, 
        "GET", 
        undefined, 
        await getSupabaseSession(), 
        {
            cache: "force-cache",
            next: { tags: [tag ? tag: ""] }
        }
    );
}

/**
 * Retrieves the necessary data for the profile page to be populated.
 * 
 * @param id - the user's id
 */
export async function getProfileData(id?: string): Promise<ProfileData>  {
    return await makeRequest(`/profiles/${id}`, `user-profile-${id}`);
}

export type Entity = {
    id: number
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
    return await makeRequest("/references/languages", "languages");
}

export type Category = Entity;

export async function getCategories(): Promise<Category[]> {
    return await makeRequest("/skills/categories", "categories");
}

export type Skill = {
    id?: number
    user_id?: string
    name: string
    category_id: number
    level: string
    description: string
    prerequisites: string
    materials_needed: string
    active?: boolean
}

export async function getAuthenticatedUserSkills(): Promise<Skill[]> {
    const { data: { user } } = await (await createClient()).auth.getUser();
    const { id } = user!;

    return await makeRequest("/profiles/me/skills", `user-skills-${id}`);
}