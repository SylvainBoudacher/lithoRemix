import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardFooter,
  Image,
  Select,
  SelectItem,
} from "@heroui/react";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getBodyEffectsWithStones } from "~/api/effects/bodyEffects/getBodyEffects";
import { getEmotionalEffectsWithStones } from "~/api/effects/emotionalEffect/getEmotionalEffect";
import { getStones } from "~/api/stones/getStones";

export const meta: MetaFunction = () => {
  return [
    { title: "LithoDico" },
    { name: "description", content: "LithoDico App with RemixJS" },
  ];
};

export const loader = async () => {
  const bodyEffectsStones = await getBodyEffectsWithStones();
  const emotionalEffectsStones = await getEmotionalEffectsWithStones();

  const stones = await getStones();

  return json({ stones, bodyEffectsStones, emotionalEffectsStones });
};

export default function Index() {
  const { stones, bodyEffectsStones, emotionalEffectsStones } =
    useLoaderData<typeof loader>();

  const stoneNames = stones.map((stone) => stone.name);
  const [searchStoneName, setSearchStoneName] = useState<string>("");
  const [bodyEffectsToFilter, setBodyEffectsToFilter] = useState<string[]>([]);
  const [emotionalEffectsToFilter, setEmotionalEffectsToFilter] = useState<
    string[]
  >([]);

  const finalFilteredStones = stones
    .filter(
      (stone) =>
        // Affiche toutes les pierres si searchStoneName est vide
        searchStoneName === "" ||
        stone.name.toLowerCase().includes(searchStoneName.toLowerCase())
    )
    .filter(
      (stone) =>
        // Filtre par effets corporels si bodyEffectsToFilter n'est pas vide
        bodyEffectsToFilter.length === 0 ||
        bodyEffectsToFilter.some((effect) =>
          stone.bodyEffectIds.includes(effect)
        )
    )
    .filter(
      (stone) =>
        // Filtre par effets émotionnels si emotionalEffectsToFilter n'est pas vide
        emotionalEffectsToFilter.length === 0 ||
        emotionalEffectsToFilter.some((effect) =>
          stone.emotionalEffectIds.includes(effect)
        )
    );

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur LithoDico</h1>

      {/* FORM */}
      <div className="pt-6">
        <div className="flex flex-row gap-4 items-center">
          <Autocomplete
            className="max-w-xs"
            label="Pierres"
            placeholder="Rechercher une pierre"
            onSelectionChange={(value) =>
              setSearchStoneName(value ? String(value) : "")
            }
          >
            {stoneNames.map((stoneName) => (
              <AutocompleteItem key={stoneName}>{stoneName}</AutocompleteItem>
            ))}
          </Autocomplete>
          <Select
            className="max-w-xs"
            label="Corporel"
            name="bodyEffects"
            placeholder="Sélectionnez un effet corporel"
            selectionMode="multiple"
            onSelectionChange={(value) => {
              const selectedValues = Array.from(value as Set<string>);
              setBodyEffectsToFilter(selectedValues);
            }}
            value={bodyEffectsToFilter}
          >
            {bodyEffectsStones.map((bodyEffect) => (
              <SelectItem key={bodyEffect.id}>{bodyEffect.effect}</SelectItem>
            ))}
          </Select>

          <Select
            className="max-w-xs"
            label="Émotionnel"
            name="emotionalEffects"
            placeholder="Sélectionnez un effet émotionnel"
            selectionMode="multiple"
            onSelectionChange={(value) => {
              const selectedValues = Array.from(value as Set<string>);
              setEmotionalEffectsToFilter(selectedValues);
            }}
            value={emotionalEffectsToFilter}
          >
            {emotionalEffectsStones.map((emotionalEffect) => (
              <SelectItem key={emotionalEffect.id}>
                {emotionalEffect.effect}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* LIST OF STONES */}
      <div className="pt-6">
        <div className="flex flex-row gap-6 flex-wrap">
          {finalFilteredStones.map((stone) => (
            <Card
              key={stone.id}
              isPressable
              shadow="md"
              radius="sm"
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={stone.name}
                  className="object-cover object-center h-40 w-40"
                  radius="none"
                  shadow="sm"
                  src={stone?.pictures[0]?.url}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{stone.name}</b>
                <p className="text-default-500">{stone.description}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
