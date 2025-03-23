import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { destroyStone } from "~/api/stones/destroyStone";
import { getStoneById } from "~/api/stones/getStones";

const ENV = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

export const action = async ({ params }: ActionFunctionArgs) => {
  if (!params.stoneId) throw new Response("ID manquant", { status: 400 });

  const supabaseUrl = ENV.SUPABASE_URL || "";
  const supabaseKey = ENV.SUPABASE_SERVICE_ROLE_KEY || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const stone = await getStoneById(params.stoneId);

  if (stone?.pictures && stone.pictures.length > 0 && stone.pictures[0].url) {
    const imageName = stone.pictures[0].url.split("/").pop();

    if (imageName) {
      const { error } = await supabase.storage
        .from("lithoRemixBuck")
        .remove([`stones/${imageName}`]);

      if (error) {
        console.error(error);
        throw new Error("Erreur lors de la suppression de la pierre");
      }
    }
  }

  await destroyStone(params.stoneId);

  return redirect(`/stones/list`);
};
