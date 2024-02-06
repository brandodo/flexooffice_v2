import CalendarView from "@/components/CalendarView/CalendarView";
import ScheduledQuickView from "@/components/ScheduleQuickView/ScheduledQuickView";

import React from "react";

const Schedule = () => {
  return (
    <div className="flex flex-1 justify-end overflow-hidden">
      <CalendarView />
      <div className="hidden xl:flex">
        <ScheduledQuickView />
      </div>
    </div>
  );
};

export default Schedule;
