/*
  Warnings:

  - You are about to drop the column `consumption_log_id` on the `FoodItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodItem" DROP CONSTRAINT "FoodItem_consumption_log_id_fkey";

-- AlterTable
ALTER TABLE "FoodItem" DROP COLUMN "consumption_log_id";

-- CreateTable
CREATE TABLE "LogEntry" (
    "id" SERIAL NOT NULL,
    "food_item_id" INTEGER NOT NULL,
    "consumption_log_id" INTEGER NOT NULL,

    CONSTRAINT "LogEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_food_item_id_fkey" FOREIGN KEY ("food_item_id") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEntry" ADD CONSTRAINT "LogEntry_consumption_log_id_fkey" FOREIGN KEY ("consumption_log_id") REFERENCES "ConsumptionLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
