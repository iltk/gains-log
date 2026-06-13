import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const foodDefs = [
  { name: "Oatmeal", brand: "Quaker", serving_weight: 80, serving_size: 1, kcal: 297, total_fat: 5.3, total_carbs: 53, total_protein: 10.5 },
  { name: "Banana", brand: "Generic", serving_weight: 120, serving_size: 1, kcal: 107, total_fat: 0.4, total_carbs: 27, total_protein: 1.3 },
  { name: "Greek Yogurt", brand: "Fage", serving_weight: 200, serving_size: 1, kcal: 130, total_fat: 0.7, total_carbs: 8, total_protein: 23 },
  { name: "Strawberries", brand: "Generic", serving_weight: 150, serving_size: 1, kcal: 48, total_fat: 0.5, total_carbs: 11, total_protein: 1 },
  { name: "Chicken Breast", brand: "Generic", serving_weight: 150, serving_size: 1, kcal: 248, total_fat: 5.4, total_carbs: 0, total_protein: 46.5 },
  { name: "Brown Rice", brand: "Generic", serving_weight: 200, serving_size: 1, kcal: 218, total_fat: 1.6, total_carbs: 45, total_protein: 4.5 },
  { name: "Broccoli", brand: "Generic", serving_weight: 100, serving_size: 1, kcal: 34, total_fat: 0.4, total_carbs: 7, total_protein: 2.8 },
  { name: "Protein Shake", brand: "MyProtein", serving_weight: 300, serving_size: 1, kcal: 180, total_fat: 2.5, total_carbs: 6, total_protein: 35 },
  { name: "Apple", brand: "Generic", serving_weight: 180, serving_size: 1, kcal: 94, total_fat: 0.3, total_carbs: 25, total_protein: 0.5 },
  { name: "Salmon Fillet", brand: "Generic", serving_weight: 180, serving_size: 1, kcal: 374, total_fat: 22, total_carbs: 0, total_protein: 40 },
  { name: "Sweet Potato", brand: "Generic", serving_weight: 200, serving_size: 1, kcal: 172, total_fat: 0.2, total_carbs: 40, total_protein: 3.2 },
  { name: "Cottage Cheese", brand: "Müller", serving_weight: 150, serving_size: 1, kcal: 117, total_fat: 3.8, total_carbs: 4.5, total_protein: 16 },
  { name: "Scrambled Eggs", brand: "Generic", serving_weight: 150, serving_size: 1, kcal: 220, total_fat: 15, total_carbs: 2, total_protein: 18 },
  { name: "Whole Wheat Toast", brand: "Hovis", serving_weight: 60, serving_size: 2, kcal: 148, total_fat: 1.8, total_carbs: 28, total_protein: 6 },
  { name: "Orange Juice", brand: "Tropicana", serving_weight: 250, serving_size: 1, kcal: 110, total_fat: 0.5, total_carbs: 26, total_protein: 1.7 },
  { name: "Tuna Wrap", brand: "Generic", serving_weight: 200, serving_size: 1, kcal: 310, total_fat: 7, total_carbs: 35, total_protein: 28 },
  { name: "Beef Mince", brand: "Generic", serving_weight: 200, serving_size: 1, kcal: 340, total_fat: 18, total_carbs: 0, total_protein: 42 },
  { name: "Pasta", brand: "Barilla", serving_weight: 180, serving_size: 1, kcal: 266, total_fat: 1.3, total_carbs: 54, total_protein: 9.4 },
  { name: "Overnight Oats", brand: "Generic", serving_weight: 250, serving_size: 1, kcal: 340, total_fat: 8, total_carbs: 52, total_protein: 14 },
  { name: "Blueberries", brand: "Generic", serving_weight: 80, serving_size: 1, kcal: 46, total_fat: 0.3, total_carbs: 11, total_protein: 0.6 },
  { name: "Quinoa", brand: "Generic", serving_weight: 185, serving_size: 1, kcal: 222, total_fat: 3.6, total_carbs: 39, total_protein: 8 },
  { name: "Avocado", brand: "Generic", serving_weight: 100, serving_size: 0.5, kcal: 160, total_fat: 15, total_carbs: 9, total_protein: 2 },
  { name: "Protein Bar", brand: "Grenade", serving_weight: 60, serving_size: 1, kcal: 216, total_fat: 7.5, total_carbs: 21, total_protein: 20 },
  { name: "Almond Butter", brand: "Meridian", serving_weight: 30, serving_size: 2, kcal: 190, total_fat: 17, total_carbs: 3, total_protein: 6.5 },
];

const meals = [
  { consumed_at: new Date("2026-06-12T07:00:00"), foods: ["Oatmeal", "Banana"] },
  { consumed_at: new Date("2026-06-12T10:00:00"), foods: ["Greek Yogurt", "Strawberries"] },
  { consumed_at: new Date("2026-06-12T13:00:00"), foods: ["Chicken Breast", "Brown Rice", "Broccoli"] },
  { consumed_at: new Date("2026-06-12T16:00:00"), foods: ["Protein Shake", "Apple"] },
  { consumed_at: new Date("2026-06-12T19:00:00"), foods: ["Salmon Fillet", "Sweet Potato"] },
  { consumed_at: new Date("2026-06-12T21:00:00"), foods: ["Cottage Cheese"] },
  { consumed_at: new Date("2026-06-13T08:00:00"), foods: ["Scrambled Eggs", "Whole Wheat Toast", "Orange Juice", "Banana"] },
  { consumed_at: new Date("2026-06-13T12:00:00"), foods: ["Tuna Wrap"] },
  { consumed_at: new Date("2026-06-13T14:00:00"), foods: ["Banana"] },
  { consumed_at: new Date("2026-06-13T18:00:00"), foods: ["Beef Mince", "Pasta"] },
  { consumed_at: new Date("2026-06-14T07:00:00"), foods: ["Overnight Oats", "Blueberries"] },
  { consumed_at: new Date("2026-06-14T14:00:00"), foods: ["Chicken Breast", "Quinoa", "Avocado"] },
  { consumed_at: new Date("2026-06-14T20:00:00"), foods: ["Protein Bar", "Almond Butter"] },
];

async function main() {
  // 0. Wipe existing data (FK order: LogEntry → ConsumptionLog → FoodItem)
  await prisma.logEntry.deleteMany();
  await prisma.consumptionLog.deleteMany();
  await prisma.foodItem.deleteMany();
  console.log("Cleared existing data");

  // 1. Create all unique food items and build a name -> def+id map
  const foodMap: Record<string, { id: number } & typeof foodDefs[0]> = {};
  for (const food of foodDefs) {
    const item = await prisma.foodItem.create({ data: food });
    foodMap[food.name] = { ...food, id: item.id };
    console.log(`Created food: ${food.name} (id: ${item.id})`);
  }

  // 2. Create ConsumptionLog + LogEntries for each meal
  for (const meal of meals) {
    const log = await prisma.consumptionLog.create({
      data: {
        consumed_at: meal.consumed_at,
        logEntries: {
          create: meal.foods.map((name) => {
            const f = foodMap[name];
            return {
              food_item_id: f.id,
              kcal: f.kcal,
              total_fat: f.total_fat,
              total_carbs: f.total_carbs,
              total_protein: f.total_protein,
              serving_weight: f.serving_weight,
              serving_size: f.serving_size,
            };
          }),
        },
      },
    });
    console.log(`Seeded log ${log.id} at ${meal.consumed_at.toISOString()} (${meal.foods.join(", ")})`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
