"use client";
import { getAll } from "@/actions/food";
import React, { useState, useEffect } from "react";
import FoodDetail from "./FoodDetail";

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
  date: string;
  onRefresh: () => void;
  onClose: () => void;
}

const ModalSearch = ({ date, onRefresh, onClose }: Props) => {
  const [foodList, setFoodList] = useState<Food[]>();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAll();
        setFoodList(data);
      } catch (error) {
        console.error("Failed to fetch food:", error);
      }
    }
    fetchData();
  }, []);

  if (selectedFood) {
    return (
      <FoodDetail
        food={selectedFood}
        date={date}
        onBack={() => setSelectedFood(null)}
        onRefresh={() => { onRefresh(); onClose(); }}
      />
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto h-full mt-10">
      <div>
        {foodList?.map((food) => (
          <div key={food.id}>
            <button
              onClick={() => setSelectedFood(food)}
              className="flex items-center gap-4 px-4 py-4"
            >
              {/* icon */}
              <div className="w-12 h-12 flex items-center justify-center text-3xl shrink-0">
                {food.icon ?? "🍽️"}
              </div>

              {/* info */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white text-base font-semibold leading-snug">
                  {food.name}
                </span>
                <span className="text-[#8e8e93] text-sm mt-0.5">
                  {food.kcal}🔥&nbsp; {food.total_protein}P&nbsp;{" "}
                  {food.total_fat}F&nbsp; {food.total_carbs}C &nbsp;•&nbsp;{" "}
                  {food.serving_weight} g
                </span>
              </div>
            </button>
            <div className="h-px bg-[#2c2c2e] mx-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalSearch;
