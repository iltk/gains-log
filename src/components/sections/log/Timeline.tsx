"use client";
import { LogEntry } from "./LogSection";
import { format } from "date-fns";
import { FaPlus, FaPen } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { deleteFood } from "@/actions/logActions";
import { MdDelete } from "react-icons/md";

interface Props {
  logEntries: LogEntry[];
  loading: boolean;
  selectedDay: Date;
  onDelete: () => void;
}

export default function Timeline({
  logEntries,
  loading,
  selectedDay,
  onDelete,
}: Props) {
  const hours = Array.from({ length: 17 }, (_, i) => i + 7);

  // group by hour → consumption_log_id → LogEntry[]
  const byHour = new Map<number, Map<number, LogEntry[]>>();
  for (const entry of logEntries) {
    const h = new Date(entry.consumptionLog.consumed_at).getHours();
    if (!byHour.has(h)) byHour.set(h, new Map());
    const byLog = byHour.get(h)!;
    if (!byLog.has(entry.consumption_log_id))
      byLog.set(entry.consumption_log_id, []);
    byLog.get(entry.consumption_log_id)!.push(entry);
  }
  const handleDelete = async (
    name: string,
    brand: string,
    serving_weight: number,
    serving_size: number,
    kcal: number,
    total_fat: number,
    total_carbs: number,
    total_protein: number,
    consumption_log_id: number,
    icon: string | undefined,
    date: Date,
  ) => {
    await deleteFood(
      {
        name: name,
        brand: brand,
        serving_weight: serving_weight || 0,
        serving_size: serving_size || 1,
        kcal: kcal || 0,
        total_fat: total_fat || 0,
        total_carbs: total_carbs || 0,
        total_protein: total_protein || 0,
        consumption_log_id: consumption_log_id,
        icon: icon,
      },
      date,
    );
    onDelete();
  };
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 pb-24">
      {hours.map((hour) => {
        const byLog = byHour.get(hour) ?? new Map<number, LogEntry[]>();
        const allEntries = [...byLog.values()].flat();
        const kcal = allEntries.reduce((s, e) => s + e.foodItem.kcal, 0);
        const protein = allEntries.reduce(
          (s, e) => s + e.foodItem.total_protein,
          0,
        );
        const fat = allEntries.reduce((s, e) => s + e.foodItem.total_fat, 0);
        const carbs = allEntries.reduce(
          (s, e) => s + e.foodItem.total_carbs,
          0,
        );

        return (
          <div key={hour}>
            {/* Hour row */}
            <div className="flex items-center gap-3 py-3">
              <span className="text-white text-sm font-medium px-3 py-1 bg-[#3a3a3a] rounded-full">
                {format(new Date().setHours(hour, 0, 0, 0), "h a")}
              </span>

              <Link
                href={`/create-food/${new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate(), hour).getTime()}`}
                className="w-7 h-7 rounded-full bg-[#3a3a3a] flex items-center justify-center text-white"
              >
                <FaPlus size={10} />
              </Link>

              {allEntries.length > 0 && (
                <div className=" flex items-center gap-7 text-sm text-white/60 ml-8">
                  <span className="flex items-center gap-0.5">
                    {Math.round(kcal)} <FaFire />
                  </span>
                  <span>
                    {Math.round(protein)} <span>P</span>
                  </span>
                  <span>
                    {Math.round(fat)} <span>F</span>
                  </span>
                  <span>
                    {Math.round(carbs)} <span>C</span>
                  </span>
                </div>
              )}
            </div>

            {/* Entries */}
            {byLog.size > 0 && (
              <div className="relative">
                {/*line btw hours */}
                <div className="absolute left-14 top-0 bottom-0 w-px bg-[#3a3a3a]" />

                {[...byLog.entries()].map(([logId, entries]) => (
                  <div key={logId} className="flex items-start gap-3 mb-2">
                    <span className="w-11 text-right text-xs text-white/40 pt-4 shrink-0">
                      {format(
                        new Date(entries[0].consumptionLog.consumed_at),
                        "H:mm",
                      )}
                    </span>

                    <div className="w-2" />

                    <div className="flex-1 space-y-2">
                      {entries.map((entry) => (
                        <div
                          key={entry.id}
                          className="bg-[#2a2a2a] rounded-2xl px-4 py-3 flex items-center gap-3"
                        >
                          <span className="text-2xl shrink-0">🍽️</span>

                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium leading-tight line-clamp-2">
                              {entry.foodItem.name}
                            </p>
                            <p className="text-white/50 text-xs mt-1">
                              {Math.round(entry.foodItem.kcal)}
                              <FaFire className="inline mx-0.5 mb-0.5" />{" "}
                              {Math.round(entry.foodItem.total_protein)}P{" "}
                              {Math.round(entry.foodItem.total_fat)}F{" "}
                              {Math.round(entry.foodItem.total_carbs)}C •{" "}
                              {Math.round(entry.foodItem.serving_weight)} g
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleDelete(
                                entry.foodItem.name,
                                entry.foodItem.brand,
                                entry.foodItem.serving_weight,
                                entry.foodItem.serving_size,
                                entry.foodItem.kcal,
                                entry.foodItem.total_fat,
                                entry.foodItem.total_carbs,
                                entry.foodItem.total_protein,
                                entry.consumption_log_id,
                                undefined,
                                new Date(entry.consumptionLog.consumed_at),
                              )
                            }
                            className="w-7 h-7 rounded-full bg-[#3a3a3a] flex items-center justify-center text-white/60 shrink-0"
                          >
                            <MdDelete size={15} />

                          </button>

                          <Link
                            href={`/modify-food/${entry.foodItem.id}?${new URLSearchParams({
                              name: entry.foodItem.name,
                              brand: entry.foodItem.brand,
                              serving_weight: String(entry.foodItem.serving_weight),
                              serving_size: String(entry.foodItem.serving_size),
                              kcal: String(entry.foodItem.kcal),
                              total_fat: String(entry.foodItem.total_fat),
                              total_carbs: String(entry.foodItem.total_carbs),
                              total_protein: String(entry.foodItem.total_protein),
                              consumption_log_id: String(entry.consumption_log_id),
                              consumed_at: new Date(entry.consumptionLog.consumed_at).toISOString(),
                            })}`}
                            className="w-7 h-7 rounded-full bg-[#3a3a3a] flex items-center justify-center text-white/60 shrink-0"
                          >
                            <FaPen size={10} />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
