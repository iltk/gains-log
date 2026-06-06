import { Log } from "@/components/sections/log/LogSection";

export const calcTotals = (logs: Log[]) => {
  const items = logs.flatMap((e) => e.foodItems);
  return {
    cal: items.reduce((s, i) => s + i.kcal, 0),
    protein: items.reduce((s, i) => s + i.total_protein, 0),
    fat: items.reduce((s, i) => s + i.total_fat, 0),
    carbs: items.reduce((s, i) => s + i.total_carbs, 0),
  };
};
