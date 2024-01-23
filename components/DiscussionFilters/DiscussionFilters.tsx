import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const DiscussionFilters = () => {
  return (
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
  );
};

export default DiscussionFilters;
