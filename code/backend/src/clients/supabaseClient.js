import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

const envVariables = dotenv.config()["parsed"];

// move from keys to cloud storage
const supabaseURL= envVariables["SUPABASE_URL"];
const supabaseKey = envVariables["SUPABASE_ANON_KEY"];
console.log(supabaseURL, supabaseKey)
let supabase = createClient(supabaseURL, supabaseKey);

export { supabase };

export async function insertData(tableName, data) {
    const response =  await supabase
        .from(tableName)
        .insert(data);
        
    return response;
}