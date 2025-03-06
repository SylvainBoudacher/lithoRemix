import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { EffectChoice, getEffectById } from "~/api/effects/getEffect";
import { updateEffect } from "~/api/effects/updateEffect";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const effects = params.effect as EffectChoice;
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  const effect = await getEffectById(effects, params.id);
  return json({ effect });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const effect = params.effect as EffectChoice;
  const id = params.id;
  const formData = await request.formData();
  const effectValue = formData.get("effectValue");

  if (!id) throw new Response("ID manquant", { status: 400 });
  if (!effectValue) throw new Response("Effet manquant", { status: 400 });

  await updateEffect(effect, id, effectValue.toString());
  return redirect(`/effects/${params.effect}`);
};

export default function EditEffect() {
  const { effect } = useLoaderData<typeof loader>();
  return (
    <Form method="post" id="effect-form" className="w-full">
      <div className="p-6 flex  flex-col">
        <h1 className="text-xl font-bold mb-6">Edition</h1>
        <div className="flex flex-col gap-4">
          <Input name="effectValue" defaultValue={effect?.effect} />
          <Button type="submit">Enregistrer</Button>
        </div>
      </div>
    </Form>
  );
}
