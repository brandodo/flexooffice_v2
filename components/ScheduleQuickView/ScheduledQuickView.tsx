"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useStore } from "@/app/dashboard/schedule/store";
import { useScheduleQuickView } from "./useScheduleQuickView";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const PRIORITY_COLORS = {
  low: "bg-green-300",
  medium: "bg-yellow-300",
  high: "bg-red-300",
};

const ScheduledQuickView = () => {
  const {
    filterValue,
    setFilterValue,
    showEvents,
    showTasks,
    handleDelete,
    setIdToDelete,
    setTypeToDelete,
  } = useScheduleQuickView();

  const events = useStore((state: any) =>
    state.events.sort(
      (a, b) =>
        new Date(a.scheduled_date).getTime() -
        new Date(b.scheduled_date).getTime()
    )
  );
  const tasks = useStore((state: any) =>
    state.tasks.sort(
      (a, b) =>
        new Date(a.scheduled_date).getTime() -
        new Date(b.scheduled_date).getTime()
    )
  );

  return (
    <div className="w-1/4 flex flex-col gap-6 border px-16 py-12">
      <h2 className="text-2xl font-bold">Scheduled Events</h2>

      <div className="space-y-2">
        <Label htmlFor="filter-category">Filter by Category</Label>
        <Select
          defaultValue="all"
          value={filterValue}
          onValueChange={(val: "all" | "events" | "tasks") => {
            setFilterValue(val);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="tasks">Tasks</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <Dialog>
          {showEvents &&
            events?.map((event) => {
              return (
                <Card className="bg-blue-300" key={event._id}>
                  <CardContent className="flex justify-between items-center py-5">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.scheduled_date).toDateString()}
                      </p>
                    </div>
                    <DialogTrigger>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setIdToDelete(event._id);
                          setTypeToDelete("events");
                        }}
                      >
                        <Trash2Icon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </DialogTrigger>
                  </CardContent>
                </Card>
              );
            })}

          {showTasks &&
            tasks?.map((task) => {
              return (
                <Card
                  className={`${PRIORITY_COLORS[task.priority]}`}
                  key={task._id}
                >
                  <CardContent className="flex justify-between items-center py-5">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(task.scheduled_date).toDateString()}
                      </p>
                    </div>
                    <DialogTrigger>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setIdToDelete(task._id);
                          setTypeToDelete("tasks");
                        }}
                      >
                        <Trash2Icon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </DialogTrigger>
                  </CardContent>
                </Card>
              );
            })}

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

export default ScheduledQuickView;
