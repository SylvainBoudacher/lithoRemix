import React, { useMemo } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { StonePropertySection } from "./StonePropertySection";
import { TwoColumnGrid } from "./TwoColumnGrid";
import type { Stone } from "~/types";

interface StoneCardProps {
  stone: Stone;
}

export default React.memo(function StoneCard({ stone }: StoneCardProps) {
  // Memoize expensive chakra transformation
  const formattedChakras = useMemo(() =>
    stone?.chakras?.map(chakra => ({
      id: chakra.id,
      name: `${chakra.number}`,
    })) || [], [stone.chakras]
  );

  // Memoize primary image URL
  const primaryImageUrl = useMemo(() =>
    stone?.pictures?.[0]?.url || '/placeholder-stone.jpg',
    [stone.pictures]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card isPressable shadow="md" radius="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              alt={stone.name}
              className="object-cover object-center h-40 w-40"
              radius="none"
              shadow="sm"
              src={primaryImageUrl}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{stone.name}</b>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{stone.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {stone.description && (
            <div>
              <p className="text-black font-bold text-lg pb-3">Description</p>
              <p id="description">{stone.description}</p>
            </div>
          )}

          <TwoColumnGrid>
            <StonePropertySection
              title="Corporels"
              items={stone?.bodyEffects || []}
              propertyKey="effect"
            />

            <StonePropertySection
              title="Spirituels"
              items={stone?.spiritualEffects || []}
              propertyKey="effect"
            />

            <StonePropertySection
              title="Emotionnels"
              items={stone?.emotionalEffects || []}
              propertyKey="effect"
            />

            <StonePropertySection
              title="Rechargement"
              items={stone?.rechargementTypes || []}
              propertyKey="type"
            />

            <StonePropertySection
              title="Purification"
              items={stone?.purificationTypes || []}
              propertyKey="type"
            />

            <StonePropertySection
              title="Formes"
              items={stone?.craftedForms || []}
              propertyKey="form"
            />

            <StonePropertySection
              title="Chakras"
              items={formattedChakras}
              propertyKey="name"
            />

            <StonePropertySection
              title="Contre-indications"
              items={stone?.contraindications || []}
              propertyKey="contraindicationName"
            />
          </TwoColumnGrid>
        </div>
      </DialogContent>
    </Dialog>
  );
});
