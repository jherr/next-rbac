"use client";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Search from "./Search";

export default function SearchSheet({
  addMovie,
}: {
  addMovie: (showId: number, name: string, image: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet modal open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Search</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>TV Show Search</SheetTitle>
          <SheetDescription asChild>
            <Search
              addMovie={addMovie}
              onClose={() => {
                setOpen(false);
              }}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
