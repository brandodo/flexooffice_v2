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

const CalendarView = () => {
  const {
    toggleView,
    setToggleView,
    currentDate,
    setCurrentDate,
    daysArray,
    handleMonthToWeek,
    handleNext,
    handlePrev,
  } = useCalendarView();

  const calendarHeader = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${
    toggleView === "week" ? currentDate.getDate() : ""
  } ${currentDate.getFullYear()}`;

  return (
    <div className="flex flex-col h-screen border w-3/5 p-8 gap-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4 items-center">
          <Button onClick={() => setCurrentDate(new Date())}>Today</Button>
          <Button className="bg-gray-500" onClick={() => handlePrev()}>
            <ChevronLeftIcon />
          </Button>
          <Button className="bg-gray-500" onClick={() => handleNext()}>
            <ChevronRightIcon />
          </Button>
          <p className="font-bold">{calendarHeader}</p>
        </div>

        <Select
          defaultValue={toggleView}
          value={toggleView}
          onValueChange={(val: "week" | "month") => {
            setToggleView(val);
          }}
        >
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
            return (
              <div
                className="flex col-span-1 justify-center items-center gap-4 bg-blue-200 rounded-t-lg"
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
              <div
                className={`col-span-1 border p-2 ${
                  toggleView === "month"
                    ? "hover:cursor-pointer hover:bg-gray-100"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  if (day > 0) {
                    handleMonthToWeek(day);
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
                      ? "rounded-full border bg-blue-300 w-max px-1"
                      : ""
                  }`}
                >
                  {day > 0 ? day : ""}
                </p>
              </div>
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
