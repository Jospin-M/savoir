import { createAuthenticatedClient } from "./supabaseClient";
import { Request, Response } from "express";
import type { SupabaseClient } from "@supabase/supabase-js";

function createSupabaseClient(req: Request): SupabaseClient<any, "public", any> {
    const access_token: string = req.headers.authorization!;

    return createAuthenticatedClient(access_token);
}

/**
 * Retrieves the languages known by the user along with their profiency levels in those languages.
 */
async function getUserLanguages(req: Request) {
    const { data } = await createSupabaseClient(req)
        .from("users_languages")
        .select(`
            proficiency,
            language_id(id,name)
        `);

    // the data is explicitly casted here to ensure that we can access the 'name' 
    // property of the 'language_id' object returned by supabase
    type LanguageData = {
        id: number
        language_id: { name: string },
        proficiency: string
    }

    const rawLanguageData = data as unknown as LanguageData[];
    const processedLanguageData: { id: number, name: string, proficiency: string }[] = [];
    rawLanguageData?.forEach((langData: any) => {
        processedLanguageData.push({ 
            id: langData.language_id.id,
            name: langData.language_id.name,
            proficiency: langData.proficiency
         });
    });

    return processedLanguageData;
}

/**
 * Retrieves the profile information of a user.
 * 
 * @param req - a request containing the id of the user whose profile will be retrieved
 * @param res - a response with the user's profile information
 */
export async function getProfile(req: Request, res: Response) {
    const supabaseClient = createSupabaseClient(req);
    const { data, error } = await supabaseClient
        .from("users")
        .select("first_name,last_name,bio,profile_photo_url,cover_photo_url")
        .maybeSingle();
        
    if(error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    const { first_name, last_name, bio, profile_photo_url, cover_photo_url } = data!;
    const languageData = await getUserLanguages(req) ;
    
    res.status(200).json({
        fullName: first_name + " " + last_name,
        bio: bio,
        profileImageUrl: profile_photo_url,
        coverImageUrl: cover_photo_url,
        languages: languageData
    });
}

type UpdatedProfileData = {
    coverPhoto: { file: File, url: string },
    profilePhoto: { file: File, url: string },
    name: string,
    bio: string,
    languages: { id: number, name: string, proficiency: string }[]
}

export async function updateProfile(req: Request, res: Response) {
    const { coverPhoto, profilePhoto, name, bio, languages }: UpdatedProfileData = req.body;

    // investigate updating cover and profile photos with s3. this should happen first, then we use the urls provided to update the users
    // record - this is only if there isn't an automatic update. check rules for this
    const supabaseClient = createSupabaseClient(req);
    const [first_name, last_name] = name.split(/ (.+)/).filter(Boolean);

    await supabaseClient
        .from("users")
        .upsert({ first_name: first_name, last_name: last_name, bio: bio });
    
    const { data: { user } } = await supabaseClient.auth.getUser();
    const { id } = user!;
    await supabaseClient
        .rpc("update_user_languages", {
            new_rows: languages,
            user_uuid: id
        });
    
    res.status(200).json({ message: "Profile successfully updated." });
}