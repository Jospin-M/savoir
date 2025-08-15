import { createAuthenticatedClient } from "./supabaseClient";
import { Request, Response } from "express";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Retrieves the profile information of a user.
 * 
 * @param req - a request containing the id of the user whose profile will be retrieved
 * @param res - a response with the user's profile information
 */
export async function getProfile(req: Request, res: Response) {
    const userID = req.params.id;
    const accessToken: string = req.headers.authorization!;
    const supabaseClient = createAuthenticatedClient(accessToken);

    const { data, error } = await supabaseClient
        .from("users")
        .select("first_name,last_name,bio,profile_photo_url,cover_photo_url")
        .eq("id", userID)
        .maybeSingle();
        
    if(error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    const { first_name, last_name, bio, profile_photo_url, cover_photo_url } = data!;
    const languageData = await getUserLanguages(supabaseClient, userID) ;
    
    res.status(201).json({
        fullName: first_name + " " + last_name,
        bio: bio,
        profileImageUrl: profile_photo_url,
        coverImageUrl: cover_photo_url,
        languages: languageData
    });
}

/**
 * Retrieves the languages known by the user along with their profiency levels in those languages.
 * 
 * @param supabaseClient - the supabase client used to communicate with the database
 * @param userID - the unique identifier of the user
 */
async function getUserLanguages(supabaseClient: SupabaseClient<any, "public", any>, userID: string) {
    const { data } = await supabaseClient
        .from("users_languages")
        .select(`
            proficiency,
            language_id(name)`) 
        .eq("user_id", userID);

    // the data is explicitly casted here to ensure that we can access the 'name' 
    // property of the 'language_id' object returned by supabase
    type LanguageData = {
        language_id: { name: string },
        proficiency: string
    }

    const rawLanguageData = data as unknown as LanguageData[];
    const processedLanguageData: { name: string, proficiency: string }[] = [];
    rawLanguageData?.forEach((langData: any) => {
        processedLanguageData.push({ 
            name: langData.language_id.name,
            proficiency: langData.proficiency
         });
    });

    return processedLanguageData;
}