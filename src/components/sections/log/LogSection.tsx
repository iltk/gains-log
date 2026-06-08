"use client";
import { useState, useEffect, useMemo } from "react";
import DateBar from "@/components/sections/log/DateBar";
import NutritionSummary from "@/components/sections/log/NutritionSummary";
import Timeline from "@/components/sections/log/Timeline";
import { getDailyLogs } from "@/actions/food";
import { calcTotals } from "@/lib/macros";

export interface FoodItem {
  id: number;
  name: string;
  brand: string;
  serving_weight: number;
  serving_size: number;
  kcal: number;
  total_fat: number;
  total_carbs: number;
  total_protein: number;
}

export interface ConsumptionLog {
  id: number;
  consumed_at: Date;
}

export interface LogEntry {
  id: number;
  food_item_id: number;
  consumption_log_id: number;
  foodItem: FoodItem;
  consumptionLog: ConsumptionLog;
}

const LogSection = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [consumptionLogs, setConsumptionLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => calcTotals(consumptionLogs), [consumptionLogs]);

  const fetchLogs = async (day: Date) => {
    setConsumptionLogs([]);
    setLoading(true);
    setConsumptionLogs(await getDailyLogs(day));
    setLoading(false);
  };

  useEffect(() => {
    let cancelled = false;

    setConsumptionLogs([]);
    setLoading(true);

    const load = async () => {
      if (!cancelled) {
        setConsumptionLogs(await getDailyLogs(selectedDay));
        setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [selectedDay]);

  const refetch = () => fetchLogs(selectedDay);

  return (
    <div>
      <DateBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <NutritionSummary totals={totals} />

      <Timeline onRefresh={refetch} loading={loading} logEntries={consumptionLogs} selectedDay={selectedDay} onDelete={refetch} />
    </div>
  );
};

export default LogSection;

/**
 useMemo caches the result of calcTotals(consumptionLogs)
 and only recomputes it when consumptionLogs changes.
 Without it, calcTotals would run on every render — i
 ncluding re-renders caused by unrelated state changes.

However, for this specific case it's probably overkill.
calcTotals is just summing numbers over a list of consumptionLogs,
 which is fast.
 useMemo itself has overhead (storing the cached value, comparing deps).
 The rule of thumb: only use it when the computation is
 genuinely expensive or when the result is passed as a prop to a memoized child component.


 When useEffect returns a function, React runs it before the next effect fires (or when the component unmounts).
 */
