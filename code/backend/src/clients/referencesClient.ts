import { Request, Response } from "express";
import { createAuthenticatedClient } from "./supabaseClient";

/**
 * Retrieves the language options that a user can add to their profile.
 */
export async function getLanguages(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    
    const { data } = await supabaseClient
        .from("languages")
        .select("id,name");

    res.status(200).json(data);
}