"use client";

import React from "react";
import { useCalendarView } from "./useCalendarView";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CalendarBlock from "./CalendarBlock/CalendarBlock";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import ScheduledQuickView from "../ScheduleQuickView/ScheduledQuickView";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

const CalendarView = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    toggleView,
    setToggleView,
    currentDate,
    setCurrentDate,
    daysArray,
    handleNext,
    handlePrev,
  } = useCalendarView();

  const calendarHeader = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${
    toggleView === "week" ? currentDate.getDate() : ""
  } ${currentDate.getFullYear()}`;

  return (
    <div className="flex flex-col flex-1 border w-3/5 p-8 gap-4">
      {isMobile && <p className="font-bold">{currentDate.toDateString()}</p>}

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-4 items-center">
          <Button onClick={() => setCurrentDate(new Date())}>Today</Button>
          <Button className="bg-gray-500" onClick={() => handlePrev()}>
            <ChevronLeftIcon />
          </Button>
          <Button className="bg-gray-500" onClick={() => handleNext()}>
            <ChevronRightIcon />
          </Button>
          {!isMobile && <p className="font-bold">{calendarHeader}</p>}
        </div>

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
              <ScheduledQuickView isDrawer />
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="md:hidden h-full">
        <CalendarBlock
          key={`${new Date().getMonth()}-${currentDate.getDate()}`}
          toggleView={toggleView}
          day={currentDate.getDate()}
          index={currentDate.getDate()}
          currentDate={currentDate}
        />
      </div>

      <div className="hidden md:flex flex-col flex-1">
        <div className="grid grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
            return (
              <div
                className="flex col-span-1 justify-center items-center gap-4 bg-blue-200 dark:bg-blue-800 rounded-t-lg"
                key={day}
              >
                {day}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 flex-1 border">
          {daysArray?.map((day, index) => {
            return (
              <CalendarBlock
                key={`${new Date().getMonth()}-${day}-${index}`}
                toggleView={toggleView}
                day={day}
                index={index}
                currentDate={currentDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default CalendarView;
