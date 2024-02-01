import CalendarView from "@/components/CalendarView/CalendarView";
import ScheduledQuickView from "@/components/ScheduleQuickView/ScheduledQuickView";

import React from "react";

const Schedule = () => {
  return (
    <div className="flex flex-1 justify-end">
      <CalendarView />
      <ScheduledQuickView />
    </div>
  );
};

export default Schedule;
