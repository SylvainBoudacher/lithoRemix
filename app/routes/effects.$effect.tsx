import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { createEffect } from "~/api/effects/createEffect";
import { EffectChoice, getEffect } from "~/api/effects/getEffect";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const effectTitles: Record<EffectChoice, string> = {
  body: "Corporel",
  spiritual: "Spirituel",
  emotional: "Emotionnel",
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const effects = await getEffect(params.effect as EffectChoice);
  if (!effects) {
    throw new Response("Not Found", { status: 404 });
  }
  return { effects };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("effectName");

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Le nom de l'effet est requis";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors, { status: 400 });
  }

  try {
    await createEffect(params.effect as EffectChoice, name as string);
  } catch (error) {
    console.log("Erreur lors de la création de l'effet:", error);
    errors.name = "Erreur lors de la création de l'effet";
    return json(errors, { status: 400 });
  }
  return redirect(`/effects/${params.effect}`);
};

export default function Effect() {
  const params = useParams();
  const { effects } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle") {
      const form = document.getElementById("effect-form") as HTMLFormElement;
      form.reset();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className="flex flex-col gap-4">
      <fetcher.Form method="post" id="effect-form">
        <div className="h-6 text-red-500 mb-2">
          {errors?.name && <p>{errors.name}</p>}
        </div>
        <div className=" flex flex-row gap-2">
          <Input
            name="effectName"
            className="w-48"
            placeholder={`Nom de l'effet ${
              effectTitles[params.effect as EffectChoice]
            }`}
          />
          <Button className="w-fit ">Ajouter un effet</Button>
        </div>
      </fetcher.Form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">ID</TableHead>
            <TableHead className="md:pl-20">Nom</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {effects.map((effect) => (
            <TableRow key={effect.id}>
              <TableCell className="w-[70px] truncate">{effect.id}</TableCell>
              <TableCell className="md:pl-20 font-bold">
                {effect.effect}
              </TableCell>
              <TableCell className="text-right">
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
