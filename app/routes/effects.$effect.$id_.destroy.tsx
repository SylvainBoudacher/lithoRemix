import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroyEffect, EffectChoice } from "~/api/effects/destroyEffect";

export const action = async ({ params }: ActionFunctionArgs) => {
  const effect = params.effect as EffectChoice;
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  await destroyEffect(effect, params.id);
  return redirect(`/effects/${effect}`);
};
