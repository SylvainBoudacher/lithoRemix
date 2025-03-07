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
import { Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { EffectChoice } from "~/api/effects/getEffect";
import { createType, TypeChoice } from "~/api/types/createTypes";
import { getTypes } from "~/api/types/getTypes";
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
  const types = await getTypes(params.type as TypeChoice);
  if (!types) {
    throw new Response("Not Found", { status: 404 });
  }
  return { types };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("effectName");

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Le nom du type est requis";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors, { status: 400 });
  }

  try {
    await createType(params.type as TypeChoice, name as string);
  } catch (error) {
    console.log("Erreur lors de la création du type:", error);
    errors.name = "Erreur lors de la création du type";
    return json(errors, { status: 400 });
  }
  return redirect(`/types/${params.type}`);
};

export default function Type() {
  const params = useParams();
  const { types } = useLoaderData<typeof loader>();
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
    <div className="flex flex-col gap-4">
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
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell className="w-[70px] truncate">{type.id}</TableCell>
                <TableCell className="md:pl-20 font-bold">
                  {type.type}
                </TableCell>
                <TableCell className="flex flex-row gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/types/${params.type}/${type.id}/edit`);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <fetcher.Form
                    action={`/types/${params.type}/${type.id}/destroy`}
                    method="post"
                    onSubmit={(event) => {
                      const response = confirm(
                        "Voulez-vous vraiment supprimer ce type ?"
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
          </TableBody>Ï
        </Table>
        <div className="w-1/3 border border-dashed border-black bg-slate-100 rounded-xl h-[200px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
