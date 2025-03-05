import { Outlet, useParams } from "@remix-run/react";

export default function Effets() {
  const params = useParams();
  
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Tout les effets {params.body}</h1>
      <Outlet />
    </div>
  )
} 
