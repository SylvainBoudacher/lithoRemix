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
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { getBodyEffectsWithStones } from "~/api/effects/bodyEffects/getBodyEffects";
import { getEmotionalEffectsWithStones } from "~/api/effects/emotionalEffect/getEmotionalEffect";
import { getSpiritualEffectsWithStones } from "~/api/effects/spiritualEffect/getSpiritualEffect";
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
  const spiritualEffectsStones = await getSpiritualEffectsWithStones();

  const stones = await getStones();

  return json({
    stones,
    bodyEffectsStones,
    emotionalEffectsStones,
    spiritualEffectsStones,
  });
};

export default function Index() {
  const {
    stones,
    bodyEffectsStones,
    emotionalEffectsStones,
    spiritualEffectsStones,
  } = useLoaderData<typeof loader>();

  const stoneNames = stones.map((stone) => stone.name);
  const [searchStoneName, setSearchStoneName] = useState<string>("");
  const [bodyEffectsToFilter, setBodyEffectsToFilter] = useState<string[]>([]);
  const [emotionalEffectsToFilter, setEmotionalEffectsToFilter] = useState<
    string[]
  >([]);
  const [spiritualEffectsToFilter, setSpiritualEffectsToFilter] = useState<
    string[]
  >([]);
  const [showEffects, setShowEffects] = useState(false);

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
    )
    .filter(
      (stone) =>
        // Filtre par effets spirituels si spiritualEffectsToFilter n'est pas vide
        spiritualEffectsToFilter.length === 0 ||
        spiritualEffectsToFilter.some((effect) =>
          stone.spiritualEffectIds.includes(effect)
        )
    );
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur LithoDico</h1>

      {/* FORM */}
      <div className="pt-6">
        <div className="flex flex-col gap-4 items-start">
          <Autocomplete
            size="sm"
            label="Pierres"
            className="min-w-xs max-w-xs"
            placeholder="Rechercher une pierre"
            onSelectionChange={(value) =>
              setSearchStoneName(value ? String(value) : "")
            }
          >
            {stoneNames.map((stoneName) => (
              <AutocompleteItem key={stoneName}>{stoneName}</AutocompleteItem>
            ))}
          </Autocomplete>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-zinc-800">Effets</p>
              <button
                onClick={() => setShowEffects(!showEffects)}
                className="text-sm text-zinc-600 hover:text-zinc-800 flex items-center"
              >
                <motion.span
                  animate={{ rotate: showEffects ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "inline-block" }}
                >
                  <ChevronRight size={20} />
                </motion.span>
              </button>
            </div>

            <AnimatePresence>
              {showEffects && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                    scale: 0.95,
                    y: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    scale: 0.95,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.3 },
                  }}
                  className="overflow-hidden origin-top"
                >
                  <div className="flex flex-row gap-4 w-full pt-1">
                    <Select
                      size="sm"
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
                        <SelectItem key={bodyEffect.id}>
                          {bodyEffect.effect}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      size="sm"
                      label="Émotionnel"
                      className="max-w-xs"
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

                    <Select
                      size="sm"
                      label="Spirituel"
                      className="max-w-xs"
                      name="spiritualEffects"
                      placeholder="Sélectionnez un effet spirituel"
                      selectionMode="multiple"
                      onSelectionChange={(value) => {
                        const selectedValues = Array.from(value as Set<string>);
                        setSpiritualEffectsToFilter(selectedValues);
                      }}
                      value={spiritualEffectsToFilter}
                    >
                      {spiritualEffectsStones.map((spiritualEffect) => (
                        <SelectItem key={spiritualEffect.id}>
                          {spiritualEffect.effect}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
