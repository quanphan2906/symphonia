import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://localhost:3000";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "key"; 

const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		persistSession:
			process.env.NEXT_PUBLIC_PERSIST_SESSION == "true" ? true : false,
	},
});

export default supabase;
