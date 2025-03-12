import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { toast } from "sonner";
import { destroyStone } from "~/api/stones/destroyStone";

export const action = async ({ params }: ActionFunctionArgs) => {
  if (!params.stoneId) throw new Response("ID manquant", { status: 400 });

  await destroyStone(params.stoneId).then(() => {
    toast("Pierres supprimée avec succès");
  });

  return redirect(`/stones/list`);
};
