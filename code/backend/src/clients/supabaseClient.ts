import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import * as dotenv from "dotenv";
dotenv.config();

// move from keys to cloud storage
const supabaseURL: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY!;
const supabase: SupabaseClient = createClient(supabaseURL, supabaseKey);

export { supabase };

/**
 * Creates a Supabase client using the access token of an authenticated user.
 * 
 * @param headers - the headers provided in the browser's HTTP request
 * @param accessToken - the access token received from Supabase 
 */
export function createAuthenticatedClient(headers: any) {
    const accessToken = headers.authorization;
    
    return createClient(supabaseURL, supabaseKey, {
        global: {
            headers: { 
                Authorization: accessToken
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
export async function insertRecord<T>(tableName: string, data: T): Promise<any> {
    const response =  await supabase!
        .from(tableName)
        .insert(data);
        
    return response;
}