import { LoaderFunctionArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { EffectChoice, getEffect } from "~/api/effects/getEffect";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const effects = await getEffect(params.effect as EffectChoice);
  if (!effects) {
    throw new Response("Not Found", { status: 404 });
  }
  console.log(effects);
  return effects;
};

export default function Effect() {
  const params = useParams();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">
        Les effets de la pierre sur
        <span className="font-bold"> {params.effect}</span>.
      </p>
    </div>
  );
}
