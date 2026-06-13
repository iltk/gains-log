"use client";
import { useState } from "react";
import { createFood, createFoodAndLog } from "@/actions/food";

interface Props {
  date: string;
  onRefresh: () => void;
  onClose: () => void;
}

const QuickAddModal = ({ date: hour, onRefresh, onClose }: Props) => {
  const [energy, setEnergy] = useState("");
  const [energyUnit, setEnergyUnit] = useState("kcal");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [name, setName] = useState("");

  const macroSum = Math.round(
    (parseFloat(protein) || 0) * 4 +
      (parseFloat(fat) || 0) * 9 +
      (parseFloat(carbs) || 0) * 4,
  );

  const buildFoodItem = () => ({
    name: name || "Quick Add",
    brand: "",
    serving_weight: 0,
    serving_size: 1,
    kcal: parseFloat(energy) || 0,
    total_fat: parseFloat(fat) || 0,
    total_carbs: parseFloat(carbs) || 0,
    total_protein: parseFloat(protein) || 0,
    consumption_log_id: 0,
    icon: undefined,
  });

  const handleQuickAdd = async () => {
    await createFood(buildFoodItem());
    onRefresh();
    onClose();
  };

  const handleLogFoods = async () => {
    await createFoodAndLog(buildFoodItem(), new Date(hour));
    onRefresh();
    onClose();
  };

  return (
    <div className="flex flex-col  bg-[#1c1c1e] text-white px-4 pt-6 pb-8 gap-10">
      {/* Energy */}

      <div>
        <button
          onClick={onClose}
          className="absolute left-4 text-white text-xl font-light"
        >
          ✕
        </button>
      </div>
      <div>
        <label className="text-white text-base font-medium mb-2 block">
          Energy
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            className="flex-1 bg-[#2a2a2a] rounded-2xl px-4 py-4 text-white outline-none text-base"
          />
          <select
            value={energyUnit}
            onChange={(e) => setEnergyUnit(e.target.value)}
            className="bg-[#2a2a2a] rounded-2xl px-4 py-4 text-white outline-none text-base appearance-none pr-8"
          >
            <option value="kcal">kcal</option>
            <option value="kJ">kJ</option>
          </select>
        </div>
        <p className="text-white/40 text-sm mt-2">
          Macro sum is {macroSum} kcal
        </p>
      </div>

      {/* Protein / Fat / Carbs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Protein", value: protein, set: setProtein },
          { label: "Fat", value: fat, set: setFat },
          { label: "Carbs", value: carbs, set: setCarbs },
        ].map(({ label, value, set }) => (
          <div key={label}>
            <label className="text-white text-base font-medium mb-2 block">
              {label}
            </label>
            <div className="relative">
              <input
                type="number"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full bg-[#2a2a2a] rounded-2xl px-4 py-4 text-white outline-none text-base pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">
                g
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Name */}
      <div>
        <label className="text-white text-base font-medium mb-2 block">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#2a2a2a] rounded-2xl px-4 py-4 text-white outline-none text-base"
        />
      </div>

      <div className="flex-1" />

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleQuickAdd}
          className="w-full bg-[#2a2a2a] text-white font-semibold text-base py-4 rounded-2xl"
        >
          Quick Add
        </button>
        <button
          onClick={handleLogFoods}
          className="w-full bg-white text-black font-semibold text-base py-4 rounded-2xl"
        >
          Log Foods
        </button>
      </div>
    </div>
  );
};

export default QuickAddModal;
