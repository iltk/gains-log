"use client";
import { useRouter } from "next/navigation";
import CreateFood from "@/components/sections/log/create-food";
import * as React from 'react';

export default function CreateFoodPage({ params }: { params: Promise<{ hour: string }> }) {
  const router = useRouter();
  const { hour: date } = React.use(params);

  const timestamp = parseInt(date, 10);
  //console.log(new Date(timestamp).toString());

  return (
    <div className="h-screen bg-[#1c1c1e]">
      <CreateFood hour={new Date(timestamp).toISOString()} onClose={() => router.back()} />
    </div>
  );
}
