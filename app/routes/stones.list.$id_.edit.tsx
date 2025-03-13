import { Image, Select, SelectItem } from "@heroui/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import { getBodyEffects } from "~/api/effects/bodyEffects/getBodyEffects";
import { getStoneById, getStoneName } from "~/api/stones/getStones";
import { updateStone } from "~/api/stones/updateStone";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const idStone = params.id;
  const stoneName = formData.get("stoneName");
  const bodyEffects = formData.getAll("bodyEffects");

  if (!idStone) throw new Response("ID manquant", { status: 400 });
  const existingStone = await getStoneName(idStone);
  if (existingStone === null || existingStone === undefined)
    throw new Response("Pierres non trouvées", { status: 404 });

  if (existingStone.name !== stoneName) {
    await updateStone(idStone, {
      name: stoneName as string,
      bodyEffectIds: bodyEffects ? (bodyEffects as string[]) : [],
    });
  } else {
    await updateStone(idStone, {
      bodyEffectIds: bodyEffects ? (bodyEffects as string[]) : [],
    });
  }

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
  const [selectedEffects, setSelectedEffects] = useState(
    stone?.bodyEffects.map((effect) => effect.id) || []
  );

  useEffect(() => {
    setStoneName(stone?.name);
    setSelectedEffects(stone?.bodyEffects.map((effect) => effect.id) || []);
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
            selectedKeys={selectedEffects}
            onSelectionChange={setSelectedEffects}
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
