import { createAuthenticatedClient } from "./supabaseClient";

import { Request, Response } from "express";

export async function getPresignedURL(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    const uploadURLS: Record<string, { 
        signedUrl: string; 
        token: string; 
        path: string; } | null> = {};

    const { bucket, folders: folderNames, id }: { bucket: string, folders: string[], id: string } = req.body;

    for(const folder of folderNames) {
        const { data } = await supabaseClient
            .storage
            .from(bucket)
            .createSignedUploadUrl(`${folder}/${id}`, { upsert: true });

        uploadURLS[folder] = data;
    }
   
    res.status(201).json({ folderInformation: uploadURLS, message: "Signed upload URL successfully generated." });
}