"use client";
import { useState } from "react";
import { UNITS } from "./constants";

type ServingType = "Serving" | "100 g" | "100 ml";

interface Props {
  servingType: ServingType;
  setServingType: (v: ServingType) => void;
  servingWeight: string;
  setServingWeight: (v: string) => void;
  weightUnit: string;
  setWeightUnit: (v: string) => void;
  servingQty: string;
  setServingQty: (v: string) => void;
  servingName: string;
  setServingName: (v: string) => void;
}

const Step2Serving = ({
  servingType, setServingType,
  servingWeight, setServingWeight,
  weightUnit, setWeightUnit,
  servingQty, setServingQty,
  servingName, setServingName,
}: Props) => {
  const [showUnitSheet, setShowUnitSheet] = useState(false);

  return (
    <>
      <div className="flex flex-col flex-1 px-4 gap-5 overflow-y-auto">
        <p className="text-xl font-bold leading-snug">
          What will you be entering nutrition information for?
        </p>

        <div className="flex bg-[#2c2c2e] rounded-full p-1">
          {(["Serving", "100 g", "100 ml"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setServingType(t)}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-colors ${
                servingType === t ? "bg-white text-black" : "text-white/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="text-xl font-bold">Describe this serving</p>

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
              value={servingName}
              onChange={(e) => setServingName(e.target.value)}
              className="flex-1 bg-[#2c2c2e] rounded-lg px-4 py-3 text-sm text-white outline-none"
            />
          </div>
          <p className="text-xs text-white/40 mt-1">
            For example, if a serving is 4 pieces, enter 4 for quantity and pieces for serving name
          </p>
        </div>

        <div className="bg-[#2c2c2e] rounded-xl px-4 py-3 flex gap-3 items-start">
          <span className="mt-0.5 w-5 h-5 rounded-full border border-white/50 flex items-center justify-center text-xs shrink-0">i</span>
          <p className="text-xs text-white/50 leading-relaxed">
            If you provide the serving weight, all standard units of weight will be available when you log this food.
          </p>
        </div>
      </div>

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
                onClick={() => { setWeightUnit(u); setShowUnitSheet(false); }}
                className="flex justify-between items-center text-white text-base py-1"
              >
                <span>{u}</span>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  weightUnit === u ? "border-white bg-white" : "border-white/40"
                }`}>
                  {weightUnit === u && <span className="w-2 h-2 rounded-full bg-black" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Step2Serving;
