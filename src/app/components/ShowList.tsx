"use client";
import ShowCard from "./ShowCard";
import { useShowsContext } from "./ShowContext";

export default function ShowList() {
  const { shows } = useShowsContext();

  return (
    <div className="flex flex-col">
      {shows.map((show) => (
        <ShowCard key={show.id} poster={show.image} name={show.name} />
      ))}
    </div>
  );
}
