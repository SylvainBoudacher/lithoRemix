import supabaseClient from "~/lib/supabase";

export async function addImageToBucket(file: File) {
  const { data, error } = await supabaseClient()
    .storage
    .from("lithoRemixBucket")
    .upload(`${file.name}`, file);
if (error) {
    console.error(error);
}
return data;
}
