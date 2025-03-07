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
import { createOtherParam, OtherParamChoice } from "~/api/otherParams/createOther";
import { getOtherParams } from "~/api/otherParams/getOther";
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

const otherParamTitles: Record<OtherParamChoice, string> = {
  chakra: "Chakras",
  contraindication: "Contre indications",
  craftedForm: "Formes artisanales",
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const otherParams = await getOtherParams(params.other as OtherParamChoice);
  if (!otherParams) {
    throw new Response("Not Found", { status: 404 });
  }
  console.log(otherParams);
  return { otherParams };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("otherName");

  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Le nom du type est requis";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors, { status: 400 });
  }

  try {
    await createOtherParam(params.other as OtherParamChoice, name as string);
  } catch (error) {
    console.log("Erreur lors de la création du type:", error);
    errors.name = "Erreur lors de la création du type";
    return json(errors, { status: 400 });
  }
  return redirect(`/others/${params.other}`);
};

export default function Other() {
  const params = useParams();
  const { otherParams } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcher.state === "idle") {
      const form = document.getElementById("other-form") as HTMLFormElement;
      form.reset();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row">
        <fetcher.Form method="post" id="other-form">
          <div className="h-6 text-red-500 mb-2">
            {errors?.name && <p>{errors.name}</p>}
          </div>
          <div className=" flex flex-row gap-2">
            <Input
              name="otherName"
              className="w-60"
              placeholder={`Nom du type ${
                otherParamTitles[params.other as OtherParamChoice]
              }`}
            />
            <Button className="w-fit ">Ajouter un paramètre</Button>
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
            {otherParams.map((otherParam) => (
              <TableRow key={otherParam.id}>
                <TableCell className="w-[70px] truncate">{otherParam.id}</TableCell>
                <TableCell className="md:pl-20 font-bold">
                    {(() => {
                      if ('contraindicationName' in otherParam) return otherParam.contraindicationName;
                      if ('form' in otherParam) return otherParam.form;
                      if ('number' in otherParam) return otherParam.number;
                      return '';
                    })()}
                </TableCell>
                <TableCell className="flex flex-row gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/others/${params.other}/${otherParam.id}/edit`);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <fetcher.Form
                    action={`/others/${params.other}/${otherParam.id}/destroy`}
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
          </TableBody>
        </Table>
        <div className="w-1/3 border border-dashed border-black bg-slate-100 rounded-xl h-[200px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
