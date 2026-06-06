"use client";
import { FaArrowRight, FaArrowLeftLong } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { useWeekNav } from "@/app/hooks/useWeekNav";
import { format, isEqual } from "date-fns";

interface Props {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}

export default function DateBar({selectedDay,setSelectedDay }: Props) {
  const {
    currentWeekDays,
    handleNextWeek,
    handlePrevWeek,
    handleTouchStart,
    handleTouchEnd,
  } = useWeekNav();

  return (
    <div
      className="bg-[#1f1f1f] flex flex-col gap-6 items-center p-5"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* top arrow + the header display selected day */}
      <div className="flex flex-row gap-5">
        <button
          className="inline-flex items-center justify-center text-white rounded-lg"
          onClick={handlePrevWeek}
        >
          <FaArrowLeftLong />
        </button>

        <h1 className="text-white">{format(selectedDay, "EEE, MMM dd")}</h1>

        <button
          className="inline-flex items-center justify-center text-white rounded-lg"
          onClick={handleNextWeek}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* display a list of days (7 days) */}
      <div className="flex flex-row justify-between w-full overflow-x-auto ">
        {currentWeekDays.map((day) => {
          const isSelected = isEqual(day.getDate(), selectedDay.getDate());
          const today = new Date();
          const isToday = isEqual(day.getDate(), today.getDate());
          return (
            <button
              key={day.toString()}
              className={`border rounded-4xl w-10 h-18  border-gray-500 ${isSelected ? "bg-[#4b4b4b]" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              <h2 className="text-center text-white">{format(day, "EEEEE")}</h2>
              <time className="text-white" dateTime={format(day, "yyyy-MM-dd")}>
                {day.getDate()}
              </time>
              <div className="flex justify-center">
                {isToday && <LuDot className="text-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
