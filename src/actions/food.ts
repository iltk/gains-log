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

export async function createFoodAndLog(foodItem: FoodItem, consumedAt: Date) {
  //  check if foodItem already in catalog
  let fetchedFoodItemId = await prisma.foodItem.findFirst({
    where: {
      name: foodItem.name,
      brand: foodItem.brand,
    },
    // Optional optimization: only fetch the ID column to save bandwidth
    select: { id: true },
  });

  //if food does not exist in db, create
  if (!fetchedFoodItemId) {
    fetchedFoodItemId = await prisma.foodItem.create({
      data: {
        name: foodItem.name,
        brand: foodItem.brand,
        icon: foodItem.icon,

        serving_weight: foodItem.serving_weight,
        serving_size: foodItem.serving_size,
        kcal: foodItem.kcal,
        total_fat: foodItem.total_fat,
        total_carbs: foodItem.total_carbs,
        total_protein: foodItem.total_protein,
      },
    });
  }

  //check if log was created at that time
  let consumtionLogId = await prisma.consumptionLog.findFirst({
    where: {
      consumed_at: consumedAt,
    },
  });

  if (!consumtionLogId) {
    consumtionLogId = await prisma.consumptionLog.create({
      data: {
        consumed_at: consumedAt,
      },
    });
  }

  await prisma.logEntry.create({
    data: {
      food_item_id: fetchedFoodItemId.id,
      consumption_log_id: consumtionLogId.id,
    },
  });

  revalidatePath("/");
}

export async function createFood(foodItem: FoodItem) {
  //  check if foodItem already in catalog
  let fetchedFoodItemId = await prisma.foodItem.findFirst({
    where: {
      name: foodItem.name,
      brand: foodItem.brand,
    },
    // Optional optimization: only fetch the ID column to save bandwidth
    select: { id: true },
  });

  //if food does not exist in db, create
  if (!fetchedFoodItemId) {
    fetchedFoodItemId = await prisma.foodItem.create({
      data: {
        name: foodItem.name,
        brand: foodItem.brand,
        icon: foodItem.icon,

        serving_weight: foodItem.serving_weight,
        serving_size: foodItem.serving_size,
        kcal: foodItem.kcal,
        total_fat: foodItem.total_fat,
        total_carbs: foodItem.total_carbs,
        total_protein: foodItem.total_protein,
      },
    });
  }
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
