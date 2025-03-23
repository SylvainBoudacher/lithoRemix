/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Textarea } from "../ui/textarea";
import { StonePropertySection } from "./StonePropertySection";
import { TwoColumnGrid } from "./TwoColumnGrid";

export default function StoneCard({ stone }: { stone: any }) {
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
              src={stone?.pictures[0]?.url as string}
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
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea id="description" value={stone.description} />
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
              items={
                stone?.chakras?.map((chakra: any) => ({
                  id: chakra.id,
                  name: `${chakra.number}`,
                })) || []
              }
              propertyKey="name"
            />

            <StonePropertySection
              title="Contre-indications"
              items={stone?.contraindications || []}
              propertyKey="name"
            />
          </TwoColumnGrid>
        </div>
      </DialogContent>
    </Dialog>
  );
}
