import { createClient } from "@supabase/supabase-js"

// move from keys to cloud storage
const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;