import { create } from "zustand";

export const useStore = create((set) => ({
  events: [],
  updateEvents: (newEvents) => set({ events: newEvents }),
  addEvent: (newEvent) =>
    set((state) => ({ events: [...state.events, newEvent] })),
  deleteEvent: (id) =>
    set((state) => ({ events: state.events.filter((e) => e._id !== id) })),

  tasks: [],
  updateTasks: (newTasks) => set({ tasks: newTasks }),
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) })),
}));
