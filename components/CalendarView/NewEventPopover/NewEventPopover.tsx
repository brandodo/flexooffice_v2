import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommandInput, CommandList, CommandEmpty } from "cmdk";
import { Command } from "lucide-react";
import React from "react";

const PRIORITY_MAP: ["low", "medium", "high"] = ["low", "medium", "high"];

const PRIORITY_COLORS = {
  low: "bg-green-300",
  medium: "bg-yellow-300",
  high: "bg-red-300",
};

const NewEventPopover = ({
  eventTitle,
  setEventTitle,
  type,
  setType,
  newEventDate,
  taskPriority,
  setTaskPriority,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <Input
        type="text"
        placeholder="Add a title for your event..."
        value={eventTitle}
        onChange={(e) => {
          setEventTitle(e.target.value);
        }}
      />

      <div className="flex gap-2 items-center">
        <Button
          variant={`${type === "event" ? "secondary" : "outline"}`}
          value="event"
          onClick={(e) => {
            setType("event");
          }}
        >
          Event
        </Button>
        <Button
          variant={`${type === "task" ? "secondary" : "outline"}`}
          value="task"
          onClick={(e) => {
            setType("task");
          }}
        >
          Task
        </Button>
      </div>

      <p>From: {newEventDate?.toDateString()}</p>
      {type === "task" && (
        <div className="flex gap-2">
          {PRIORITY_MAP.map((p) => {
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={() => {
                        setTaskPriority(p);
                      }}
                      className={`${PRIORITY_COLORS[p]} ${
                        taskPriority === p ? "border-black" : ""
                      } rounded-full border w-8 h-8 hover:cursor-pointer`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{p}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      )}

      {type === "event" ? (
        <Command>
          <CommandInput placeholder="Invite guests..." />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </Command>
      ) : (
        <Textarea placeholder="Add a description..." />
      )}

      <Button>Create</Button>
    </div>
  );
};

export default NewEventPopover;
