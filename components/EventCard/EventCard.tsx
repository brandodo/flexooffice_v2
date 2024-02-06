import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const EventCard = ({ event }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          key={event._id}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-full rounded h-max bg-blue-300 dark:bg-blue-900 p-2"
        >
          <p className="font-size-12 wrap">{event.title}</p>
        </div>
      </PopoverTrigger>

      <PopoverContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col"
      >
        <h2 className="font-bold text-xl">{event.title}</h2>
        <p className="break-all">{event.description}</p>

        <p className="text-sm">
          {new Date(event.scheduled_date).toDateString()}
        </p>
      </PopoverContent>
    </Popover>
  );
};

export default EventCard;
