
export default function CardKpi({title, value, description}: {title: string, value: number, description: string}) {
    return (
      <div className="border border-zinc-300 rounded-lg p-4 shadow-md w-60 h-40 flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-shadow">
        <p className="text-zinc-500 text-sm capitalize">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>
    );
  }