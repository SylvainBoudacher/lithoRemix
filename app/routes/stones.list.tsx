import {
  json,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { getStones } from "~/api/stones/getStones";
import { Button } from "~/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const loader = async () => {
  const stones = await getStones();
  return json({ stones });
};

export default function StonesCreate() {
  const { stones } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const isDestroying = fetcher.state === "submitting";
  const destroyingId = fetcher.formData?.get("id");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row mt-10">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">ID</TableHead>
              <TableHead className="md:pl-20">Nom</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stones.map((stone) => (
              <TableRow key={stone.id}>
                <TableCell className="w-[70px] truncate">{stone.id}</TableCell>
                <TableCell className="md:pl-20 font-bold">
                  {stone.name}
                </TableCell>
                <TableCell className="flex flex-row gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(`/stones/list/${stone.id}/edit`);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <fetcher.Form
                    action={`/stones/${stone.id}/destroy`}
                    method="post"
                    onSubmit={(event) => {
                      const response = confirm(
                        "Voulez-vous vraiment supprimer cette pierre ?"
                      );
                      if (!response) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="id" value={stone.id} />
                    <Button variant="destructive" type="submit">
                      {isDestroying && destroyingId === stone.id ? (
                        <Loader />
                      ) : (
                        <Trash2 />
                      )}
                    </Button>
                  </fetcher.Form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-1/3 border border-dashed border-black bg-slate-100 rounded-xl min-h-[200px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
