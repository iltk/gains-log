"use client";
import { useState } from "react";
import { FaPen } from "react-icons/fa6";
import { LogEntry } from "@/components/sections/log/LogSection";
import { UNITS } from "@/components/sections/log/create-food/constants";
import { modifyFood } from "@/actions/food";
import { useRef } from "react";

interface Props {
  entry: LogEntry;
    onRefresh: () => void;

}

const ModalEdit = ({ entry, onRefresh }: Props) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [showUnitSheet, setShowUnitSheet] = useState(false);
  const [weightUnit, setWeightUnit] = useState("g");
  const [servingWeight, setServingWeight] = useState(
    String(entry.foodItem.serving_weight || ""),
  );
  const [servingQty, setServingQty] = useState(
    String(entry.foodItem.serving_size || "1"),
  );
  const [kcal, setKcal] = useState(String(entry.foodItem.kcal));
  const [totalFat, setTotalFat] = useState(String(entry.foodItem.total_fat));
  const [totalCarbs, setTotalCarbs] = useState(
    String(entry.foodItem.total_carbs),
  );
  const [totalProtein, setTotalProtein] = useState(
    String(entry.foodItem.total_protein),
  );

  const dialogId = `edit-dialog-${entry.id}`;

  const handleSave = async () => {
    await modifyFood(entry.foodItem.id, {
      serving_weight: parseFloat(servingWeight) || 0,
      serving_size: parseFloat(servingQty) || 1,
      kcal: parseFloat(kcal) || 0,
      total_fat: parseFloat(totalFat) || 0,
      total_carbs: parseFloat(totalCarbs) || 0,
      total_protein: parseFloat(totalProtein) || 0,
    });
    popoverRef.current?.hidePopover();
    onRefresh();
    

    
  };

  return (
    <div className="overflow-hidden">

      <button popoverTarget={dialogId}>
        <FaPen size={10} />
      </button>

      <div className="h-screen w-screen" id={dialogId} popover="" ref={popoverRef}>
        <div className="flex flex-col h-full bg-[#1c1c1e] text-white relative">
          {/* Header */}

          <div className="flex items-center justify-center px-4 pt-4 pb-3 relative">
            <button
              popoverTarget={dialogId}
              popoverTargetAction="hide"
              className="absolute left-4 text-white text-xl font-light"
            >
              ✕
            </button>
            <h1 className={`text-base font-semibold`}>Modify Food</h1>
          </div>

          {/* Step 2 — nutrition facts */}
          <div className="flex-1 overflow-y-auto px-4 pt-0 pb-4 flex flex-col gap-5 mt-10">
            <div className="rounded-xl border border-white/10">
              <div className="flex justify-between px-4 py-2 bg-white text-black text-sm font-semibold">
                <span>Nutrition</span>
                <span>{servingWeight || "—"} g</span>
              </div>

              <div className="flex items-center px-4 py-3 border-t border-white/10">
                <span className="flex-1 text-sm font-semibold text-white">
                  Food
                </span>
                <input
                  type="string"
                  placeholder="recommended"
                  defaultValue={entry.foodItem.name}
                  className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
                />
              </div>

              <div className="flex items-center px-4 py-3 border-t border-white/10">
                <span className="flex-1 text-sm font-semibold text-white">
                  Energy (kcal)
                </span>
                <input
                  type="number"
                  placeholder="recommended"
                  value={kcal}
                  onChange={(e) => setKcal(e.target.value)}
                  className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
                />
              </div>
              <div className="flex items-center px-4 py-3 border-t border-white/10">
                <span className="flex-1 text-sm font-semibold text-white">
                  Total Fat (g)
                </span>
                <input
                  type="number"
                  placeholder="recommended"
                  value={totalFat}
                  onChange={(e) => setTotalFat(e.target.value)}
                  className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
                />
              </div>
              <div className="flex items-center pl-8 pr-4 py-3 border-t border-white/10">
                <span className="flex-1 text-sm text-white/70">
                  Saturated Fat (g)
                </span>
                <input
                  type="number"
                  placeholder="optional"
                  className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
                />
              </div>
              <div className="flex items-center px-4 py-3 border-t border-white/10">
                <span className="flex-1 text-sm font-semibold text-white">
                  Total Carbohydrate (g)
                </span>
                <input
                  type="number"
                  placeholder="recommended"
                  value={totalCarbs}
                  onChange={(e) => setTotalCarbs(e.target.value)}
                  className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
                />
              </div>

              <div className="flex items-center px-4 py-3 border-t border-white/10">
                <span className="flex-1 text-sm font-semibold text-white">
                  Protein (g)
                </span>
                <input
                  type="number"
                  placeholder="recommended"
                  value={totalProtein}
                  onChange={(e) => setTotalProtein(e.target.value)}
                  className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 px-4 gap-5 overflow-y-auto">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/70">Serving Weight</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Enter serving weight"
                  value={servingWeight}
                  onChange={(e) => setServingWeight(e.target.value)}
                  className="flex-1 bg-[#2c2c2e] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={() => setShowUnitSheet(true)}
                  className="bg-[#2c2c2e] rounded-lg px-4 py-3 text-sm text-white flex items-center gap-2 min-w-[80px]"
                >
                  {weightUnit} <span className="text-white/50">▾</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between">
                <label className="text-sm text-white/70">Serving Size</label>
                <span className="text-xs text-white/40">Required</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={servingQty}
                  onChange={(e) => setServingQty(e.target.value)}
                  className="w-16 bg-[#2c2c2e] rounded-lg px-3 py-3 text-sm text-white outline-none"
                />
                <input
                  type="text"
                  defaultValue={entry.foodItem.name}
                  className="flex-1 bg-[#2c2c2e] rounded-lg px-4 py-3 text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* unit picker bottom sheet */}
          {showUnitSheet && (
            <div
              className="absolute inset-0 bg-black/60 flex flex-col justify-end"
              onClick={() => setShowUnitSheet(false)}
            >
              <div
                className="bg-[#2c2c2e] rounded-t-2xl px-4 py-6 flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                {UNITS.map((u) => (
                  <button
                    key={u}
                    onClick={() => {
                      setWeightUnit(u);
                      setShowUnitSheet(false);
                    }}
                    className="flex justify-between items-center text-white text-base py-1"
                  >
                    <span>{u}</span>
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        weightUnit === u
                          ? "border-white bg-white"
                          : "border-white/40"
                      }`}
                    >
                      {weightUnit === u && (
                        <span className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom nav */}
          <div className="flex justify-between items-center px-4 py-5">
            <button
              onClick={() => {
                handleSave();
              }}
              className="flex items-center gap-1 bg-white text-black font-semibold text-sm px-6 py-3 rounded-full"
            >
              Save ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
