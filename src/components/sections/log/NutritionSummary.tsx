import React from "react";
import { FaFire } from "react-icons/fa";

const nut = [
  {
    date: "2026-06-05",
    id: 1,
    calories: 2100,
    protein: 165,
    carbs: 210,
    fat: 70,
  },
];

const NutritionSummary = () => {
  return (
    <div className="bg-[#1f1f1f]">
      {nut.map((nut) => (
        <div
          className="flex flex-row items-center justify-between w-full bg-[#1f1f1f] px-3 py-2 text-white"
          key={nut.id}
        >
          <div className="inline-flex items-center gap-1">
            <FaFire />
            {nut.calories}
          </div>

          <span>P {nut.protein}</span>

          <span>F {nut.fat}</span>

          <span>C {nut.carbs}</span>
        </div>
      ))}
    </div>
  );
};

export default NutritionSummary;
