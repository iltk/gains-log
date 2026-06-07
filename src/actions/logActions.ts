"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface FoodItem {
  name: string;
  brand: string;
  serving_weight: number;
  serving_size: number;
  kcal: number;
  total_fat: number;
  total_carbs: number;
  total_protein: number;
  consumption_log_id: number;
  icon: string | undefined;
}


export async function getDailyLogs(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const logEntries = await prisma.logEntry.findMany({
    where: {
      consumptionLog: {
        consumed_at: { gte: startOfDay, lte: endOfDay },
      },
    },
    include: {
      foodItem: true,
      consumptionLog: true,
    },
  });

  return logEntries;
}

export async function deleteFood(foodItem: FoodItem, consumedAt: Date) {
  //  check if foodItem already in catalog
  let fetchedFoodItemId = await prisma.foodItem.findFirst({
    where: {
      name: foodItem.name,
      brand: foodItem.brand,
    },
    // Optional optimization: only fetch the ID column to save bandwidth
    select: { id: true },
  });

  if (!fetchedFoodItemId) return;

  //check if log was created at that time
  let consumtionLogId = await prisma.consumptionLog.findFirst({
    where: {
      consumed_at: consumedAt,
    },
  });

  if (!consumtionLogId) return;

  // deleteMany is used instead of delete because LogEntry has no @@unique on
  // [food_item_id, consumption_log_id] — Prisma's delete() requires a unique field
  await prisma.logEntry.deleteMany({
    where: {
      food_item_id: fetchedFoodItemId.id,
      consumption_log_id: consumtionLogId.id,
    },
  });

  revalidatePath("/");
}
