import CalendarView from "@/components/CalendarView/CalendarView";
import ScheduledQuickView from "@/components/ScheduleQuickView/ScheduledQuickView";

import React from "react";

const Schedule = () => {
  return (
    <div className="flex justify-end h-screen">
      <CalendarView />
      <ScheduledQuickView />
    </div>
  );
};

export default Schedule;
