import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroyStone } from "~/api/stones/destroyStone";


export const action = async ({ params }: ActionFunctionArgs) => {
  
  if (!params.stoneId) throw new Response("ID manquant", { status: 400 });

  await destroyStone(params.stoneId);
  return redirect(`/stones/list`);
};
