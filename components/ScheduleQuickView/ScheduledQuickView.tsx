import React from "react";
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

const ScheduledQuickView = () => {
  return (
    <div className="w-1/4 flex flex-col gap-6 border px-16 py-12">
      <h2 className="text-2xl font-bold">Scheduled Events</h2>

      <div className="space-y-2">
        <Label htmlFor="filter-category">Filter by Category</Label>
        <Select defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="work">Upcoming</SelectItem>
            <SelectItem value="personal">Attending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="flex justify-between items-center py-5">
            <div>
              <h3 className="font-semibold">Team Meeting</h3>
              <p className="text-sm text-gray-500">
                {new Date().toDateString()}
              </p>
            </div>
            <Button size="icon" variant="ghost">
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex justify-between items-center py-5">
            <div>
              <h3 className="font-semibold">Dave's Bday</h3>
              <p className="text-sm text-gray-500">
                {new Date().toDateString()}
              </p>
            </div>
            <Button size="icon" variant="ghost">
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </CardContent>
        </Card>
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
