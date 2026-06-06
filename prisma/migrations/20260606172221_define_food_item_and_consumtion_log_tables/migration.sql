-- CreateTable
CREATE TABLE "FoodItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "serving_weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "serving_size" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "kcal" DOUBLE PRECISION NOT NULL,
    "total_fat" DOUBLE PRECISION NOT NULL,
    "total_carbs" DOUBLE PRECISION NOT NULL,
    "total_protein" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsumptionLog" (
    "id" SERIAL NOT NULL,
    "food_item_id" INTEGER NOT NULL,
    "consumed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsumptionLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConsumptionLog" ADD CONSTRAINT "ConsumptionLog_food_item_id_fkey" FOREIGN KEY ("food_item_id") REFERENCES "FoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
