"use server";
import prisma from "@/lib/prisma";

export async function getDailyLogs(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const logs = await prisma.consumptionLog.findMany({
    where: {
      consumed_at: { gte: startOfDay, lte: endOfDay },
    },
    include: {
      foodItems: true, 
    },
  });

  return logs;
}

