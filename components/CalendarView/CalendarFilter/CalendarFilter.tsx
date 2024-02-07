import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ScheduledQuickView from "@/components/ScheduleQuickView/ScheduledQuickView";

export const CalendarFilter = ({ toggleView, setToggleView }) => {
  return (
    <div className="flex gap-2 w-max">
      <Select
        defaultValue={toggleView}
        value={toggleView}
        onValueChange={(val: "week" | "month") => {
          setToggleView(val);
        }}
      >
        <SelectTrigger className="hidden md:flex">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectContent>
      </Select>

      <Drawer>
        <DrawerTrigger asChild className="xl:hidden">
          <Button>Scheduled</Button>
        </DrawerTrigger>
        <DrawerContent>
          <ScheduledQuickView />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
