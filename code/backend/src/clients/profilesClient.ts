import { createAuthenticatedClient } from "./supabaseClient";
import { Request, Response } from "express";

/**
 * Retrieves the languages known by the user along with their profiency levels in those languages.
 */
async function getUserLanguages(req: Request) {
    const { data } = await createAuthenticatedClient(req)
        .from("users_languages")
        .select(`
            proficiency,
            language_id(id,name)
        `);

    // the data is explicitly casted here to ensure that we can access the 'name' 
    // property of the 'language_id' object returned by supabase
    type LanguageData = {
        id: number
        language_id: { id: number, name: string },
        proficiency: string
    }

    const rawLanguageData = data as unknown as LanguageData[];
    
    const processedLanguageData: { id: number, name: string, proficiency: string }[] = [];
    rawLanguageData?.forEach((langData: LanguageData) => {
        processedLanguageData.push({ 
            id: langData.language_id.id,
            name: langData.language_id.name,
            proficiency: langData.proficiency
         });
    });

    return processedLanguageData;
}

async function getPictures(paths: string[], req: Request) {
    const buffers: Buffer[] = [];
    const promises = [];
    
    for(const path of paths) {
        const { data } = await createAuthenticatedClient(req)
            .storage
            .from("user-images")
            .download(path);
            
        if(data) {
            promises.push(data.arrayBuffer());
        }
    }

    const results = await Promise.all(promises)
    results.forEach(buffer => {
        buffers.push(Buffer.from(buffer))
    });
    return buffers;
}

/**
 * Retrieves the profile information of a user.
 * 
 * @param req - a request containing the id of the user whose profile will be retrieved
 * @param res - a response with the user's profile information
 */
export async function getProfile(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    const { data, error } = await supabaseClient
        .from("users")
        .select("first_name,last_name,bio,profile_photo_path,cover_photo_path")
        .maybeSingle();
        
    if(error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    const { first_name, last_name, bio, profile_photo_path, cover_photo_path } = data!;
    const [languageData, buffers] = await Promise.all([
        getUserLanguages(req),
        getPictures([profile_photo_path, cover_photo_path], req)
    ]);
    
    res.status(200).json({
        fullName: first_name + " " + last_name,
        bio: bio,
        profilePhoto: { buffer: buffers[0], location: profile_photo_path },
        coverPhoto: { buffer: buffers[1], location: cover_photo_path },
        languages: languageData
    });
}

type UpdatedProfileData = {
    name: string,
    bio: string,
    languages: { id: number, name: string, proficiency: string }[],
    coverPhoto: string,
    profilePhoto: string
}

/**
 * Updates the profile information of a user.
 * 
 * @param req - a request containing the id of the user whose profile will be retrieved
 * @param res - a response with the user's profile information
 */
export async function updateProfile(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    const { name, bio, coverPhoto, profilePhoto, languages }: UpdatedProfileData = req.body;
    const [first_name, last_name] = name.split(/ (.+)/).filter(Boolean);

    await supabaseClient
        .from("users")
        .upsert({ 
            first_name: first_name, 
            last_name: last_name, 
            bio: bio, 
            profile_photo_path: profilePhoto, 
            cover_photo_path: coverPhoto 
        });
    
    const { data: { user } } = await supabaseClient.auth.getUser();
    const { id } = user!;
  
    await supabaseClient
        .rpc("update_user_languages", {
            new_rows: languages,
            user_uuid: id
        });
    
    res.status(200).json({ message: "Profile successfully updated." });
}

export async function getAuthenticatedUserSkills(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    const { data: { user } }  = await supabaseClient.auth.getUser();
    const { data } = await supabaseClient
        .from("skills")
        .select()
        .eq("user_id", user!.id);

    res.status(200).json(data);
}