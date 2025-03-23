import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Outlet,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { createEffect } from "~/api/effects/createEffect";
import { EffectChoice, getEffects } from "~/api/effects/getEffect";
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
  const effects = await getEffects(params.effect as EffectChoice);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.state === "idle") {
      const form = document.getElementById("effect-form") as HTMLFormElement;
      form.reset();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-row">
        <fetcher.Form method="post" id="effect-form">
          <div className="h-6 text-red-500 mb-2">
            {errors?.name && <p>{errors.name}</p>}
          </div>
          <div className=" flex flex-row gap-2">
            <Input
              name="effectName"
              className="w-60"
              placeholder={`Nom de l'effet ${
                effectTitles[params.effect as EffectChoice]
              }`}
            />
            <Button className="w-fit ">Ajouter un effet</Button>
          </div>
        </fetcher.Form>
      </div>

      <div className="flex flex-row gap-10">
        <Table className="">
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
                <TableCell className="flex flex-row gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/effects/${params.effect}/${effect.id}/edit`);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <fetcher.Form
                    action={`/effects/${params.effect}/${effect.id}/destroy`}
                    method="post"
                    onSubmit={(event) => {
                      const response = confirm(
                        "Voulez-vous vraiment supprimer cet effet ?"
                      );
                      if (!response) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <Button variant="destructive" type="submit">
                      <Trash2 />
                    </Button>
                  </fetcher.Form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-1/3 border border-dashed border-black bg-slate-100 rounded-xl h-[200px]">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
}
