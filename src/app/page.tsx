import { SignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

import SearchSheet from "./components/SearchSheet";
import ShowList from "./components/ShowList";
import SortableShows from "./components/SortableShows";

import {
  addShow,
  getShows,
  getVotes,
  updateShowOrder,
  updateVotes,
} from "@/db";

export default function Home() {
  const { userId }: { userId: string | null } = auth();

  const addMovie = async (showId: number, name: string, image: string) => {
    "use server";
    if (userId) {
      await addShow(userId, showId, name, image);
    }
    return {
      shows: await getShows(),
      votes: userId ? await getVotes(userId) : [],
    };
  };

  const updateVotesAction = async (
    votes: {
      showId: number;
      order: number;
    }[]
  ) => {
    "use server";
    if (userId) {
      await updateVotes(userId, votes);
    }
    return {
      shows: await getShows(),
      votes: userId ? await getVotes(userId) : [],
    };
  };

  return (
    <div className="pt-3">
      {!userId && <SignIn />}
      {userId && <UserButton />}
      <SearchSheet addMovie={addMovie} />
      <div className="flex">
        <div className="w-full md:w-1/2 px-2">
          <SortableShows updateVotesAction={updateVotesAction} />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <ShowList />
        </div>
      </div>
    </div>
  );
}
