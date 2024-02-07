"use client";

import React from "react";
import { useCalendarView } from "./useCalendarView";
import CalendarBlock from "./CalendarBlock/CalendarBlock";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { CalendarFilter } from "./CalendarFilter/CalendarFilter";
import CalendarDateControls from "./CalendarDateControls/CalendarDateControls";
import Calendar from "./Calendar/Calendar";

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
        <CalendarDateControls
          setCurrentDate={setCurrentDate}
          handlePrev={handlePrev}
          handleNext={handleNext}
          calendarHeader={calendarHeader}
        />

        <CalendarFilter toggleView={toggleView} setToggleView={setToggleView} />
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

      <Calendar
        currentDate={currentDate}
        daysArray={daysArray}
        toggleView={toggleView}
      />
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
