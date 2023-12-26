import { NextResponse } from "next/server";

import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { addShow, getShows, getVotes, updateVotes } from "@/db";

import MainPage from "./components/MainPage";

export default function Home() {
  const { userId, orgId } = auth();

  const addMovie = async (showId: number, name: string, image: string) => {
    "use server";
    const { has } = auth();
    if (userId && has({ permission: "org:show:create" })) {
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
    const { has } = auth();
    if (userId && has({ permission: "org:vote:create" })) {
      await updateVotes(userId, votes);
    }
    return {
      shows: await getShows(),
      votes: userId ? await getVotes(userId) : [],
    };
  };

  if (!userId) {
    return (
      <div className="flex h-screen justify-center items-center align-middle">
        <SignIn afterSignInUrl="/" redirectUrl="/" />
      </div>
    );
  }

  if (!orgId) {
    return NextResponse.redirect("/org-selection");
  }

  return (
    <div className="pt-3">
      <MainPage addMovie={addMovie} updateVotesAction={updateVotesAction} />
    </div>
  );
}
