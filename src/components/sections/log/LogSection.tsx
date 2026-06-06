"use client";
import { useState, useEffect, useMemo } from "react";
import DateBar from "@/components/sections/log/DateBar";
import NutritionSummary from "@/components/sections/log/NutritionSummary";
import Timeline from "@/components/sections/log/Timeline";
import { getDailyLogs } from "@/actions/logActions";
import { calcTotals } from "@/lib/macros";

interface FoodItem {
  id: number;
  name: string;
  brand: string;
  serving_weight: number;
  serving_size: number;
  kcal: number;
  total_fat: number;
  total_carbs: number;
  total_protein: number;
  consumption_log_id: number;
}

export interface Log {
  id: number;
  consumed_at: Date;
  foodItems: FoodItem[];
}

interface NutritionSummary {
  Cal: number;
  Protein: number;
  Fat: number;
  Carbs: number;
}

const LogSection = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());

  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => calcTotals(logs), [logs]);

  useEffect(() => {
    let cancelled = false;

    //clear the old logs
    setLogs([]);

    //display spinner while data is fethcing
    setLoading(true);

    //fetch new data
    const Timeline = async () => {
      //only update state if still relevant
        if (!cancelled){
          setLogs(await getDailyLogs(selectedDay));
          setLoading(false);
        }
    };

    Timeline();

    //clean up function, cleanup: flip the flag
    return () => {
      cancelled = true;
    };
  }, [selectedDay]);

  return (
    <div>
      <DateBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <NutritionSummary totals={totals} />

      <Timeline loading={loading} logs={logs} />
    </div>
  );
};

export default LogSection;

/**
 useMemo caches the result of calcTotals(logs) 
 and only recomputes it when logs changes. 
 Without it, calcTotals would run on every render — i
 ncluding re-renders caused by unrelated state changes.

However, for this specific case it's probably overkill. 
calcTotals is just summing numbers over a list of logs,
 which is fast. 
 useMemo itself has overhead (storing the cached value, comparing deps). 
 The rule of thumb: only use it when the computation is 
 genuinely expensive or when the result is passed as a prop to a memoized child component.


 When useEffect returns a function, React runs it before the next effect fires (or when the component unmounts).
 */
