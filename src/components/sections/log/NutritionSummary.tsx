import React from "react";
import { FaFire } from "react-icons/fa";
import { Log } from "./LogSection";

interface Props {
  totals: { cal: number; protein: number; fat: number; carbs: number };
}

const NutritionSummary = ({ totals }: Props) => {
  const { cal: calories, protein, fat, carbs } = totals;
  
  return (
    <div className="bg-[#1f1f1f]">
      <div
          className="flex flex-row items-center justify-between w-full bg-[#1f1f1f] px-3 py-2 text-white"
          
        >
          <div className="inline-flex items-center gap-1">
            <FaFire />
            {Math.round(calories)}
          </div>

          <span>P {Math.round(protein)}</span>

          <span>F {Math.round(fat)}</span>

          <span>C {Math.round(carbs)}</span>
        </div>
    </div>
  );
};

export default NutritionSummary;
