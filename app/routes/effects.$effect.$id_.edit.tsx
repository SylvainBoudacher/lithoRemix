import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
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

  const errors: Record<string, string> = {};

  if (!id) throw new Response("ID manquant", { status: 400 });
  if (!effectValue) {
    errors.effectValue = "Veuillez remplir le champs";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors, { status: 400 });
  }

  try {
    await updateEffect(effect, id, effectValue!.toString());
  } catch (error) {
    errors.effectValue = "L'effet existe déjà";
    return json(errors, { status: 400 });
  }
  return redirect(`/effects/${params.effect}`);
};

export default function EditEffect() {
  const { effect } = useLoaderData<typeof loader>();
  const [inputValue, setInputValue] = useState(effect?.effect);

  useEffect(() => {
    setInputValue(effect?.effect);
  }, [effect]);

  const errors = useActionData<typeof action>();

  return (
    <Form method="post" id="effect-form" className="w-full">
      <div className="p-6 flex  flex-col">
        <h1 className="text-xl font-bold mb-3 pb-3">Edition</h1>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-red-500">{errors?.effectValue}</p>
          <Input
            name="effectValue"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">Enregistrer</Button>
        </div>
      </div>
    </Form>
  );
}
