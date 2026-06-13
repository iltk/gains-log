import { LogEntry } from "@/components/sections/log/LogSection";

export const calcTotals = (logEntries: LogEntry[]) => {
  return {
    cal: logEntries.reduce((s, e) => s + e.kcal, 0),
    protein: logEntries.reduce((s, e) => s + e.total_protein, 0),
    fat: logEntries.reduce((s, e) => s + e.total_fat, 0),
    carbs: logEntries.reduce((s, e) => s + e.total_carbs, 0),
  };
};
