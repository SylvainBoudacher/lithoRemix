import { Select, SelectItem } from "@heroui/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { getBodyEffects } from "~/api/effects/bodyEffects/getBodyEffects";
import { getEmotionalEffect } from "~/api/effects/emotionalEffect/getEmotionalEffect";
import { getSpiritualEffect } from "~/api/effects/spiritualEffect/getSpiritualEffect";
import { getChakras } from "~/api/otherParams/chakra/getChakra";
import { getContraindications } from "~/api/otherParams/contraindication/getContraindication";
import { getCraftedForms } from "~/api/otherParams/craftedForm/getCraftedForm";
import { getStoneById, getStoneName } from "~/api/stones/getStones";
import { updateStone } from "~/api/stones/updateStone";
import { getPurificationTypes } from "~/api/types/purification/getPurificationType";
import { getRechargementTypes } from "~/api/types/rechargement/getRechargementType";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

// TODO : Probleme lors de la modification d'une image - si je change un paramètre, l'image est supprimée

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  const stone = await getStoneById(params.id);
  const bodyEffects = await getBodyEffects();
  const spiritualEffects = await getSpiritualEffect();
  const emotionalEffects = await getEmotionalEffect();
  const rechargementTypes = await getRechargementTypes();
  const purificationTypes = await getPurificationTypes();
  const craftedForms = await getCraftedForms();
  const chakras = await getChakras();
  const contraindications = await getContraindications();

  const ENV = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_BUCKET_URL: process.env.SUPABASE_BUCKET_URL,
  };
  return json({
    stone,
    bodyEffects,
    spiritualEffects,
    emotionalEffects,
    rechargementTypes,
    purificationTypes,
    craftedForms,
    chakras,
    contraindications,
    ENV,
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const ENV = {
    SUPABASE_BUCKET_URL: process.env.SUPABASE_BUCKET_URL || "",
  };

  const idStone = params.id;
  const stoneName = formData.get("stoneName");
  const bodyEffects = formData.getAll("bodyEffects");
  const spiritualEffects = formData.getAll("spiritualEffects");
  const emotionalEffects = formData.getAll("emotionalEffects");
  const rechargementTypes = formData.getAll("rechargementTypes");
  const purificationTypes = formData.getAll("purificationTypes");
  const craftedForms = formData.getAll("craftedForms");
  const chakras = formData.getAll("chakras");
  const pictureName = formData.get("pictureName");
  const contraindications = formData.getAll("contreindications");
  if (!idStone) throw new Response("ID manquant", { status: 400 });

  const existingStone = await getStoneName(idStone);
  if (existingStone === null || existingStone === undefined)
    throw new Response("Pierres non trouvées", { status: 404 });

  const changeStoneName = existingStone.name !== stoneName;
  const bucketUrl = ENV.SUPABASE_BUCKET_URL || "";

  const pictures = pictureName
    ? [{ url: (bucketUrl + pictureName) as string }]
    : existingStone.pictures;

  if (changeStoneName || pictureName) {
    await updateStone(idStone, {
      name: stoneName as string,
      bodyEffectIds: bodyEffects ? (bodyEffects as string[]) : [],
      spiritualEffectIds: spiritualEffects
        ? (spiritualEffects as string[])
        : [],
      emotionalEffectIds: emotionalEffects
        ? (emotionalEffects as string[])
        : [],
      rechargementTypeIds: rechargementTypes
        ? (rechargementTypes as string[])
        : [],
      purificationTypeIds: purificationTypes
        ? (purificationTypes as string[])
        : [],
      craftedFormIds: craftedForms ? (craftedForms as string[]) : [],
      chakraIds: chakras ? (chakras as string[]) : [],
      pictures: pictureName ? pictures : undefined,
      contraindicationIds: contraindications
        ? (contraindications as string[])
        : [],
    });
  } else {
    await updateStone(idStone, {
      bodyEffectIds: bodyEffects ? (bodyEffects as string[]) : [],
      spiritualEffectIds: spiritualEffects
        ? (spiritualEffects as string[])
        : [],
      emotionalEffectIds: emotionalEffects
        ? (emotionalEffects as string[])
        : [],
      rechargementTypeIds: rechargementTypes
        ? (rechargementTypes as string[])
        : [],
      purificationTypeIds: purificationTypes
        ? (purificationTypes as string[])
        : [],
      craftedFormIds: craftedForms ? (craftedForms as string[]) : [],
      chakraIds: chakras ? (chakras as string[]) : [],
      contraindicationIds: contraindications
        ? (contraindications as string[])
        : [],
    });
  }

  return redirect(`/stones/list`);
};

export default function EditStone() {
  const {
    stone,
    bodyEffects,
    spiritualEffects,
    emotionalEffects,
    rechargementTypes,
    purificationTypes,
    craftedForms,
    chakras,
    contraindications,
    ENV,
  } = useLoaderData<typeof loader>();
  const [stoneName, setStoneName] = useState(stone?.name);

  const [selectedEffects, setSelectedEffects] = useState(
    stone?.bodyEffects.map((effect) => effect.id) || []
  );
  const [selectedSpiritualEffects, setSelectedSpiritualEffects] = useState(
    stone?.spiritualEffects.map((effect) => effect.id) || []
  );
  const [selectedEmotionalEffects, setSelectedEmotionalEffects] = useState(
    stone?.emotionalEffects.map((effect) => effect.id) || []
  );
  const [selectedRechargementTypes, setSelectedRechargementTypes] = useState(
    stone?.rechargementTypes.map((effect) => effect.id) || []
  );
  const [selectedPurificationTypes, setSelectedPurificationTypes] = useState(
    stone?.purificationTypes.map((effect) => effect.id) || []
  );
  const [selectedCraftedForms, setSelectedCraftedForms] = useState(
    stone?.craftedForms.map((effect) => effect.id) || []
  );
  const [selectedChakras, setSelectedChakras] = useState(
    stone?.chakras.map((effect) => effect.id) || []
  );

  const [selectedContreindications, setSelectedContreindications] = useState(
    stone?.contraindications.map((effect) => effect.id) || []
  );

  const [originalImage, setOriginalImage] = useState<string | null>(
    stone?.pictures[0]?.url || null
  );
  const [newImage, setNewImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(
    stone?.pictures[0]?.url || null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (newImage || originalImage) {
      const supabaseUrl = ENV.SUPABASE_URL || "";
      const supabaseKey = ENV.SUPABASE_SERVICE_ROLE_KEY || "";

      const supabase = createClient(supabaseUrl, supabaseKey);

      if (originalImage && newImage) {
        const originalImageName = originalImage.split("/").pop();

        const { error, data } = await supabase.storage
          .from("lithoRemixBuck")
          .remove([`/stones/${originalImageName}`]);
        if (data) {
          console.error(data);
        }
        if (error) {
          console.error(error);
        }
      }

      if (newImage) {
        const { error, data } = await supabase.storage
          .from("lithoRemixBuck")
          .upload(`/stones/${newImage.name}`, newImage);
        if (data) {
          console.log(data);
        }
        if (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    setStoneName(stone?.name);
    setSelectedEffects(stone?.bodyEffects.map((effect) => effect.id) || []);
    setSelectedSpiritualEffects(
      stone?.spiritualEffects.map((effect) => effect.id) || []
    );
    setSelectedEmotionalEffects(
      stone?.emotionalEffects.map((effect) => effect.id) || []
    );
    setSelectedRechargementTypes(
      stone?.rechargementTypes.map((effect) => effect.id) || []
    );
    setSelectedPurificationTypes(
      stone?.purificationTypes.map((effect) => effect.id) || []
    );
    setSelectedCraftedForms(
      stone?.craftedForms.map((effect) => effect.id) || []
    );
    setSelectedChakras(stone?.chakras.map((effect) => effect.id) || []);
    setSelectedContreindications(
      stone?.contraindications.map((effect) => effect.id) || []
    );
    setImagePreview(stone?.pictures[0]?.url || null);
    setOriginalImage(stone?.pictures[0]?.url || null);
  }, [stone]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== stone?.pictures[0]?.url) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, stone?.pictures]);

  return (
    <Form method="post" id="effect-form" className="w-full">
      <div className="p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-3 pb-3">Edition</h1>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="image-input"
            className="relative w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              id="image-input"
              name="pictureName"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt={stone?.name || ""}
                  className="object-cover w-full h-full rounded-lg object-center"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 border border-zinc-600/40"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500">Cliquez ou déposez</p>
                <p className="text-sm text-gray-500">une image ici</p>
              </div>
            )}
          </label>

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
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedEffects(selectedKeys);
            }}
          >
            {bodyEffects.map((bodyEffect) => (
              <SelectItem key={bodyEffect.id}>{bodyEffect.effect}</SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Spirituel"
            name="spiritualEffects"
            placeholder="Sélectionnez un effet spirituel"
            selectionMode="multiple"
            selectedKeys={selectedSpiritualEffects}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedSpiritualEffects(selectedKeys);
            }}
          >
            {spiritualEffects.map((spiritualEffect) => (
              <SelectItem key={spiritualEffect.id}>
                {spiritualEffect.effect}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Emotionnel"
            name="emotionalEffects"
            placeholder="Sélectionnez un effet émotionnel"
            selectionMode="multiple"
            selectedKeys={selectedEmotionalEffects}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedEmotionalEffects(selectedKeys);
            }}
          >
            {emotionalEffects.map((emotionalEffect) => (
              <SelectItem key={emotionalEffect.id}>
                {emotionalEffect.effect}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Rechargement"
            name="rechargementTypes"
            placeholder="Sélectionnez un type de rechargement"
            selectionMode="multiple"
            selectedKeys={selectedRechargementTypes}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedRechargementTypes(selectedKeys);
            }}
          >
            {rechargementTypes.map((rechargementType) => (
              <SelectItem key={rechargementType.id}>
                {rechargementType.type}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Purification"
            name="purificationTypes"
            placeholder="Sélectionnez un type de purification"
            selectionMode="multiple"
            selectedKeys={selectedPurificationTypes}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedPurificationTypes(selectedKeys);
            }}
          >
            {purificationTypes.map((purificationType) => (
              <SelectItem key={purificationType.id}>
                {purificationType.type}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Forme artisanale"
            name="craftedForms"
            placeholder="Sélectionnez une forme artisanale"
            selectionMode="multiple"
            selectedKeys={selectedCraftedForms}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedCraftedForms(selectedKeys);
            }}
          >
            {craftedForms.map((craftedForm) => (
              <SelectItem key={craftedForm.id}>{craftedForm.form}</SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Chakra"
            name="chakras"
            placeholder="Sélectionnez un chakra"
            selectionMode="multiple"
            selectedKeys={selectedChakras}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedChakras(selectedKeys);
            }}
          >
            {chakras.map((chakra) => (
              <SelectItem key={chakra.id}>
                {chakra.number.toString()}
              </SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Contre indications"
            name="contreindications"
            placeholder="Sélectionnez une contreindication"
            selectionMode="multiple"
            selectedKeys={selectedContreindications}
            onSelectionChange={(keys) => {
              const selectedKeys = Array.from(keys as Set<string>);
              setSelectedContreindications(selectedKeys);
            }}
          >
            {contraindications.map((contreindication) => (
              <SelectItem key={contreindication.id}>
                {contreindication.contraindicationName}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button type="submit" onClick={handleUpload} className="mt-2">
          Enregistrer
        </Button>
      </div>
    </Form>
  );
}
