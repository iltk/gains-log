"use client";
import React from "react";
import ModalCreate from "./ModalCreate";
import QuickAddModal from "./QuickAddModal";
import { QrCode, Search, Sparkles, Rocket, BookOpen } from "lucide-react";
import ModalNavBar from "./ModalNavBar";
import { FoodView } from "./ModalNavBar";
import { useState } from "react";
interface Props {
  onRefresh: () => void;
  hour: string;
  onClose: () => void;
}

const FoodCreationModalManager = ({ hour, onRefresh, onClose }: Props) => {
  const [selectedFoodView, setSelectedFoodView] = useState<FoodView>("");
  const [isNavBarOpen, setisNavBarOpen] = useState(true);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen bg-[#1c1c1e]">
      <div className="h-full w-full">

        {isNavBarOpen && (
          <nav>
            <ModalNavBar
              currentView={selectedFoodView}
              onViewChange={setSelectedFoodView}
              onClose={onClose}
              setisNavBarOpen={setisNavBarOpen}
            />
          </nav>
        )}

        {selectedFoodView === "LIBRARY" && (
          <ModalCreate hour={hour} onRefresh={onRefresh} onClose={onClose}  />
        )}

        {selectedFoodView === "QUICK_ADD" && (
          <QuickAddModal hour={hour} onRefresh={onRefresh} onClose={onClose} />
        )}

        <div></div>
      </div>
    </div>
  );
};

export default FoodCreationModalManager;

//      <ModalCreate hour={hour} onRefresh={onRefresh} onClose={onClose}  />
