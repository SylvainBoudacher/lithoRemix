import { NavLink, Outlet, useParams } from "@remix-run/react";
import { Bone, BookHeart, Flower } from "lucide-react";

export default function Effets() {
  const params = useParams();

  const EffectsNavList = [
    {
      title: "Corporel",
      url: "/effects/body",
      icon: Bone,
    },
    {
      title: "Spirituel",
      url: "/effects/spiritual",
      icon: Flower,
    },
    {
      title: "Emotionnel",
      url: "/effects/emotional",
      icon: BookHeart,
    },
  ]
  
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Tout les effets {params.body}</h1>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-12 pt-10">
        {EffectsNavList.map((effect) => (
          <NavLink 
            to={effect.url} 
            className={({ isActive }) => 
              `flex items-center gap-2 ${isActive ? 'text-primary font-bold' : 'text-gray-500'}`
            }
          >
            <effect.icon />
            {effect.title}
          </NavLink>
        ))}
        </div>
      </div>


      <Outlet />
    </div>
  )
} 
