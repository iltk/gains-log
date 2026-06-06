"use client";

import { getDailyLogs } from "@/actions/logActions";
import prisma from "@/lib/prisma";
import { useEffect, useState } from "react";
import { Log } from "./LogSection";


interface Props {
  logs: Log[];
  loading: boolean
}



export default function Timeline({logs, loading}: Props) {
  console.log(logs);
  
  if (loading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      <div>
        {logs.map((timeSlot) => (
          <div key={timeSlot.id}>
            {timeSlot.foodItems.map((foodEntry) => (
              <div className="text-white" key={foodEntry.id}>
                {foodEntry.name} {/* string property */}
                {foodEntry.kcal > 0 && <span>{foodEntry.kcal} kcal</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
