import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { OtherParamChoice } from "~/api/otherParams/createOther";
import { destroyOtherParam } from "~/api/otherParams/destroyOther";

export const action = async ({ params }: ActionFunctionArgs) => {
  const other = params.other as OtherParamChoice;
  if (!params.id) throw new Response("ID manquant", { status: 400 });
  await destroyOtherParam(other, params.id);
  return redirect(`/others/${other}`);
};
