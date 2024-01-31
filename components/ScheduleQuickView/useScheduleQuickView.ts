import { useStore } from "@/app/dashboard/schedule/store";
import { useState } from "react";
import { toast } from "../ui/use-toast";

export const useScheduleQuickView = () => {
  const deleteEvent = useStore((state: any) => state.deleteEvent);
  const deleteTask = useStore((state: any) => state.deleteTask);
  const [filterValue, setFilterValue] = useState<"all" | "events" | "tasks">(
    "all"
  );

  const [idToDelete, setIdToDelete] = useState<string>("");
  const [typeToDelete, setTypeToDelete] = useState<"events" | "tasks" | "">("");

  const showEvents = filterValue === "all" || filterValue === "events";
  const showTasks = filterValue === "all" || filterValue === "tasks";

  const handleDelete = async () => {
    try {
      const deleteRes = await fetch(`/api/${typeToDelete}/${idToDelete}`, {
        method: "DELETE",
      });

      const data = await deleteRes.json();

      if (deleteRes.ok) {
        typeToDelete === "events"
          ? deleteEvent(idToDelete)
          : deleteTask(idToDelete);

        toast({
          title: "Deleted!",
          variant: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    filterValue,
    setFilterValue,
    showEvents,
    showTasks,
    handleDelete,
    setIdToDelete,
    setTypeToDelete,
  };
};
