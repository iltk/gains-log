"use client";
import ModalCreate from "./ModalCreate";
import QuickAddModal from "./QuickAddModal";
import ModalNavBar from "./ModalNavBar";
import { FoodView } from "./ModalNavBar";
import { useState } from "react";
import ModalSearch from "./ModalSearch";
interface Props {
  onRefresh: () => void;
  date: string;
  onClose: () => void;
}

const FoodCreationModalManager = ({
  date: date,
  onRefresh,
  onClose,
}: Props) => {
  const [selectedFoodView, setSelectedFoodView] = useState<FoodView>("SEARCH");
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
          <ModalCreate date={date} onRefresh={onRefresh} onClose={onClose} />
        )}

        {selectedFoodView === "QUICK_ADD" && (
          <QuickAddModal date={date} onRefresh={onRefresh} onClose={onClose} />
        )}

        {selectedFoodView === "SEARCH" && <ModalSearch date={date} onRefresh={onRefresh} onClose={onClose}/>}

        <div></div>
      </div>
    </div>
  );
};

export default FoodCreationModalManager;

//      <ModalCreate hour={hour} onRefresh={onRefresh} onClose={onClose}  />
