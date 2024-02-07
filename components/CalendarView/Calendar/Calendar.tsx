import React from "react";
import CalendarBlock from "../CalendarBlock/CalendarBlock";

const Calendar = ({ daysArray, toggleView, currentDate }) => {
  return (
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
  );
};

export default Calendar;
