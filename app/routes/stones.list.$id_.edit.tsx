import { Image, Select, SelectItem } from "@heroui/react";
import { BodyEffect } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { getBodyEffects } from "~/api/effects/bodyEffects/getBodyEffects";
import { getStoneById } from "~/api/stones/getStones";
import { updateStone } from "~/api/stones/updateStone";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const stoneName = formData.get("stoneName");
  const bodyEffects = formData.get("bodyEffects");

  const idStone = params.id;

  if (!idStone) throw new Response("ID manquant", { status: 400 });

  console.log("idStone =", idStone);
  console.log("--------------------------------");
  console.log("stoneName =", stoneName);
  console.log("--------------------------------");
  console.log("bodyEffects =", bodyEffects);
  console.log("--------------------------------");

  await updateStone(idStone, {
    name: stoneName as string,
    bodyEffectIds: bodyEffects ? (bodyEffects as string).split(",") : undefined,
  });

  return redirect(`/stones/list`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  const stone = await getStoneById(params.id);
  const bodyEffects = await getBodyEffects();
  return json({ stone, bodyEffects });
};

export default function EditStone() {
  const { stone, bodyEffects } = useLoaderData<typeof loader>();
  const [stoneName, setStoneName] = useState(stone?.name);

  const [selectedBodyEffects, setSelectedBodyEffects] = useState<BodyEffect[]>(
    stone?.bodyEffects || []
  );

  useEffect(() => {
    console.log("selectedBodyEffects =", selectedBodyEffects);
  }, [selectedBodyEffects]);

  useEffect(() => {
    setSelectedBodyEffects(stone?.bodyEffects || []);
  }, [stone]);

  useEffect(() => {
    setStoneName(stone?.name);
  }, [stone]);

  return (
    <Form method="post" id="effect-form" className="w-full">
      <div className="p-6 flex  flex-col">
        <h1 className="text-xl font-bold mb-3 pb-3">Edition</h1>

        <div className="flex flex-col gap-2">
          <Image
            src={stone?.pictures[0]?.url || ""}
            alt={stone?.name || ""}
            width={80}
            height={80}
            radius="sm"
            className="object-cover object-center"
          />

          <p className="text-sm text-zinc-800">Nom</p>
          <Input
            name="stoneName"
            value={stoneName}
            onChange={(e) => setStoneName(e.target.value)}
          />

          <Select
            className="max-w-xs"
            label="Corporel"
            name="bodyEffects"
            placeholder="Sélectionnez un effet corporel"
            selectionMode="multiple"
          >
            {bodyEffects.map((bodyEffect) => (
              <SelectItem key={bodyEffect.id}>{bodyEffect.effect}</SelectItem>
            ))}
          </Select>
        </div>
        <Button type="submit">Enregistrer</Button>
      </div>
    </Form>
  );
}
