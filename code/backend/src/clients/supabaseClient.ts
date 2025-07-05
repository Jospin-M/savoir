import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import * as dotenv from "dotenv";
dotenv.config();

// move from keys to cloud storage
const supabaseURL: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY!;
let supabase: SupabaseClient = createClient(supabaseURL, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

/**
 * Inserts a new record into a table in the database.
 * 
 * @param tableName - the name of the table to receive the new entry. 
 * @param data - an object with fields corresponding to the column names of the desired table.
 */
async function insertData<T>(tableName: string, data: T): Promise<any> {
    const response =  await supabase!
        .from(tableName)
        .insert(data);
        
    return response;
}

export { supabase, insertData };