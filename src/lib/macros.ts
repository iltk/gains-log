import { LogEntry } from "@/components/sections/log/LogSection";

export const calcTotals = (logEntries: LogEntry[]) => {
  return {
    cal: logEntries.reduce((s, e) => s + e.foodItem.kcal, 0),
    protein: logEntries.reduce((s, e) => s + e.foodItem.total_protein, 0),
    fat: logEntries.reduce((s, e) => s + e.foodItem.total_fat, 0),
    carbs: logEntries.reduce((s, e) => s + e.foodItem.total_carbs, 0),
  };
};
