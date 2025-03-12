import { Image } from "@heroui/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import { getStoneById } from "~/api/stones/getStones";
import { Input } from "~/components/ui/input";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  const stone = await getStoneById(params.id);
  return json({ stone });
};

export default function EditStone() {
  const { stone } = useLoaderData<typeof loader>();

  console.log(stone);
  return (
    <Form method="post" id="effect-form" className="w-full">
      <div className="p-6 flex  flex-col">
        <h1 className="text-xl font-bold mb-3 pb-3">Edition</h1>

        <div className="flex flex-col gap-2">
          <Image
            src={stone?.pictures[0].url}
            alt={stone?.name}
            width={80}
            height={80}
            radius="sm"
            className="object-cover object-center"
          />

          <p className="text-sm text-zinc-800">Nom</p>
          <Input name="effectValue" value={stone?.name} />
        </div>
      </div>
    </Form>
  );
}
