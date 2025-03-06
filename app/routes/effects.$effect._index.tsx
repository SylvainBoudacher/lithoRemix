import { Pencil } from "lucide-react";


export default function EditEffect() {
  
  return (
    
      <div className="flex flex-col justify-center items-center h-full text-zinc-500">
        <p>Selectionner un effet </p>
        <div className="flex flex-row gap-2 items-center">
        <p>à modifier avec</p> <Pencil size={25} className="border shadow-md border-zinc-300 p-[0.2rem] rounded-md" />
        </div>
        
      </div>
    
  );
}
