import { Bone, BookHeart, Flower, Leaf, Shell, ShieldAlert, Sun, TriangleDashed } from "lucide-react";

const iconPerType = {
    purification: <Sun size={16} />,
    rechargement: <Leaf size={16} />,
    Corporel: <Bone size={16} />,
    Spirituel: <Flower size={16} />,
    Emotionnel: <BookHeart size={16} />,
    chakras: <Shell size={16} />,
    contraindications: <ShieldAlert size={16} />,
    'Forme artisanale': <TriangleDashed size={16} />,
}


export default function CardKpi({title, value, description}: {title: string, value: number, description: string}) {
    return (
      <div className="border border-zinc-300 rounded-lg p-4 shadow-md w-60 h-40 flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-shadow">
        {iconPerType[title as keyof typeof iconPerType]}
        <p className="text-zinc-500 text-sm capitalize">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
    );
  }