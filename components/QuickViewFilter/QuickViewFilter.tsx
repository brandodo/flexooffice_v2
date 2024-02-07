import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const QuickViewFilter = ({ filterValue, setFilterValue }) => {
  return (
    <>
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
    </>
  );
};

export default QuickViewFilter;
