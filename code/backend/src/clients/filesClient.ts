import { createAuthenticatedClient } from "./supabaseClient";

import { Request, Response } from "express";

export async function getPresignedURL(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    const uploadURLS: Record<string, { 
        signedUrl: string; 
        token: string; 
        path: string;
        updated_at: number } | null> = {};
        
    const { bucket, folders: folderNames, id }: { bucket: string, folders: string[], id: string } = req.body;

    for(const folder of folderNames) {
        const updated_at = Date.now();
        const { data } = await supabaseClient
            .storage
            .from(bucket)
            .createSignedUploadUrl(`${folder}/${id}?t=${updated_at}`, { upsert: true });

        const folderData = { ...data!, updated_at }
        uploadURLS[folder] = folderData;
    }
   
    res.status(201).json({ folderInformation: uploadURLS, message: "Signed upload URL successfully generated." });
}