import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Select,
  SelectItem,
} from "@heroui/react";
import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { getBodyEffectsWithStones } from "~/api/effects/bodyEffects/getBodyEffects";
import { searchStones } from "~/api/stones/getStones";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "LithoDico" },
    { name: "description", content: "LithoDico App with RemixJS" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const bodyEffectsStones = await getBodyEffectsWithStones();

  const url = new URL(request.url);
  const stoneName = url.searchParams.get("stoneName") || "";
  const bodyEffects = url.searchParams.get("bodyEffects") || [];

  const stones = await searchStones({
    query: stoneName,
  });
  return json({ stones, stoneName, bodyEffects, bodyEffectsStones });
};

export default function Index() {
  const { stones, stoneName, bodyEffectsStones } =
    useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur LithoDico</h1>

      {/* FORM */}
      <div className="pt-6">
        <Form method="get" onChange={(event) => submit(event.currentTarget)}>
          <div className="flex flex-row gap-4 items-center">
            <Input
              id="stoneName"
              name="stoneName"
              type="text"
              defaultValue={stoneName || ""}
              placeholder="Rechercher une pierre"
              className="w-fit"
            />

            <Select
              className="max-w-xs"
              label="Corporel"
              name="bodyEffects"
              placeholder="Sélectionnez un effet corporel"
              selectionMode="multiple"
            >
              {bodyEffectsStones.map((bodyEffect) => (
                <SelectItem key={bodyEffect.id}>{bodyEffect.effect}</SelectItem>
              ))}
            </Select>
          </div>
        </Form>
      </div>

      {/* LIST OF STONES */}
      <div className="pt-6">
        <div className="flex flex-row gap-6 flex-wrap">
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
