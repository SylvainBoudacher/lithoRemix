import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { OtherParamChoice } from "~/api/otherParams/createOther";
import { getOtherParamById } from "~/api/otherParams/getOther";
import { updateOtherParam } from "~/api/otherParams/updateOther";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const other = params.other as OtherParamChoice;
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  const otherParams = await getOtherParamById(other, params.id);
  return json({ otherParams });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const other = params.other as OtherParamChoice; 
  const id = params.id;
  const formData = await request.formData();
  const otherValue = formData.get("otherValue");

  const errors: Record<string, string> = {};

  if (!id) throw new Response("ID manquant", { status: 400 });
  if (!otherValue) {
    errors.otherValue = "Veuillez remplir le champs";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors, { status: 400 });
  }

  try {
    await updateOtherParam(other, id, otherValue!.toString());
  } catch (error) {
    errors.otherValue = "Le type existe déjà";
    return json(errors, { status: 400 });
  }
  return redirect(`/others/${params.other}`);
};

export default function OtherEdit() {
  const { otherParams } = useLoaderData<typeof loader>();
  
  const getValue = () => {
    if (!otherParams) return '';
    if ('contraindicationName' in otherParams) return otherParams.contraindicationName;
    if ('form' in otherParams) return otherParams.form;
    if ('number' in otherParams) return otherParams.number.toString();
    return '';
  };

  const [inputValue, setInputValue] = useState(getValue());

  useEffect(() => {
    setInputValue(getValue());
  }, [otherParams]);

  const errors = useActionData<typeof action>();

  return (
    <Form method="post" id="type-form" className="w-full">
      <div className="p-6 flex  flex-col">
        <h1 className="text-xl font-bold mb-3 pb-3">Edition</h1>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-red-500">
            {errors?.otherValue}
          </p>
          <Input 
            name="otherValue" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">Enregistrer</Button>
        </div>
      </div>
    </Form>
  );
}

