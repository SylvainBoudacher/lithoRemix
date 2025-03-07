import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { TypeChoice } from "~/api/types/createTypes";
import { destroyType } from "~/api/types/destroyTypes";

export const action = async ({ params }: ActionFunctionArgs) => {
  const type = params.type as TypeChoice;
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  await destroyType(type, params.id);
  return redirect(`/types/${type}`);
};
