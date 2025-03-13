import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStones } from "~/api/stones/getStones";

export const meta: MetaFunction = () => {
  return [
    { title: "LithoDico" },
    { name: "description", content: "LithoDico App with RemixJS" },
  ];
};

export const loader = async () => {
  const stones = await getStones();
  return json({ stones });
};

export default function Index() {
  const { stones } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur LithoDico</h1>

      <div className="flex flex-col gap-4">
        <div className="w-fit">
          {stones.map((stone) => (
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
