"use client";
import { useState } from "react";
import Step1Identity from "../create-food/Step1Identity";
import Step2Serving from "../create-food/Step2Serving";
import Step3Nutrition from "../create-food/Step3Nutrition";
import { createFood, createFoodAndLog } from "@/actions/food";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";
interface Props {
  onRefresh: () => void;
  hour: string;
  onClose: ()=> void;
}

const ModalCreate = ({ hour, onRefresh, onClose }: Props) => {

  const handleOnClose = () => {
    onRefresh();
    onClose();
  };

  const [step, setStep] = useState(1);

  const [foodName, setFoodName] = useState("");
  const [brandName, setBrandName] = useState("");

  const [servingType, setServingType] = useState<
    "Serving" | "100 g" | "100 ml"
  >("Serving");
  const [servingWeight, setServingWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("g");
  const [servingQty, setServingQty] = useState("1");
  const [servingName, setServingName] = useState("portion");

  const [kcal, setKcal] = useState("");
  const [total_fat, setTotalFat] = useState("");
  const [saturated_fat, setSaturatedFat] = useState("");
  const [total_carbs, setTotalCarbs] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugars, setSugars] = useState("");
  const [total_protein, setTotalProtein] = useState("");
  const [sodium, setSodium] = useState("");

  //console.log(new Date(hour))

  const handleCreateAndLog = async () => {
    await createFoodAndLog(
      {
        name: foodName,
        brand: brandName,
        serving_weight: parseFloat(servingWeight) || 0,
        serving_size: parseFloat(servingQty) || 1,
        kcal: parseFloat(kcal) || 0,
        total_fat: parseFloat(total_fat) || 0,
        total_carbs: parseFloat(total_carbs) || 0,
        total_protein: parseFloat(total_protein) || 0,
        consumption_log_id: 0,
        icon: undefined,
      },
      new Date(hour),
    );
    handleOnClose();
  };

  const handleCreate = async () => {
    await createFood({
      name: foodName,
      brand: brandName,
      serving_weight: parseFloat(servingWeight) || 0,
      serving_size: parseFloat(servingQty) || 1,
      kcal: parseFloat(kcal) || 0,
      total_fat: parseFloat(total_fat) || 0,
      total_carbs: parseFloat(total_carbs) || 0,
      total_protein: parseFloat(total_protein) || 0,
      consumption_log_id: 0,
      icon: undefined,
    });
    handleOnClose();
  };

  return (
    <div className="">
      <div className="flex flex-col h-full bg-[#1c1c1e] text-white relative">
        {/* Header */}
        <div className="flex items-center justify-center px-4 pt-4 pb-3 relative">
          <button
            onClick={onClose}
            className="absolute left-4 text-white text-xl font-light"
          >
            ✕
          </button>
          <h1
            className={`text-base font-semibold ${step > 1 ? "text-white/40" : ""}`}
          >
            Create Food
          </h1>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 px-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full ${step >= i ? "bg-white" : "bg-white/25"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <Step1Identity
            foodName={foodName}
            setFoodName={setFoodName}
            brandName={brandName}
            setBrandName={setBrandName}
          />
        )}
        {step === 2 && (
          <Step2Serving
            servingType={servingType}
            setServingType={setServingType}
            servingWeight={servingWeight}
            setServingWeight={setServingWeight}
            weightUnit={weightUnit}
            setWeightUnit={setWeightUnit}
            servingQty={servingQty}
            setServingQty={setServingQty}
            servingName={servingName}
            setServingName={setServingName}
          />
        )}
        {step === 3 && (
          <Step3Nutrition
            kcal={kcal}
            setKcal={setKcal}
            total_fat={total_fat}
            setTotalFat={setTotalFat}
            saturated_fat={saturated_fat}
            setSaturatedFat={setSaturatedFat}
            total_carbs={total_carbs}
            setTotalCarbs={setTotalCarbs}
            fiber={fiber}
            setFiber={setFiber}
            sugars={sugars}
            setSugars={setSugars}
            total_protein={total_protein}
            setTotalProtein={setTotalProtein}
            sodium={sodium}
            setSodium={setSodium}
            servingQty={servingQty}
            servingName={servingName}
          />
        )}

        {/* Bottom nav */}
        <div className="flex justify-between items-center px-4 py-5">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="w-10 h-10 rounded-full bg-[#3a3a3c] flex items-center justify-center text-white"
            >
              ‹
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              disabled={step === 1 && !foodName.trim()}
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1 bg-white text-black font-semibold text-sm px-6 py-3 rounded-full disabled:opacity-40"
            >
              Next ›
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="flex items-center gap-1 bg-[#3a3a3c] text-white font-semibold text-sm px-5 py-3 rounded-full"
              >
                Create ✓
              </button>
              <button
                onClick={handleCreateAndLog}
                className="flex items-center gap-1 bg-white text-black font-semibold text-sm px-5 py-3 rounded-full"
              >
                Create & Add ✓+
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;
