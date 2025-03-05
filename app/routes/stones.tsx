import { Outlet, useParams } from "@remix-run/react";

export default function Stones() {
  const params = useParams();
  
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Les pierres {params.body}</h1>
      <Outlet />
    </div>
  )
} 
