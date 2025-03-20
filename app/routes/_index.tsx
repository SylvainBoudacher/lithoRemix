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
import { getChakrasWithStones } from "~/api/otherParams/chakra/getChakra";
import { getContraindicationsWithStones } from "~/api/otherParams/contraindication/getContraindication";
import { getCraftedFormsWithStones } from "~/api/otherParams/craftedForm/getCraftedForm";
import { getStones } from "~/api/stones/getStones";
import { getPurificationTypesWithStones } from "~/api/types/purification/getPurificationType";
import { getRechargementTypesWithStones } from "~/api/types/rechargement/getRechargementType";

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
  const purificationTypesStones = await getPurificationTypesWithStones();
  const rechargementTypesStones = await getRechargementTypesWithStones();
  const chakrasStones = await getChakrasWithStones();
  const contraindicationsStones = await getContraindicationsWithStones();
  const craftedFormsStones = await getCraftedFormsWithStones();

  const stones = await getStones();

  return json({
    stones,
    bodyEffectsStones,
    emotionalEffectsStones,
    spiritualEffectsStones,
    purificationTypesStones,
    rechargementTypesStones,
    chakrasStones,
    contraindicationsStones,
    craftedFormsStones,
  });
};

export default function Index() {
  const {
    stones,
    bodyEffectsStones,
    emotionalEffectsStones,
    spiritualEffectsStones,
    purificationTypesStones,
    rechargementTypesStones,
    chakrasStones,
    contraindicationsStones,
    craftedFormsStones,
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
  const [purificationTypesToFilter, setPurificationTypesToFilter] = useState<
    string[]
  >([]);
  const [rechargementTypesToFilter, setRechargementTypesToFilter] = useState<
    string[]
  >([]);
  const [chakrasToFilter, setChakrasToFilter] = useState<string[]>([]);
  const [contraindicationsToFilter, setContraindicationsToFilter] = useState<
    string[]
  >([]);
  const [craftedFormsToFilter, setCraftedFormsToFilter] = useState<string[]>(
    []
  );

  const [showEffects, setShowEffects] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showOtherParams, setShowOtherParams] = useState(false);

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
    )
    .filter(
      (stone) =>
        // Filtre par types de purification si purificationTypesToFilter n'est pas vide
        purificationTypesToFilter.length === 0 ||
        purificationTypesToFilter.some((type) =>
          stone.purificationTypeIds.includes(type)
        )
    )
    .filter(
      (stone) =>
        // Filtre par types de rechargement si rechargementTypesToFilter n'est pas vide
        rechargementTypesToFilter.length === 0 ||
        rechargementTypesToFilter.some((type) =>
          stone.rechargementTypeIds.includes(type)
        )
    )
    .filter(
      (stone) =>
        // Filtre par chakras si chakrasToFilter n'est pas vide
        chakrasToFilter.length === 0 ||
        chakrasToFilter.some((chakra) => stone.chakraIds.includes(chakra))
    )
    .filter(
      (stone) =>
        // Filtre par contraindications si contraindicationsToFilter n'est pas vide
        contraindicationsToFilter.length === 0 ||
        contraindicationsToFilter.some((contraindication) =>
          stone.contraindicationIds.includes(contraindication)
        )
    )
    .filter(
      (stone) =>
        // Filtre par formes artisanales si craftedFormsToFilter n'est pas vide
        craftedFormsToFilter.length === 0 ||
        craftedFormsToFilter.some((form) => stone.craftedFormIds.includes(form))
    );

  return (
    <div className="flex flex-col px-6">
      {/* FORM */}
      <div className="pt-6">
        <div className="pb-3">
          <div className="flex items-center gap-12">
            <button
              onClick={() => setShowEffects(!showEffects)}
              className="text-sm text-zinc-600 hover:text-zinc-800 flex items-center gap-2"
            >
              <span className="font-bold text-zinc-800">Effets</span>

              <motion.span
                animate={{ rotate: showEffects ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                <ChevronRight size={20} />
              </motion.span>
            </button>

            <button
              onClick={() => setShowTypes(!showTypes)}
              className="text-sm text-zinc-600 hover:text-zinc-800 flex items-center gap-2"
            >
              <span className="font-bold text-zinc-800">Types</span>
              <motion.span
                animate={{ rotate: showTypes ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                <ChevronRight size={20} />
              </motion.span>
            </button>

            <button
              onClick={() => setShowOtherParams(!showOtherParams)}
              className="text-sm text-zinc-600 hover:text-zinc-800 flex items-center gap-2"
            >
              <span className="font-bold text-zinc-800">Autres</span>
              <motion.span
                animate={{ rotate: showOtherParams ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                <ChevronRight size={20} />
              </motion.span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <Autocomplete
            size="sm"
            label="Pierres"
            className="max-w-xs"
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
                    <div className="flex flex-row gap-x-4 pt-1">
                      <Select
                        label="Corporel"
                        name="bodyEffects"
                        size="sm"
                        className="min-w-60"
                        placeholder="Sélectionnez un effet corporel"
                        selectionMode="multiple"
                        onSelectionChange={(value) => {
                          const selectedValues = Array.from(
                            value as Set<string>
                          );
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
                        className="min-w-60"
                        name="emotionalEffects"
                        placeholder="Sélectionnez un effet émotionnel"
                        selectionMode="multiple"
                        onSelectionChange={(value) => {
                          const selectedValues = Array.from(
                            value as Set<string>
                          );
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
                        className="min-w-60"
                        name="spiritualEffects"
                        placeholder="Sélectionnez un effet spirituel"
                        selectionMode="multiple"
                        onSelectionChange={(value) => {
                          const selectedValues = Array.from(
                            value as Set<string>
                          );
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

            <AnimatePresence>
              {showTypes && (
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
                  <div className="flex flex-row gap-x-4 pt-1">
                    <Select
                      label="Purification"
                      name="purificationTypes"
                      size="sm"
                      className="min-w-60"
                      placeholder="Sélectionnez un type de purification"
                      selectionMode="multiple"
                      onSelectionChange={(value) => {
                        const selectedValues = Array.from(value as Set<string>);
                        setPurificationTypesToFilter(selectedValues);
                      }}
                      value={purificationTypesToFilter}
                    >
                      {purificationTypesStones.map((purificationType) => (
                        <SelectItem key={purificationType.id}>
                          {purificationType.type}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      size="sm"
                      label="Rechargement"
                      className="min-w-60"
                      name="rechargementTypes"
                      placeholder="Sélectionnez un type de rechargement"
                      selectionMode="multiple"
                      onSelectionChange={(value) => {
                        const selectedValues = Array.from(value as Set<string>);
                        setRechargementTypesToFilter(selectedValues);
                      }}
                      value={rechargementTypesToFilter}
                    >
                      {rechargementTypesStones.map((rechargementType) => (
                        <SelectItem key={rechargementType.id}>
                          {rechargementType.type}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <AnimatePresence>
              {showOtherParams && (
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
                  <div className="flex flex-row gap-x-4 pt-1">
                    <Select
                      label="Chakras"
                      name="chakras"
                      size="sm"
                      className="min-w-60"
                      placeholder="Sélectionnez un chakra"
                      selectionMode="multiple"
                      onSelectionChange={(value) => {
                        const selectedValues = Array.from(value as Set<string>);
                        setChakrasToFilter(selectedValues);
                      }}
                      value={chakrasToFilter}
                    >
                      {chakrasStones.map((chakra) => (
                        <SelectItem key={chakra.id}>
                          {chakra.number.toString()}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      size="sm"
                      label="Contraindications"
                      className="min-w-60"
                      name="contraindications"
                      placeholder="Sélectionnez une contraindication"
                      selectionMode="multiple"
                      onSelectionChange={(value) => {
                        const selectedValues = Array.from(value as Set<string>);
                        setContraindicationsToFilter(selectedValues);
                      }}
                      value={contraindicationsToFilter}
                    >
                      {contraindicationsStones.map((contraindication) => (
                        <SelectItem key={contraindication.id}>
                          {contraindication.contraindicationName}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      size="sm"
                      label="Formes artisanales"
                      className="min-w-60"
                      name="craftedForms"
                      placeholder="Sélectionnez une forme artisanale"
                      selectionMode="multiple"
                      onSelectionChange={(value) => {
                        const selectedValues = Array.from(value as Set<string>);
                        setCraftedFormsToFilter(selectedValues);
                      }}
                      value={craftedFormsToFilter}
                    >
                      {craftedFormsStones.map((craftedForm) => (
                        <SelectItem key={craftedForm.id}>
                          {craftedForm.form}
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
      <div className="pt-12">
        <div className="flex flex-row gap-6 flex-wrap">
          <AnimatePresence mode="popLayout">
            {finalFilteredStones.map((stone, index) => (
              <motion.div
                key={stone.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: index * 0.1,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: {
                    duration: 0.2,
                  },
                }}
                layout
              >
                <Card
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
