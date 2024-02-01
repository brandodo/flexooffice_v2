"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DiscussionHeader = () => {
  const router = useRouter();

  return (
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
          router.push("/discussions/create");
        }}
      >
        New Post
      </Button>
    </div>
  );
};

export default DiscussionHeader;
