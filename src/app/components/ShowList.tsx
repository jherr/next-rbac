"use client";

import { Button } from "@/components/ui/button";

export default function ShowList({
  updateShowOrder,
}: {
  updateShowOrder: () => void;
}) {
  return (
    <div className="flex flex-col">
      <Button
        onClick={async () => {
          await updateShowOrder();
        }}
      >
        Update Show Order
      </Button>
    </div>
  );
}
