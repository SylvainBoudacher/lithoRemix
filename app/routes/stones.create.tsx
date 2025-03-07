import { json, useFetcher, useParams } from "@remix-run/react";
import { getBodyEffects } from "~/api/effects/bodyEffects/getBodyEffects";
import { getEmotionalEffect } from "~/api/effects/emotionalEffect/getEmotionalEffect";
import { getSpiritualEffect } from "~/api/effects/spiritualEffect/getSpiritualEffect";
import { getChakras } from "~/api/otherParams/chakra/getChakra";
import { getContraindications } from "~/api/otherParams/contraindication/getContraindication";
import { getCraftedForms } from "~/api/otherParams/craftedForm/getCraftedForm";
import { getPurificationTypes } from "~/api/types/purification/getPurificationType";
import { getRechargementTypes } from "~/api/types/rechargement/getRechargementType";

import { Select, SelectItem } from "@heroui/select";

export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];

export const loader = async () => {
  const bodyEffects = await getBodyEffects();
  const spiritualEffects = await getSpiritualEffect();
  const emotionalEffects = await getEmotionalEffect();
  const rechargementTypes = await getRechargementTypes();
  const purificationTypes = await getPurificationTypes();
  const craftedForms = await getCraftedForms();
  const chakras = await getChakras();
  const contraindications = await getContraindications();

  return json({ bodyEffects, spiritualEffects, emotionalEffects, rechargementTypes, purificationTypes, craftedForms, chakras, contraindications });
};

export default function StonesCreate() {
  const params = useParams();
  const fetcher = useFetcher();
  

  return (

    <fetcher.Form method="post" id="create-stone-form">

<Select
      className="max-w-xs"
      label="Favorite Animal"
      placeholder="Select an animal"
      selectionMode="multiple"
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>{animal.label}</SelectItem>
      ))}
    </Select>


    </fetcher.Form>

  );
}
