"use client";

import { useStore } from "@/app/schedule/store";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export const useCalendarBlock = () => {
  const addEvent = useStore((state: any) => state.addEvent);
  const addTask = useStore((state: any) => state.addTask);
  const [newEventDate, setNewEventDate] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>("");

  const [selectedAnchor, setSelectedAnchor] = useState<HTMLElement | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState<string>("");
  const [type, setType] = useState<"event" | "task">("event");

  const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">(
    "low"
  );

  const handleCreateEvent = async () => {
    try {
      const res = await fetch(`/api/${type}s`, {
        method: "POST",
        body: JSON.stringify({
          title: eventTitle,
          scheduled_date: newEventDate,
          participants: type === "event" ? [] : undefined,
          priority: type === "task" ? taskPriority : undefined,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: `${type} created!`,
          variant: "success",
        });

        setSelectedAnchor(null);

        type === "event" ? addEvent(data) : addTask(data);
      }
    } catch (err) {}
  };

  return {
    newEventDate,
    setNewEventDate,
    selectedAnchor,
    setSelectedAnchor,
    eventTitle,
    setEventTitle,
    type,
    setType,
    taskPriority,
    setTaskPriority,
    description,
    setDescription,
    handleCreateEvent,
  };
};
