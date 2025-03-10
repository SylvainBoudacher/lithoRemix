import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function addImageToBucket(file: File) {
  const { data, error } = await supabase.storage
    .from("lithoRemixBucket")
    .upload(`${file.name}`, file);
if (error) {
    console.error(error);
} else {
    console.log(data);
}
return data;
}

