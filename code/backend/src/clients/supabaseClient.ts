import { createClient, PostgrestSingleResponse, type SupabaseClient } from "@supabase/supabase-js";
import { Request } from "express";
import { resolve } from "path";

import * as dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../../src/.env") });

// move from keys to cloud storage
const supabaseURL: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseURL, supabaseKey);

export { supabase };

/**
 * Creates a Supabase client using the access token of an authenticated user.
 * 
 * @param request - a request from the client containing their access token
 */
export function createAuthenticatedClient(request: Request) {
    const access_token: string = request.headers.authorization!;
    
    return createClient(supabaseURL, supabaseKey, {
        global: {
            headers: { 
                Authorization: access_token
            }
        }
    });
}

/**
 * Inserts a new record into a table in the database.
 * 
 * @param tableName - the name of the table to receive the new entry. 
 * @param data - an object with fields corresponding to the column names of the desired table.
 */
export async function insertRecord<T>(tableName: string, data: T): Promise<PostgrestSingleResponse<null>> {
    const response =  await supabase!
        .from(tableName)
        .insert(data);
        
    return response;
}