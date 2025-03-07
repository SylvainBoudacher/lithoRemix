import { Pencil } from "lucide-react";


export default function EditType() {
  
  return (
    
      <div className="flex flex-col justify-center items-center h-full text-zinc-500">
        <p>Selectionner un type à</p>
        <div className="flex flex-row gap-2 items-center">
        <p>modifier avec</p> <Pencil size={25} className="border shadow-md border-zinc-300 p-[0.2rem] rounded-md" />
        </div>
        
      </div>
    
  );
}
