/*
  Warnings:

  - You are about to drop the column `food_item_id` on the `ConsumptionLog` table. All the data in the column will be lost.
  - Added the required column `consumption_log_id` to the `FoodItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ConsumptionLog" DROP CONSTRAINT "ConsumptionLog_food_item_id_fkey";

-- AlterTable
ALTER TABLE "ConsumptionLog" DROP COLUMN "food_item_id";

-- AlterTable
ALTER TABLE "FoodItem" ADD COLUMN     "consumption_log_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FoodItem" ADD CONSTRAINT "FoodItem_consumption_log_id_fkey" FOREIGN KEY ("consumption_log_id") REFERENCES "ConsumptionLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
