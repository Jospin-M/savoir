import { createClient } from "@supabase/supabase-js"

const dotenv = require("dotenv")
dotenv.config("./.env")

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
let supabase;

if(typeof supabaseURL === "string" && typeof supabaseKey === "string") {
    supabase = createClient(supabaseURL, supabaseKey);
}

export default supabase;
