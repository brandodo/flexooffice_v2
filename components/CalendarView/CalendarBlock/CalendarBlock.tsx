"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { useCalendarBlock } from "./useCalendarBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "@/app/schedule/store";
import EventCard from "@/components/EventCard/EventCard";
import TaskCard from "@/components/TaskCard/TaskCard";
import { PRIORITY_COLORS } from "@/lib/utils";

const PRIORITY_MAP: ["low", "medium", "high"] = ["low", "medium", "high"];

const CalendarBlock = ({ toggleView, day, index, currentDate }) => {
  const events = useStore((state: any) =>
    state.events.filter((event) => {
      return (
        new Date(event.scheduled_date).toDateString() ===
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          ).toDateString() && day > 0
      );
    })
  );

  const tasks = useStore((state: any) =>
    state.tasks.filter((task) => {
      return (
        new Date(task.scheduled_date).toDateString() ===
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          ).toDateString() && day > 0
      );
    })
  );

  const {
    newEventDate,
    setNewEventDate,
    selectedAnchor,
    setSelectedAnchor,
    eventTitle,
    setEventTitle,
    type,
    setType,
    taskPriority,
    setTaskPriority,
    description,
    setDescription,
    handleCreateEvent,
    setUserSearch,
    userResults,
  } = useCalendarBlock();

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) {
          setSelectedAnchor(null);
          setEventTitle("");
          setType("event");
        }
      }}
    >
      <PopoverTrigger
        asChild
        className={`border p-1 ${
          toggleView === "month"
            ? "hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900"
            : ""
        }`}
      >
        <div
          className={`col-span-1 w-full h-full ${
            toggleView === "month"
              ? "hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-900"
              : ""
          }`}
          key={index}
          onClick={(e) => {
            if (day > 0) {
              setSelectedAnchor(e.target as HTMLElement);
              setNewEventDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              );
            }
          }}
        >
          <p
            className={`${
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              ).toDateString() === new Date().toDateString()
                ? "rounded-full border bg-blue-300 px-1 dark:bg-blue-900"
                : ""
            } w-max`}
          >
            {day > 0 ? day : ""}
          </p>
          <div className="flex flex-col gap-3">
            {events?.map((event) => {
              return <EventCard event={event} />;
            })}

            {tasks?.map((task) => {
              return <TaskCard task={task} />;
            })}

            {selectedAnchor && (
              <PopoverAnchor>
                <div
                  className={`w-full rounded h-max p-2 ${
                    type === "event"
                      ? "bg-blue-300 dark:bg-blue-900"
                      : PRIORITY_COLORS[taskPriority]
                  }`}
                >
                  <p className="font-size-12 wrap">
                    {eventTitle
                      ? `${eventTitle?.substring(0, 20)}${
                          eventTitle.length > 20 ? "..." : ""
                        }`
                      : `New ${type}...`}
                  </p>
                </div>
              </PopoverAnchor>
            )}
          </div>
        </div>
      </PopoverTrigger>
      {selectedAnchor && (
        <PopoverContent className="w-96">
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
              <div className="flex gap-2 items-center">
                <p>Priority:</p>
                {PRIORITY_MAP.map((p) => {
                  return (
                    <TooltipProvider key={p}>
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

            {type === "event" && (
              <Command>
                <CommandInput
                  placeholder="Invite guests..."
                  onChangeCapture={(e: any) => {
                    setUserSearch(e.target.value as string);
                  }}
                />

                <CommandList>
                  {userResults?.map((user: any) => {
                    return <CommandItem>{user.name}</CommandItem>;
                  })}
                  <CommandEmpty>No results found.</CommandEmpty>
                </CommandList>
              </Command>
            )}
            <Textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <Button onClick={handleCreateEvent}>Create</Button>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default CalendarBlock;
