import React, { useState } from "react";
import { QrCode, Search, Sparkles, Rocket, BookOpen } from "lucide-react";

export type FoodView = "SCAN" | "SEARCH" | "AI" | "QUICK_ADD" | "LIBRARY" | "";

interface FoodNavProps {
  currentView: FoodView;
  onViewChange: (view: FoodView) => void;
  onClose: ()=> void;
  setisNavBarOpen: (val: boolean)=>void;
}

const ModalNavBar = ({ currentView, onViewChange, onClose, setisNavBarOpen }: FoodNavProps) => {
  return (
    <div className="w-full  font-sans select-none border-b border-neutral-800">
      {/* Manual Tab Items */}
      <div className="flex overflow-x-auto scrollbar-none px-1 justify-between">

        <button
          onClick={onClose}
          className="flex flex-col items-center justify-center pt-3 pb-3 relative  focus:outline-none"
        >
          ✕
        </button>

        {/* Scan Tab */}
        <button
          onClick={() => onViewChange("SCAN")}
          className="flex flex-col items-center justify-center pt-3 pb-3 relative  focus:outline-none"
        >
          <div className="flex items-center gap-1.5 text-white">
            <QrCode className="w-5 h-5 stroke-[2.25]" />
            <span className="text-[15px] font-medium tracking-wide whitespace-nowrap">
              Scan
            </span>
          </div>
          {currentView === "SCAN" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t" />
          )}
        </button>

        {/* Search Tab */}
        <button
          onClick={() => onViewChange("SEARCH")}
          className="flex flex-col items-center justify-center pt-3 pb-3 relative  focus:outline-none"
        >
          <div className="flex items-center gap-1.5 text-white">
            <Search className="w-5 h-5 stroke-[2.25]" />
            <span className="text-[15px] font-medium tracking-wide whitespace-nowrap">
              Search
            </span>
          </div>
          {currentView === "SEARCH" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t" />
          )}
        </button>

        {/* Quick Add Tab */}
        <button
          onClick={() => {onViewChange("QUICK_ADD"); setisNavBarOpen(false)}}
          className="flex flex-col items-center justify-center pt-3 pb-3 relative  focus:outline-none"
        >
          <div className="flex items-center gap-1.5 text-white">
            <Rocket className="w-5 h-5 stroke-[2.25]" />
            <span className="text-[15px] font-medium tracking-wide whitespace-nowrap">
              Quick Add
            </span>
          </div>
          {currentView === "QUICK_ADD" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t" />
          )}
        </button>

        {/* Library Tab */}
        <button
          onClick={() => {onViewChange("LIBRARY"); setisNavBarOpen(false);}}
          className="flex flex-col items-center justify-center pt-3 pb-3 relative  focus:outline-none"
        >
          <div className="flex items-center gap-1.5 text-white">
            <BookOpen className="w-5 h-5 stroke-[2.25]" />
            <span className="text-[15px] font-medium tracking-wide whitespace-nowrap">
              Library
            </span>
          </div>
          {currentView === "LIBRARY" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ModalNavBar;
