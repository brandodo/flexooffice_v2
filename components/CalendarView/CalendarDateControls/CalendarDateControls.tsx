import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Calendar } from "lucide-react";
import React from "react";

const CalendarDateControls = ({
  setCurrentDate,
  handlePrev,
  handleNext,
  calendarHeader,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
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

export default CalendarDateControls;
