"use client";
import { getPopular, searchByName } from "@/actions/food";
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

const SearchModal = ({ date, onRefresh, onClose }: Props) => {
  const [popularList, setPopularList] = useState<Food[]>([]);
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPopular();
        setPopularList(data || []);
      } catch (error) {
        console.error("Failed to fetch food:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    async function fetchSearch() {
      try {
        const data = await searchByName(query.trim());
        setSearchResults(data || []);
      } catch (error) {
        console.error("Failed to search food:", error);
      }
    }
    fetchSearch();
  }, [query]);

  const displayList = query.trim() ? searchResults : popularList;

  if (selectedFood) {
    return (
      <FoodDetail
        food={selectedFood}
        date={date}
        onBack={() => setSelectedFood(null)}
        onRefresh={() => {
          onRefresh();
          onClose();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto h-full mt-10">
      <div className="relative">
        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] rounded-lg text-white focus:outline-none"
        />

        {/* Optional Clear Button (shows only when query exists) */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <div>
        {displayList.map((food) => (
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

export default SearchModal;
