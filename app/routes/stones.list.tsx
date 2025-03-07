import { json, useLoaderData, useParams } from "@remix-run/react";
import { getStones } from "~/api/stones/getStones";

export const loader = async () => {
  const stones = await getStones();
  return json({ stones });
};


export default function StonesCreate() {
  const params = useParams();
  const { stones } = useLoaderData<typeof loader>();


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Les pierres {params.body}</h1>

      <h1>Ajouter une pierre</h1>

      <div className="flex flex-col gap-4">
        {stones.map((stone) => (
          <div key={stone.id}>{stone.name}</div>
        ))}
      </div>

     
     
    </div>
  );
}
