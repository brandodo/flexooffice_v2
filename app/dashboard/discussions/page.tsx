"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import DiscussionCards from "@/components/DiscussionCards/DiscussionCards";

const Discussions = () => {
  const router = useRouter();

  return (
    <section className="flex flex-col p-4 overflow-auto items-center">
      <div className="flex justify-between items-center mb-4 w-3/4 px-2">
        <div className="flex gap-8">
          <Popover>
            <PopoverTrigger>Most Comments</PopoverTrigger>
            <PopoverContent className="p-2 bg-white rounded shadow-lg">
              <ul className="flex flex-col gap-2">
                <li>Most Comments</li>
                <li>Least Comments</li>
              </ul>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger>Most Upvotes</PopoverTrigger>
            <PopoverContent className="p-2 bg-white rounded shadow-lg">
              <ul className="flex flex-col gap-2">
                <li>Most Upvotes</li>
                <li>Least Upvotes</li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="bg-gray-700 text-white rounded p-2 ml-4"
          onClick={() => {
            console.log("clicked");
            router.push("/dashboard/discussions/create");
          }}
        >
          New Post
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <DiscussionCards />
      </Suspense>
    </section>
  );
};

export default Discussions;
