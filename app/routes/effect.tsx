import { Outlet, useParams } from "@remix-run/react";

export default function BodyEffect() {
  const params = useParams();
  console.log(params);
  
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Effets {params.body}</h1>
      <Outlet />
    </div>
  )
} 
