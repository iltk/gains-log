import React from "react";
import { FaFire } from "react-icons/fa";

interface Props {
  totals: { cal: number; protein: number; fat: number; carbs: number };
}

const NutritionSummary = ({ totals }: Props) => {
  const { cal: calories, protein, fat, carbs } = totals;

  return (
    <div className="bg-[#1f1f1f]">
      <div className="flex flex-row items-center justify-between w-full bg-[#1f1f1f] px-3 py-2 text-white">
        <div className="inline-flex items-center gap-1">
          {Math.round(calories)} <FaFire className="text-orange-400" />
        </div>

        <span>
          {Math.round(protein)} <span className="text-orange-400">P</span>
        </span>

        <span>
          {Math.round(fat)} <span className="text-yellow-400">F</span>
        </span>
        <span>
          {Math.round(carbs)} <span className="text-green-400">C</span>
        </span>
      </div>
    </div>
  );
};

export default NutritionSummary;
