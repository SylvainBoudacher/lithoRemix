import { json } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

const ENV = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
};

export async function countStorageMedia() {
  try {
    const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .storage
      .from("lithoRemixBuck")
      .list("stones");

    if (error) {
      console.error("Erreur lors du comptage des médias:", error);
      throw new Error("Impossible de compter les médias");
    }

    return {
      totalFiles: data?.length || 0,
      totalSize: `${((data?.reduce((acc, file) => acc + (file.metadata?.size || 0), 0) || 0) / (1024 * 1024 * 1024)).toFixed(2)} Go`,
      lastCheck: new Date().toISOString()
    };
  } catch (error) {
    console.error("Erreur inattendue:", error);
    throw error;
  }
}

export async function loader() {
  try {
    const result = await countStorageMedia();
    return json(result);
  } catch (error) {
    console.error("Erreur dans le loader:", error);
    return json({ error: "Erreur lors du traitement de la requête" }, { status: 500 });
  }
}
