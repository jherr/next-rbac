"use client";
import { useState, useCallback } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Show, Vote } from "@/db/schema";

import Search from "./Search";
import { useShowsContext } from "./ShowContext";

export default function SearchSheet({
  addMovie,
}: {
  addMovie: (
    showId: number,
    name: string,
    image: string
  ) => Promise<{ shows: Show[]; votes: Vote[] }>;
}) {
  const [open, setOpen] = useState(false);

  const { setShows, setVotes } = useShowsContext();
  const onAddMovie = useCallback(
    (showId: number, name: string, image: string) => {
      addMovie(showId, name, image).then(({ shows, votes }) => {
        setShows(shows);
        setVotes(votes);
      });
    },
    [addMovie, setVotes, setShows]
  );

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
              addMovie={onAddMovie}
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
