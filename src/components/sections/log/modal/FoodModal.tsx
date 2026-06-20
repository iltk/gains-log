"use client";
import CreateModal from "./CreateModal";
import QuickAddModal from "./QuickAddModal";
import NavModal from "./NavModal";
import { FoodView } from "./NavModal";
import { useState } from "react";
import SearchModal from "./SearchModal";
interface Props {
  onRefresh: () => void;
  date: string;
  onClose: () => void;
}

const FoodModal = ({
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
            <NavModal
              currentView={selectedFoodView}
              onViewChange={setSelectedFoodView}
              onClose={onClose}
              setisNavBarOpen={setisNavBarOpen}
            />
          </nav>
        )}

        {selectedFoodView === "LIBRARY" && (
          <CreateModal date={date} onRefresh={onRefresh} onClose={onClose} />
        )}

        {selectedFoodView === "QUICK_ADD" && (
          <QuickAddModal date={date} onRefresh={onRefresh} onClose={onClose} />
        )}

        {selectedFoodView === "SEARCH" && <SearchModal date={date} onRefresh={onRefresh} onClose={onClose}/>}

        <div></div>
      </div>
    </div>
  );
};

export default FoodModal;

//      <ModalCreate hour={hour} onRefresh={onRefresh} onClose={onClose}  />
