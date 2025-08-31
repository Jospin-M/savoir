import { getSupabaseSession } from "../utils/supabase/server";
import { type Buffer, sendAuthenticatedHTTPRequest } from "./utils";

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
export async function getProfileData(id?: string): Promise<ProfileData>  {
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

export type Category = Entity;

export async function getCategories(): Promise<Category[]> {
    return await sendAuthenticatedHTTPRequest("/skills/categories", "GET");
}

/**
 *  The use of the word 'Authenticated' before 'Skill' is to differentiate the result of skill requests that will return  
    skill objects with an 'active' state (in the case of the authenticated user making the request) from those that don't need 
    to know the 'active' state of the skill (public users)
 */
export type AuthenticatedSkill = {
    id: number
    user_id: string
    name: string
    category_id: string
    level: string
    description: string
    prerequisites: string
    materials_needed: string
    active: boolean
}

export async function getAuthenticatedUserSkills(): Promise<AuthenticatedSkill[]> {
    return await sendAuthenticatedHTTPRequest(
        "/profiles/me/skills",
        "GET", 
        undefined, 
        await getSupabaseSession(), 
        {
            cache: "force-cache"
        }
    );
}