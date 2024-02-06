import { PRIORITY_COLORS } from "@/lib/utils";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TaskCard = ({ task }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          key={task._id}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`w-full rounded h-max p-2 ${
            PRIORITY_COLORS[task.priority]
          }`}
        >
          <p className="font-size-12 wrap">{task.title}</p>
        </div>
      </PopoverTrigger>

      <PopoverContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex items-center justify-between"
      >
        <div className="w-3/4">
          <h2 className="font-bold text-xl">{task.title}</h2>
          <p className="break-all">{task.description}</p>

          <p className="text-sm ">
            {new Date(task.scheduled_date).toDateString()}
          </p>
        </div>

        <div
          className={`rounded-full w-8 h-8 ${PRIORITY_COLORS[task.priority]}`}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TaskCard;
