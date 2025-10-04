import { redirect } from "@remix-run/node";

export async function action() {
  return redirect("/login");
}

export async function loader() {
  return redirect("/");
}
