import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import * as dotenv from "dotenv"
dotenv.config();

// move from keys to cloud storage
const supabaseURL: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY!;
let supabase: SupabaseClient = createClient(supabaseURL, supabaseKey);

async function insertData<T>(tableName: string, data: T): Promise<any> {
    //const authenticatedClient = createClient();
    
    const response =  await supabase!
        .from(tableName)
        .insert(data);
    console.log(response);
    return response;
}

export { supabase, insertData };