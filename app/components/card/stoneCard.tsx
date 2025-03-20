/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

export default function StoneCard({ stone }: { stone: any }) {
  return (
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
  );
}
