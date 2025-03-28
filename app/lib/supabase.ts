import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";


const supabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey);
};

export default supabaseClient;
