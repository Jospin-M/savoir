import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import * as dotenv from "dotenv"
dotenv.config();
console.log(dotenv.config());

// move from keys to cloud storage
const supabaseURL: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY!;
let supabase: SupabaseClient = createClient(supabaseURL, supabaseKey);

export { supabase };

async function insertData<T>(tableName: string, data: T): Promise<any> {
    const response =  await supabase!
        .from(tableName)
        .insert(data);
        
    return response;
}

export { insertData };