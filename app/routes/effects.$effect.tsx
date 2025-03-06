import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { EffectChoice, getEffect } from "~/api/effects/getEffect";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const effects = await getEffect(params.effect as EffectChoice);
  if (!effects) {
    throw new Response("Not Found", { status: 404 });
  }
  console.log(effects);
  return { effects };
};

// export const loader = async () => {
//   const bodyEffects = await prisma.bodyEffect.findMany({
//     select: {
//       id: true,
//       effect: true,
//     },
//     orderBy: {
//       effect: "asc",
//     },
//   });

//   if (!bodyEffects) {
//     throw new Response("Not Found", { status: 404 });
//   }

//   return bodyEffects;
// };

export default function Effect() {
  const params = useParams();
  const { effects } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground">
        Les effets de la pierre sur
        <span className="font-bold"> {params.effect}</span>.
      </p>
      <div className="flex flex-col gap-4">
        {effects.map((effect) => (
          <p key={effect.id}>{effect.effect}</p>
        ))}
      </div>
    </div>
  );
}
