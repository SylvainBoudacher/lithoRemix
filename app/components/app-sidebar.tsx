import { Link, useLocation } from "@remix-run/react"
import { BookOpenText, Library, Pyramid, Sparkles } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Principales",
      items: [
        {
          title: "Le dictionnaire",
          url: "/",
          icon: Library,
        },
      ],
    },
    {
      title: "Gestion des données",
      url: "#",
      items: [
        {
          title: "Pierres",
          url: "/stones",
          icon: Pyramid,
        },
        {
          title: "Effets",
          url: "/effects",
          icon: Sparkles,
        },
        {
          title: "Autres paramètres",
          url: "/other",
          icon: BookOpenText,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  const navData = {
    ...data,
    navMain: data.navMain.map(group => ({
      ...group,
      items: group.items.map(item => ({
        ...item,
        isActive: location.pathname === item.url
      }))
    }))
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 py-2 mx-2">
          <img src="/logo.svg" alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">LithoDico</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link to={item.url}>{item.icon && <item.icon />} {item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
