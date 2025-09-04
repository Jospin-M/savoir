import { Request, Response } from "express";
import { createAuthenticatedClient } from "./supabaseClient";

export async function getCategories(req: Request, res: Response) {
    const { data } = await createAuthenticatedClient(req)
        .from("categories_by_name") // query from a view that returns the categories in alphabetical order
        .select("id,name");
        
    res.status(200).json(data);
}   

export async function updateSkills(req: Request, res: Response) {
    const supabaseClient = createAuthenticatedClient(req);
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    await supabaseClient.rpc("update_skills", {
        new_rows: req.body,
        user_uuid: user!.id
    });
        
    res.status(201).json({ message: "Skills updated successfully." });
}