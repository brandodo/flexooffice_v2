"use client";

import React from "react";
import { useStore } from "@/app/schedule/store";
import { useScheduleQuickView } from "./useScheduleQuickView";
import QuickViewFilter from "../QuickViewFilter/QuickViewFilter";
import QuickViewCards from "../QuickViewCards/QuickViewCards";

const PRIORITY_COLORS = {
  low: "bg-green-300 dark:bg-green-900",
  medium: "bg-yellow-300 dark:bg-yellow-900",
  high: "bg-red-300 dark:bg-red-900",
};
const ScheduledQuickView = () => {
  const {
    filterValue,
    setFilterValue,
    showEvents,
    showTasks,
    handleDelete,
    setIdToDelete,
    setTypeToDelete,
  } = useScheduleQuickView();

  const events = useStore((state: any) =>
    state.events.sort(
      (a, b) =>
        new Date(a.scheduled_date).getTime() -
        new Date(b.scheduled_date).getTime()
    )
  );
  const tasks = useStore((state: any) =>
    state.tasks.sort(
      (a, b) =>
        new Date(a.scheduled_date).getTime() -
        new Date(b.scheduled_date).getTime()
    )
  );

  return (
    <div className="w-full flex flex-col gap-6 xl:border px-12 py-8 xl:flex-1 overflow-hidden">
      <QuickViewFilter
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />

      <QuickViewCards
        showEvents={showEvents}
        events={events}
        showTasks={showTasks}
        tasks={tasks}
        setIdToDelete={setIdToDelete}
        setTypeToDelete={setTypeToDelete}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ScheduledQuickView;
