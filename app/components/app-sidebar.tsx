import {
  Bone,
  BookHeart,
  BookMinus,
  BookOpen,
  Droplet,
  EyeClosed,
  Frame,
  MessageCircleWarning,
  Shell,
  Sparkles,
  SquareRoundCorner,
  SunMoon
} from "lucide-react"
import * as React from "react"

import { NavMain } from "~/components/nav-main"
import { NavProjects } from "~/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "~/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Site",
      url: "#",
      icon: Frame,
    },
  ],
  navMain: [
    {
      title: "Effets",
      url: "#",
      icon: Sparkles,
      isActive: true,
      items: [
        {
          title: "Corporel",
          url: "/effect/body",
          icon: Bone,
        },
        {
          title: "Émotionnel",
          url: "#",
          icon: BookHeart,
        },
        {
          title: "Spiritel",
          url: "#",
          icon: EyeClosed,
        },
      ],
    },
    {
      title: "Types",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Purification",
          url: "#",
          icon: Droplet,
        },
        {
          title: "Rechargement",
          url: "#",
          icon: SunMoon,
        },
      ],
    },
    {
      title: "Autres",
      url: "#",
      icon: BookMinus,
      items: [
        {
          title: "Chakra",
          url: "#",
          icon: Shell,
        },
        {
          title: "Contre indications",
          url: "#",
          icon: MessageCircleWarning,
        },
        {
          title: "Forme artisanale",
          url: "#",
          icon: SquareRoundCorner,
        }
      ],
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-row items-end gap-2 mx-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <img src="/logo.svg" alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold group-data-[collapsible=icon]:hidden">LithoDico</h1>
       </div>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
