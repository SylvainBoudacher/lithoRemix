import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold">Bienvenue sur LithoDico</h1>
    </div>
  );
}

