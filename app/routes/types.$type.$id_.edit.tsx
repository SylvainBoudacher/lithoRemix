import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { TypeChoice } from "~/api/types/createTypes";
import { getTypesById } from "~/api/types/getTypes";
import { updateType } from "~/api/types/updateTypes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const type = params.type as TypeChoice;
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  const types = await getTypesById(type, params.id);
  return json({ types });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const type = params.type as TypeChoice;
  const id = params.id;
  const formData = await request.formData();
  const typeValue = formData.get("typeValue");

  const errors: Record<string, string> = {};

  if (!id) throw new Response("ID manquant", { status: 400 });
  if (!typeValue) {
    errors.typeValue = "Veuillez remplir le champs";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors, { status: 400 });
  }

  try {
    await updateType(type, id, typeValue!.toString());
  } catch (error) {
    errors.typeValue = "Le type existe déjà";
    return json(errors, { status: 400 });
  }
  return redirect(`/types/${params.type}`);
};

export default function EditType() {
  const { types } = useLoaderData<typeof loader>();
  const [inputValue, setInputValue] = useState(types?.type);

  useEffect(() => {
    setInputValue(types?.type);
  }, [types]);

  const errors = useActionData<typeof action>();

  return (
    <Form method="post" id="type-form" className="w-full">
      <div className="p-6 flex  flex-col">
        <h1 className="text-xl font-bold mb-3 pb-3">Edition</h1>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-red-500">
            {errors?.typeValue}
          </p>
          <Input 
            name="typeValue" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">Enregistrer</Button>
        </div>
      </div>
    </Form>
  );
}
