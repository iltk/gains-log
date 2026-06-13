"use client";
import { useState } from "react";
import { ChevronLeft, Heart } from "lucide-react";
import { createFoodAndLog } from "@/actions/food";

// grams per unit
const UNIT_TO_GRAMS: Record<string, number> = {
  g: 1,
  oz: 28.3495,
  tbsp: 14.787,
  tsp: 4.929,
  ml: 1,
  cup: 236.588,
  lb: 453.592,
};

const UNITS = ["g", "oz", "tbsp", "tsp", "ml", "cup", "lb"] as const;
type Unit = (typeof UNITS)[number];

interface Food {
  id: number;
  name: string;
  brand: string;
  icon: string | null;
  serving_weight: number;
  serving_size: number;
  kcal: number;
  total_fat: number;
  total_carbs: number;
  total_protein: number;
}

interface Props {
  food: Food;
  date: string;
  onBack?: () => void;
  onRefresh?: () => void;
}

export default function FoodDetail({ food, date, onBack, onRefresh }: Props) {
  const [amount, setAmount] = useState(String(food.serving_weight || 100));
  const [unit, setUnit] = useState<Unit>("g");

  const grams = Number(amount) * UNIT_TO_GRAMS[unit];
  // scale relative to the catalog serving weight (default 100g if unset)
  const base = food.serving_weight > 0 ? food.serving_weight : 100;
  const scale = grams / base;

  const scaled = {
    kcal: food.kcal * scale,
    total_fat: food.total_fat * scale,
    total_carbs: food.total_carbs * scale,
    total_protein: food.total_protein * scale,
  };

  const handleAdd = async () => {
    await createFoodAndLog(
      {
        name: food.name,
        brand: food.brand,
        icon: food.icon ?? undefined,
        serving_weight: grams,
        serving_size: 1,
        kcal: scaled.kcal,
        total_fat: scaled.total_fat,
        total_carbs: scaled.total_carbs,
        total_protein: scaled.total_protein,
        consumption_log_id: 0,
      },
      new Date(date),
    );
    onRefresh?.();
    onBack?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center h-screen w-screen bg-[#1c1c1e]">
      <div className="flex flex-col w-full max-w-md h-full">

        {/* header */}
        <div className="flex items-center gap-3 px-4 pt-5 pb-4 border-b border-zinc-800/60">
          <button onClick={onBack} className="p-1 -ml-1 text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft size={22} />
          </button>
          <h1 className="text-base font-semibold truncate flex-1">{food.name}</h1>
          <button className="p-1 text-zinc-500 hover:text-rose-400 transition-colors">
            <Heart size={18} />
          </button>
        </div>

        <div className="flex-1">
          {/* calorie hero + macros */}
          <div className="px-4 py-5">
            <div className="flex items-center justify-center gap-8 mb-5">

              {/* big calorie number */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-black tracking-tight leading-none">
                  {Math.round(scaled.kcal)}
                </p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-medium">kcal</p>
              </div>

              {/* inline macros */}
              <div className="flex gap-4 text-sm">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-red-400">{scaled.total_protein.toFixed(1)}g</span>
                  <span className="text-xs text-zinc-500">Protein</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-amber-400">{scaled.total_fat.toFixed(1)}g</span>
                  <span className="text-xs text-zinc-500">Fat</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-emerald-400">{scaled.total_carbs.toFixed(1)}g</span>
                  <span className="text-xs text-zinc-500">Carbs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800/60 mx-4" />
        </div>

        {/* bottom bar */}
        <div className="flex gap-2 px-4 py-4 border-t border-zinc-800">
          {/* amount input */}
          <div className="flex items-center bg-zinc-800 rounded-xl px-4 flex-1 gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-white text-xl font-semibold w-full outline-none py-1"
            />
          </div>

          {/* unit selector */}
          <div className="bg-zinc-800 rounded-xl px-1">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="bg-transparent text-white text-base font-medium h-full px-2 outline-none cursor-pointer appearance-none"
            >
              {UNITS.map((u) => (
                <option key={u} value={u} className="bg-zinc-900">
                  {u}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAdd}
            className="bg-white hover:bg-zinc-100 transition-colors text-black text-base font-bold px-6 py-4 rounded-xl"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
}
