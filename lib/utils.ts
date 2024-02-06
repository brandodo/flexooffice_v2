import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRIORITY_COLORS = {
  low: "bg-green-300 dark:bg-green-900",
  medium: "bg-yellow-300 dark:bg-yellow-900",
  high: "bg-red-300 dark:bg-red-900",
};
