import { Request, Response } from "express";
import { createAuthenticatedClient } from "./supabaseClient";

export async function getCategories(req: Request, res: Response) {
    const { data } = await createAuthenticatedClient(req)
        .from("categories")
        .select("id,name");

    res.status(201).json(data);
}   