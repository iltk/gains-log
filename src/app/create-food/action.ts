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

  let logEntry = await prisma.logEntry.create({
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

