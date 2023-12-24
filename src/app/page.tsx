import { SignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

import SearchSheet from "./components/SearchSheet";
import ShowList from "./components/ShowList";

import { addShow, updateShowOrder } from "@/db";

export default function Home() {
  const { userId }: { userId: string | null } = auth();

  const addMovie = async (showId: number, name: string, image: string) => {
    "use server";
    if (userId) {
      await addShow(userId, showId, name, image);
    }
  };

  const updateShowOrderAction = async () => {
    "use server";
    console.log("updateShowOrderAction");
    await updateShowOrder();
  };

  return (
    <div className="pt-3">
      {!userId && <SignIn />}
      {userId && <UserButton />}
      <SearchSheet addMovie={addMovie} />
      <ShowList updateShowOrder={updateShowOrderAction} />
    </div>
  );
}
