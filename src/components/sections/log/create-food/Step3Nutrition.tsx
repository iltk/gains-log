"use client";

interface Props {
  kcal: string; setKcal: (v: string) => void;
  total_fat: string; setTotalFat: (v: string) => void;
  saturated_fat: string; setSaturatedFat: (v: string) => void;
  total_carbs: string; setTotalCarbs: (v: string) => void;
  fiber: string; setFiber: (v: string) => void;
  sugars: string; setSugars: (v: string) => void;
  total_protein: string; setTotalProtein: (v: string) => void;
  sodium: string; setSodium: (v: string) => void;
  servingQty: string;
  servingName: string;
}

const Step3Nutrition = ({
  kcal, setKcal,
  total_fat, setTotalFat,
  saturated_fat, setSaturatedFat,
  total_carbs, setTotalCarbs,
  fiber, setFiber,
  sugars, setSugars,
  total_protein, setTotalProtein,
  sodium, setSodium,
  servingQty, servingName,
}: Props) => (
  <div className="flex flex-col flex-1 px-4 gap-5 overflow-y-auto pb-4">
    <p className="text-xl font-bold">Provide nutrition facts for serving</p>

    <div className="rounded-xl overflow-hidden border border-white/10">
      <div className="flex justify-between px-4 py-2 bg-white text-black text-sm font-semibold">
        <span>Nutrition</span>
        <span>per {servingQty} {servingName}</span>
      </div>
      <div className="flex items-center px-4 py-3 border-t border-white/10">
        <span className="flex-1 text-sm font-semibold text-white">Energy (kcal)</span>
        <input
          type="number"
          placeholder="recommended"
          value={kcal}
          onChange={(e) => setKcal(e.target.value)}
          className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
        />
      </div>
      <div className="flex items-center px-4 py-3 border-t border-white/10">
        <span className="flex-1 text-sm font-semibold text-white">Total Fat (g)</span>
        <input
          type="number"
          placeholder="recommended"
          value={total_fat}
          onChange={(e) => setTotalFat(e.target.value)}
          className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
        />
      </div>
     
      <div className="flex items-center px-4 py-3 border-t border-white/10">
        <span className="flex-1 text-sm font-semibold text-white">Total Carbohydrate (g)</span>
        <input
          type="number"
          placeholder="recommended"
          value={total_carbs}
          onChange={(e) => setTotalCarbs(e.target.value)}
          className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
        />
      </div>
     
      
      <div className="flex items-center px-4 py-3 border-t border-white/10">
        <span className="flex-1 text-sm font-semibold text-white">Protein (g)</span>
        <input
          type="number"
          placeholder="recommended"
          value={total_protein}
          onChange={(e) => setTotalProtein(e.target.value)}
          className="w-28 bg-transparent text-right text-sm text-white/40 placeholder-white/30 outline-none"
        />
      </div>
     
    </div>
  </div>
);

export default Step3Nutrition;
