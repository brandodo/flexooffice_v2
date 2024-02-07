import React from "react";
import { Dialog } from "../ui/dialog";
import QuickViewCard from "../QuickViewCard/QuickViewCard";
import { PRIORITY_COLORS } from "@/lib/utils";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const QuickViewCards = ({
  showEvents,
  events,
  showTasks,
  tasks,
  setIdToDelete,
  setTypeToDelete,
  handleDelete,
}) => {
  return (
    <div className="flex flex-col flex-1 gap-4 max-h-96 xl:max-h-full overflow-y-scroll">
      <Dialog>
        {showEvents &&
          events?.map((event) => {
            return (
              <QuickViewCard
                className="bg-blue-300 dark:bg-blue-900"
                onClick={() => {
                  setIdToDelete(event._id);
                  setTypeToDelete("events");
                }}
                scheduledDate={event?.scheduled_date}
                title={event?.title}
                key={event._id}
              />
            );
          })}

        {showTasks &&
          tasks?.map((task) => {
            return (
              <QuickViewCard
                className={`${PRIORITY_COLORS[task.priority]}`}
                key={task._id}
                onClick={() => {
                  setIdToDelete(task._id);
                  setTypeToDelete("tasks");
                }}
                title={task?.title}
                scheduledDate={task?.scheduled_date}
              />
            );
          })}

        <DeleteDialog handleDelete={handleDelete} />
      </Dialog>
    </div>
  );
};

export default QuickViewCards;
