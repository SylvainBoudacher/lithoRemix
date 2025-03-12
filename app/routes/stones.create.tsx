import { json, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { getBodyEffects } from "~/api/effects/bodyEffects/getBodyEffects";
import { getEmotionalEffect } from "~/api/effects/emotionalEffect/getEmotionalEffect";
import { getSpiritualEffect } from "~/api/effects/spiritualEffect/getSpiritualEffect";
import { getChakras } from "~/api/otherParams/chakra/getChakra";
import { getContraindications } from "~/api/otherParams/contraindication/getContraindication";
import { getCraftedForms } from "~/api/otherParams/craftedForm/getCraftedForm";
import { getPurificationTypes } from "~/api/types/purification/getPurificationType";
import { getRechargementTypes } from "~/api/types/rechargement/getRechargementType";

import { Select, SelectItem } from "@heroui/select";
import { ActionFunctionArgs } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { createStone } from "~/api/stones/createStone";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export const loader = async () => {
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
  };

  return json({
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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const bodyEffects = formData.get("bodyEffects");
  const emotionalEffects = formData.get("emotionalEffects");
  const spiritualEffects = formData.get("spiritualEffects");
  const rechargementTypes = formData.get("rechargementTypes");
  const purificationTypes = formData.get("purificationTypes");
  const craftedForms = formData.get("craftedForms");
  const chakras = formData.get("chakras");
  const contraindications = formData.get("contraindications");
  const picture = formData.get("pictureName");

  if (!name) {
    return json({ error: "Le nom de la pierre est requis" }, { status: 400 });
  }

  try {
    await createStone({
      name: name as string,
      bodyEffectIds: bodyEffects
        ? (bodyEffects as string).split(",")
        : undefined,
      emotionalEffectIds: emotionalEffects
        ? (emotionalEffects as string).split(",")
        : undefined,
      spiritualEffectIds: spiritualEffects
        ? (spiritualEffects as string).split(",")
        : undefined,
      rechargementTypeIds: rechargementTypes
        ? (rechargementTypes as string).split(",")
        : undefined,
      purificationTypeIds: purificationTypes
        ? (purificationTypes as string).split(",")
        : undefined,
      craftedFormIds: craftedForms
        ? (craftedForms as string).split(",")
        : undefined,
      chakraIds: chakras ? (chakras as string).split(",") : undefined,
      contraindicationIds: contraindications
        ? (contraindications as string).split(",")
        : undefined,
      pictures: picture
        ? [{ url: (process.env.SUPABASE_BUCKET_URL + "/" + picture) as string }]
        : undefined,
    });
  } catch (error) {
    console.error(error);
    return json(
      { error: "Une erreur est survenue lors de la création de la pierre" },
      { status: 500 }
    );
  }
  return redirect("/stones/list");
};

export default function StonesCreate() {
  const fetcher = useFetcher();
  const {
    bodyEffects,
    emotionalEffects,
    spiritualEffects,
    rechargementTypes,
    purificationTypes,
    craftedForms,
    chakras,
    contraindications,
    ENV,
  } = useLoaderData<typeof loader>();

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleUpload = async () => {
    if (image) {
      const supabaseUrl = ENV.SUPABASE_URL || "";
      const supabaseKey = ENV.SUPABASE_SERVICE_ROLE_KEY || "";

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.storage
        .from("lithoRemixBuck")
        .upload(`/stones/${image.name}`, image);

      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <fetcher.Form method="post" id="create-stone-form">
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6 w-full max-w-2xl">
            <div>
              <p className="text-md font-semibold text-zinc-800 mb-3">
                Nom de la pierre
              </p>
              <Input
                name="name"
                placeholder="Entrez le nom de la pierre"
                className="max-w-xs"
              />
            </div>

            <div className="flex flex-row gap-6 w-full justify-start">
              <div className="w-full max-w-xs">
                <p className="text-md font-semibold text-zinc-800 mb-3">
                  Description
                </p>
                <Textarea
                  name="description"
                  placeholder="Entrez la description de la pierre"
                />
              </div>
              <div>
                <p className="text-md font-semibold text-zinc-800 mb-3">
                  Image
                </p>
                <Input
                  name="pictureName"
                  placeholder="Image"
                  className="max-w-xs"
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="h-20 w-20">
                    <img
                      src={imagePreview}
                      alt="Prévisualisation"
                      className="max-w-xs rounded-lg shadow-sm object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <p className="text-md font-semibold text-zinc-800">Effets</p>
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

            <Select
              className="max-w-xs"
              label="Emotionnel"
              name="emotionalEffects"
              placeholder="Sélectionnez un effet emotionnel"
              selectionMode="multiple"
            >
              {emotionalEffects.map((emotionalEffect) => (
                <SelectItem key={emotionalEffect.id}>
                  {emotionalEffect.effect}
                </SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-xs"
              label="Spirituel"
              name="spiritualEffects"
              placeholder="Sélectionnez un effet spirituel"
              selectionMode="multiple"
            >
              {spiritualEffects.map((spiritualEffect) => (
                <SelectItem key={spiritualEffect.id}>
                  {spiritualEffect.effect}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <p className="text-md font-semibold text-zinc-800">Types</p>
            <Select
              className="max-w-xs"
              label="Rechargement"
              name="rechargementTypes"
              placeholder="Sélectionnez un type de rechargement"
              selectionMode="multiple"
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
            >
              {purificationTypes.map((purificationType) => (
                <SelectItem key={purificationType.id}>
                  {purificationType.type}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <p className="text-md font-semibold text-zinc-800">
              Autres paramètres
            </p>
            <Select
              className="max-w-xs"
              label="Forme artisanale"
              name="craftedForms"
              placeholder="Sélectionnez une forme artisanale"
              selectionMode="multiple"
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
            >
              {chakras.map((chakra) => (
                <SelectItem key={chakra.id}>{chakra.number}</SelectItem>
              ))}
            </Select>

            <Select
              className="max-w-xs"
              label="Contre-indications"
              name="contraindications"
              placeholder="Sélectionnez une contre-indication"
            >
              {contraindications.map((contraindication) => (
                <SelectItem key={contraindication.id}>
                  {contraindication.contraindicationName}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Button className="w-fit mt-10" type="submit" onClick={handleUpload}>
        Ajouter une pierre
      </Button>
    </fetcher.Form>
  );
}
