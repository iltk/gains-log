import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const entries = [
  // Today: 2026-06-06
  {
    consumed_at: new Date("2026-06-06T07:00:00"),
    foodItems: [
      {
        name: "Oatmeal",
        brand: "Quaker",
        serving_weight: 80,
        serving_size: 1,
        kcal: 297,
        total_fat: 5.3,
        total_carbs: 53,
        total_protein: 10.5,
      },
      {
        name: "Banana",
        brand: "Generic",
        serving_weight: 120,
        serving_size: 1,
        kcal: 107,
        total_fat: 0.4,
        total_carbs: 27,
        total_protein: 1.3,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-06T10:00:00"),
    foodItems: [
      {
        name: "Greek Yogurt",
        brand: "Fage",
        serving_weight: 200,
        serving_size: 1,
        kcal: 130,
        total_fat: 0.7,
        total_carbs: 8,
        total_protein: 23,
      },
      {
        name: "Strawberries",
        brand: "Generic",
        serving_weight: 150,
        serving_size: 1,
        kcal: 48,
        total_fat: 0.5,
        total_carbs: 11,
        total_protein: 1,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-06T13:00:00"),
    foodItems: [
      {
        name: "Chicken Breast",
        brand: "Generic",
        serving_weight: 150,
        serving_size: 1,
        kcal: 248,
        total_fat: 5.4,
        total_carbs: 0,
        total_protein: 46.5,
      },
      {
        name: "Brown Rice",
        brand: "Generic",
        serving_weight: 200,
        serving_size: 1,
        kcal: 218,
        total_fat: 1.6,
        total_carbs: 45,
        total_protein: 4.5,
      },
      {
        name: "Broccoli",
        brand: "Generic",
        serving_weight: 100,
        serving_size: 1,
        kcal: 34,
        total_fat: 0.4,
        total_carbs: 7,
        total_protein: 2.8,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-06T16:00:00"),
    foodItems: [
      {
        name: "Protein Shake",
        brand: "MyProtein",
        serving_weight: 300,
        serving_size: 1,
        kcal: 180,
        total_fat: 2.5,
        total_carbs: 6,
        total_protein: 35,
      },
      {
        name: "Apple",
        brand: "Generic",
        serving_weight: 180,
        serving_size: 1,
        kcal: 94,
        total_fat: 0.3,
        total_carbs: 25,
        total_protein: 0.5,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-06T19:00:00"),
    foodItems: [
      {
        name: "Salmon Fillet",
        brand: "Generic",
        serving_weight: 180,
        serving_size: 1,
        kcal: 374,
        total_fat: 22,
        total_carbs: 0,
        total_protein: 40,
      },
      {
        name: "Sweet Potato",
        brand: "Generic",
        serving_weight: 200,
        serving_size: 1,
        kcal: 172,
        total_fat: 0.2,
        total_carbs: 40,
        total_protein: 3.2,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-06T21:00:00"),
    foodItems: [
      {
        name: "Cottage Cheese",
        brand: "Müller",
        serving_weight: 150,
        serving_size: 1,
        kcal: 117,
        total_fat: 3.8,
        total_carbs: 4.5,
        total_protein: 16,
      },
    ],
  },
  // Tomorrow: 2026-06-07
  {
    consumed_at: new Date("2026-06-07T08:00:00"),
    foodItems: [
      {
        name: "Scrambled Eggs",
        brand: "Generic",
        serving_weight: 150,
        serving_size: 1,
        kcal: 220,
        total_fat: 15,
        total_carbs: 2,
        total_protein: 18,
      },
      {
        name: "Whole Wheat Toast",
        brand: "Hovis",
        serving_weight: 60,
        serving_size: 2,
        kcal: 148,
        total_fat: 1.8,
        total_carbs: 28,
        total_protein: 6,
      },
      {
        name: "Orange Juice",
        brand: "Tropicana",
        serving_weight: 250,
        serving_size: 1,
        kcal: 110,
        total_fat: 0.5,
        total_carbs: 26,
        total_protein: 1.7,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-07T12:00:00"),
    foodItems: [
      {
        name: "Tuna Wrap",
        brand: "Generic",
        serving_weight: 200,
        serving_size: 1,
        kcal: 310,
        total_fat: 7,
        total_carbs: 35,
        total_protein: 28,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-07T18:00:00"),
    foodItems: [
      {
        name: "Beef Mince",
        brand: "Generic",
        serving_weight: 200,
        serving_size: 1,
        kcal: 340,
        total_fat: 18,
        total_carbs: 0,
        total_protein: 42,
      },
      {
        name: "Pasta",
        brand: "Barilla",
        serving_weight: 180,
        serving_size: 1,
        kcal: 266,
        total_fat: 1.3,
        total_carbs: 54,
        total_protein: 9.4,
      },
    ],
  },
  // 2026-06-10
  {
    consumed_at: new Date("2026-06-10T07:00:00"),
    foodItems: [
      {
        name: "Overnight Oats",
        brand: "Generic",
        serving_weight: 250,
        serving_size: 1,
        kcal: 340,
        total_fat: 8,
        total_carbs: 52,
        total_protein: 14,
      },
      {
        name: "Blueberries",
        brand: "Generic",
        serving_weight: 80,
        serving_size: 1,
        kcal: 46,
        total_fat: 0.3,
        total_carbs: 11,
        total_protein: 0.6,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-10T14:00:00"),
    foodItems: [
      {
        name: "Chicken Breast",
        brand: "Generic",
        serving_weight: 150,
        serving_size: 1,
        kcal: 248,
        total_fat: 5.4,
        total_carbs: 0,
        total_protein: 46.5,
      },
      {
        name: "Quinoa",
        brand: "Generic",
        serving_weight: 185,
        serving_size: 1,
        kcal: 222,
        total_fat: 3.6,
        total_carbs: 39,
        total_protein: 8,
      },
      {
        name: "Avocado",
        brand: "Generic",
        serving_weight: 100,
        serving_size: 0.5,
        kcal: 160,
        total_fat: 15,
        total_carbs: 9,
        total_protein: 2,
      },
    ],
  },
  {
    consumed_at: new Date("2026-06-10T20:00:00"),
    foodItems: [
      {
        name: "Protein Bar",
        brand: "Grenade",
        serving_weight: 60,
        serving_size: 1,
        kcal: 216,
        total_fat: 7.5,
        total_carbs: 21,
        total_protein: 20,
      },
      {
        name: "Almond Butter",
        brand: "Meridian",
        serving_weight: 30,
        serving_size: 2,
        kcal: 190,
        total_fat: 17,
        total_carbs: 3,
        total_protein: 6.5,
      },
    ],
  },
];

async function main() {
  for (const entry of entries) {
    const log = await prisma.consumptionLog.create({
      data: {
        consumed_at: entry.consumed_at,
        foodItems: { create: entry.foodItems },
      },
    });
    console.log(`Seeded log ${log.id} at ${entry.consumed_at.toISOString()}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
