import { Request, Response } from "express";
import { createAuthenticatedClient } from "./supabaseClient";

export async function getCategories(req: Request, res: Response) {
    const { data } = await createAuthenticatedClient(req)
        .from("categories")
        .select("id,name");

    res.status(200).json(data);
}   

export async function updateSkills(req: Request, res: Response) {
    await createAuthenticatedClient(req)
        .from("skills")
        .upsert({ ...req.body });
        
    res.status(201).json({ message: "Skills updated successfully." });
}