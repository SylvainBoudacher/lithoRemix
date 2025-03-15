import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getBodyEffectsWithStones } from "~/api/effects/bodyEffects/getBodyEffects";

export const meta: MetaFunction = () => {
  return [
    { title: "Effets Corporels - LithoDico" },
    { name: "description", content: "Effets corporels liés aux pierres" },
  ];
};

export const loader = async () => {
  const bodyEffects = await getBodyEffectsWithStones();
  return json({ bodyEffects });
};

export default function BodyEffects() {
  const { bodyEffects } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-2xl font-bold">Effets Corporels liés aux Pierres</h2>

      <div className="pt-6">
        {bodyEffects.length === 0 ? (
          <p>Aucun effet corporel lié à des pierres n'a été trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodyEffects.map((effect) => (
              <Card key={effect.id} shadow="md" radius="sm">
                <CardBody>
                  <h3 className="text-xl font-semibold">{effect.effect}</h3>
                  <p className="text-sm text-gray-500">
                    {effect.stones.length} pierre(s) associée(s)
                  </p>
                </CardBody>
                <CardFooter className="flex flex-col gap-2">
                  <h4 className="text-md font-medium">Pierres associées:</h4>
                  <div className="flex flex-wrap gap-2">
                    {effect.stones.map((stone) => (
                      <Link
                        key={stone.id}
                        to={`/stones/list/${stone.id}`}
                        className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-100"
                      >
                        {stone.pictures && stone.pictures.length > 0 && (
                          <Image
                            alt={stone.name}
                            className="object-cover object-center h-8 w-8"
                            radius="sm"
                            src={stone.pictures[0]?.url}
                          />
                        )}
                        <span>{stone.name}</span>
                      </Link>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
