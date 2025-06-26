import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import * as dotenv from "dotenv"
dotenv.config();

// move from keys to cloud storage
const supabaseURL: string = process.env.VITE_SUPABASE_URL!;
const supabaseKey: string = process.env.VITE_SUPABASE_ANON_KEY!;
let supabase: SupabaseClient = createBrowserClient(supabaseURL, supabaseKey);

export { supabase };

export async function insertData<T>(tableName: string, data: T): Promise<any> {
    const response =  await supabase!
        .from(tableName)
        .insert(data);
        
    return response;
}