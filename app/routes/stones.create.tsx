import { useParams } from "@remix-run/react";

export default function StonesCreate() {
  const params = useParams();
  

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Les pierres {params.body}</h1>

      <h1>Ajouter une pierre</h1>

     
     
    </div>
  );
}
