import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "@remix-run/react";

import { HeroUIProvider } from "@heroui/react";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "./components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "./components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "LithoDico" },
    { name: "description", content: "LithoDico App with RemixJS" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <HeroUIProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </HeroUIProvider>
      </body>
    </html>
  );
}

export const translationPath = [
  {
    path: "body",
    translation: "Corporel"
  },
  {
    path: "spiritual",
    translation: "Spirituel"
  },
  {
    path: "emotional",
    translation: "Emotionnel"
  },
  {
    path: "craftedForms",
    translation: "Forme artisanale"
  },
  {
    path: "others",
    translation: "Autres paramètres"
  },
  {
    path: "stones",
    translation: "Pierres"
  },
]


export default function App() {
  const location = useLocation();
 
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment !== '');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => (
                  <>
                    <BreadcrumbItem key={index}>
                      <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                      <BreadcrumbPage className="text-zinc-700 capitalize">
                        {translationPath.find(t => t.path === segment)?.translation || segment}
                      </BreadcrumbPage>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < pathSegments.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 p-6">
            <Outlet />
          </div>
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
