"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface LogEntryUpdate {
  serving_weight: number;
  serving_size: number;
  kcal: number;
  total_fat: number;
  total_carbs: number;
  total_protein: number;
}

export async function updateLogEntry(id: number, data: LogEntryUpdate) {
  await prisma.logEntry.update({
    where: { id },
    data: {
      kcal: data.kcal,
      total_fat: data.total_fat,
      total_carbs: data.total_carbs,
      total_protein: data.total_protein,
      serving_weight: data.serving_weight,
      serving_size: data.serving_size,
    },
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
      kcal: foodItem.kcal,
      total_fat: foodItem.total_fat,
      total_carbs: foodItem.total_carbs,
      total_protein: foodItem.total_protein,
      serving_weight: foodItem.serving_weight,
      serving_size: foodItem.serving_size,
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

export async function searchByName(name: string) {
  return await prisma.foodItem.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive", // Supported on PostgreSQL and MongoDB
      },
    },
  });
}

export async function getPopular() {
  const ranked = await prisma.logEntry.groupBy({
    by: ["food_item_id"],
    _count: { food_item_id: true },
    orderBy: { _count: { food_item_id: "desc" } },
  });

  const ids = ranked.map((r) => r.food_item_id);
  const foods = await prisma.foodItem.findMany({ where: { id: { in: ids } } });

  // findMany doesn't guarantee order reorder to match rank
  return ids.map((id) => foods.find((f) => f.id === id)!);
}
