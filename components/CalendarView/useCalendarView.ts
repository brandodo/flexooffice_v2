import { useStore } from "@/app/schedule/store";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { stat } from "fs";
import { useEffect, useMemo, useState } from "react";

export const useCalendarView = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [toggleView, setToggleView] = useState<"day" | "week" | "month">(
    "month"
  );
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateEvents = useStore((state: any) => state.updateEvents);
  const updateTasks = useStore((state: any) => state.updateTasks);

  const daysInCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Calculate total number of days in a month and add in first day offset
  const daysArray = useMemo(() => {
    if (toggleView === "month") {
      const temp: number[] = [];
      let offset = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getDay();

      for (let i = 1; i <= daysInCurrentMonth; i++) {
        temp.push(i);
      }

      for (let i = 0; i < offset; i++) {
        temp.unshift(0);
      }

      return temp;
    } else {
      const dayIndex = currentDate.getDay();
      const dayOfMonth = currentDate.getDate();
      const startDay = dayOfMonth - dayIndex;

      const temp: number[] = [];

      for (let i = 0; i < 7; i++) {
        temp.push(startDay + i);
      }

      return temp;
    }
  }, [toggleView, currentDate, daysInCurrentMonth]);

  const handleNextWeek = () => {
    setCurrentDate((prev) => {
      return new Date(prev.setDate(prev.getDate() + 7));
    });
  };

  const handlePrevWeek = () => {
    setCurrentDate((prev) => {
      return new Date(prev.setDate(prev.getDate() - 7));
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      if (prev.getMonth() === 11) {
        return new Date(prev.getFullYear() + 1, 0);
      }

      return new Date(prev.getFullYear(), prev.getMonth() + 1);
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      if (prev.getMonth() === 0) {
        return new Date(prev.getFullYear() - 1, 11);
      }

      return new Date(prev.getFullYear(), prev.getMonth() - 1);
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => {
      if (prev.getDate() === daysInCurrentMonth) {
        return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      }

      return new Date(prev.setDate(prev.getDate() + 1));
    });
  };

  const handlePrevDay = () => {
    setCurrentDate((prev) => {
      if (prev.getDate() === 1) {
        return new Date(
          prev.getFullYear(),
          prev.getMonth() - 1,
          daysInCurrentMonth
        );
      }

      return new Date(prev.setDate(prev.getDate() - 1));
    });
  };

  const handleMonthToWeek = (day: number) => {
    if (toggleView === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );

      setToggleView("week");
    }
  };

  useEffect(() => {
    const fetchEventsAndTasks = async () => {
      const eventsRes = await fetch("/api/events", {
        method: "GET",
      });

      if (eventsRes.ok) {
        const data = await eventsRes.json();
        updateEvents(data);
      }

      const tasksRes = await fetch("/api/tasks", {
        method: "GET",
      });

      if (tasksRes.ok) {
        const data = await tasksRes.json();
        updateTasks(data);
      }
    };

    fetchEventsAndTasks();
  }, []);

  useEffect(() => {
    if (isMobile) {
      setToggleView("day");
    } else {
      setToggleView("week");
    }
  }, [isMobile]);

  return {
    toggleView,
    setToggleView,
    currentDate,
    setCurrentDate,
    daysArray,
    daysInCurrentMonth,
    handleMonthToWeek,
    handleNext:
      toggleView === "day"
        ? handleNextDay
        : toggleView === "week"
        ? handleNextWeek
        : handleNextMonth,
    handlePrev:
      toggleView === "day"
        ? handlePrevDay
        : toggleView === "week"
        ? handlePrevWeek
        : handlePrevMonth,
  };
};
