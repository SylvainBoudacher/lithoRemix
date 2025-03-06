import { useParams } from "@remix-run/react";

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
