"use client";
import { useState } from "react";
import { Protect } from "@clerk/nextjs";

import SearchSheet from "./SearchSheet";
import ShowList from "./ShowList";
import SortableShows from "./SortableShows";

import { Show, Vote } from "@/db/schema";
import { Button } from "@/components/ui/button";

export default function MainPage({
  addMovie,
  updateVotesAction,
}: {
  addMovie: (
    showId: number,
    name: string,
    image: string
  ) => Promise<{ shows: Show[]; votes: Vote[] }>;
  updateVotesAction: (
    votes: {
      showId: number;
      order: number;
    }[]
  ) => Promise<{ shows: Show[]; votes: Vote[] }>;
}) {
  const [voting, setVoting] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Protect permission="org:show:create">
        <SearchSheet
          addMovie={addMovie}
          open={searchOpen}
          onOpenChange={setSearchOpen}
        />
      </Protect>
      {voting && (
        <Protect permission="org:vote:create">
          <SortableShows
            updateVotesAction={updateVotesAction}
            onSave={() => setVoting(false)}
          />
        </Protect>
      )}
      {!voting && (
        <>
          <ShowList />{" "}
          <div className="flex items-center mt-5">
            <div className="flex-grow">
              <Protect permission="org:show:create">
                <Button onClick={() => setSearchOpen(true)} variant="secondary">
                  Add A Movie
                </Button>
              </Protect>
            </div>
            <Protect permission="org:vote:create">
              <Button onClick={() => setVoting(true)}>
                Vote Your Favorites
              </Button>
            </Protect>
          </div>
        </>
      )}
    </>
  );
}
