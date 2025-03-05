import { useParams } from "@remix-run/react";

export default function Effect() {
  const params = useParams();

  return (
    <div className="flex flex-col gap-4 p-6">
      
      <p className="text-muted-foreground">
        Découvrez les effets des pierres sur le corps {params.effect}.
      </p>
      
      
    </div>
  )
} 
