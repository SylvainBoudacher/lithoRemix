/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function StoneCard({ stone }: { stone: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card isPressable shadow="md" radius="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              alt={stone.name}
              className="object-cover object-center h-40 w-40"
              radius="none"
              shadow="sm"
              src={stone?.pictures[0]?.url}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{stone.name}</b>
            <p className="text-default-500">{stone.description}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
