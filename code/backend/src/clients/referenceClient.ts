import { Request, Response } from "express";
import { createAuthenticatedClient } from "./supabaseClient";

export async function getLanguages(req: Request, res: Response) {
    const accessToken = req.headers.authorization!;
    const supabaseClient = createAuthenticatedClient(accessToken);
    
    const { data } = await supabaseClient
        .from("languages")
        .select("name");

    res.status(201).json(data);
}