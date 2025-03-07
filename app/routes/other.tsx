import { NavLink, Outlet } from "@remix-run/react";
import { LucideIcon, Shell, ShieldAlert, TriangleDashed } from "lucide-react";

export default function Effets() {
  const EffectsNavList: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[] = [
    {
      title: "Formes artisanales",
      url: "/other/crafted-form",
      icon: TriangleDashed,
    },
    {
      title: "Chakras",
      url: "/other/chakra",
      icon: Shell,
    },
    {
      title: "Contre indications",
      url: "/other/contraindication",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Tout les autres paramètres</h1>

      <div className="flex flex-row gap-12 pt-6">
        {EffectsNavList.map((effect) => (
          <NavLink
            key={effect.url}
            to={effect.url}
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-primary font-bold" : "text-gray-500"
              }`
            }
          >
            <effect.icon />
            {effect.title}
          </NavLink>
        ))}
      </div>

      <div className="h-[1px] w-full bg-border mt-2" />

      <Outlet />
    </div>
  );
}
