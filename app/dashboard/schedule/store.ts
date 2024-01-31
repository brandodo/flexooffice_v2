import { create } from "zustand";

export const useStore = create((set) => ({
  events: [],
  updateEvents: (newEvents) => set({ events: newEvents }),
  addEvent: (newEvent) =>
    set((state) => ({ events: [...state.events, newEvent] })),

  tasks: [],
  updateTasks: (newTasks) => set({ tasks: newTasks }),
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
}));
