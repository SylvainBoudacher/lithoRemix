import { Link, useLocation } from "@remix-run/react";
import {
  BookOpenText,
  Library,
  LogIn,
  Pyramid,
  Sparkles,
  SunMoon,
  UserPlus,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { NavUser } from "./nav-user";

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
          url: "/stones/list",
          icon: Pyramid,
        },
        {
          title: "Effets",
          url: "/effects",
          icon: Sparkles,
        },
        {
          title: "Types",
          url: "/types",
          icon: SunMoon,
        },
        {
          title: "Autres paramètres",
          url: "/others",
          icon: BookOpenText,
        },
      ],
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  session: { user: { name: string; email: string; image?: string | null } } | null
}) {
  const location = useLocation();

  const navData = {
    ...data,
    navMain: data.navMain.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        isActive: location.pathname === item.url,
      })),
    })),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          to="/"
          className="flex items-center gap-2 py-2 mx-2 transition-all duration-100 hover:text-zinc-600"
        >
          <img src="/logo.svg" alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">LithoDico</h1>
        </Link>
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
                      <Link to={item.url}>
                        {item.icon && <item.icon />} {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {session?.user ? (
          <NavUser
            user={{
              name: session.user.name,
              email: session.user.email,
              avatar: session.user.image ?? "",
            }}
          />
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/login">
                  <LogIn />
                  Se connecter
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/signup">
                  <UserPlus />
                  Créer un compte
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
