"use client";

interface Props {
  foodName: string;
  setFoodName: (v: string) => void;
  brandName: string;
  setBrandName: (v: string) => void;
}

const Step1Identity = ({ foodName, setFoodName, brandName, setBrandName }: Props) => (
  <div className="flex flex-col flex-1 px-4 gap-6 overflow-y-auto">
    <div className="flex justify-center mt-2">
      <div className="relative">
        <div className="w-28 h-28 rounded-full border-2 border-dashed border-white/50 flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
        <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#3a3a3c] flex items-center justify-center shadow">
          <span className="text-xs">✏️</span>
        </button>
      </div>
    </div>

    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">Food Name</label>
        <span className="text-xs text-white/40">Required</span>
      </div>
      <input
        type="text"
        placeholder="Enter food name or description..."
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        className="w-full bg-[#2c2c2e] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
      />
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium">Brand Name</label>
      <input
        type="text"
        placeholder="Enter brand name if relevant..."
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        className="w-full bg-[#2c2c2e] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
      />
    </div>
  </div>
);

export default Step1Identity;
