import {
  format,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { useState, useRef } from "react";

export function useWeekNav() {
  const [referenceDate, setReferenceDate] = useState(new Date());
  const touchStartX = useRef<number | null>(null);

  const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
  const end = endOfWeek(referenceDate, { weekStartsOn: 1 });
  const currentWeekDays = eachDayOfInterval({ start, end });

  const handleNextWeek = () => {
    setReferenceDate((prevDate) => addWeeks(prevDate, 1));
  };

  const handlePrevWeek = () => {
    setReferenceDate((prevDate) => subWeeks(prevDate, 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 50;
    if (delta > THRESHOLD) handlePrevWeek();
    if (delta < -THRESHOLD) handleNextWeek();
    touchStartX.current = null;
  };

  // all state and handlers here
  return {
    currentWeekDays,
    handleNextWeek,
    handlePrevWeek,
    handleTouchStart,
    handleTouchEnd,
  };
}
