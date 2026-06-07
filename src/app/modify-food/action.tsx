"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface FoodUpdate {
  serving_weight: number;
  serving_size: number;
  kcal: number;
  total_fat: number;
  total_carbs: number;
  total_protein: number;
}

export async function modifyFood(id: number, data: FoodUpdate) {
  await prisma.foodItem.update({
    where: { id },
    data,
  });
  revalidatePath("/");
}
