import Link from "next/link";
import LogSection from "@/components/sections/log/LogSection";
import Timeline from "@/components/sections/log/Timeline";

export default function Home() {
  return (
    <div className="font-sans flex flex-col h-full justify-center items-center text-2xl">
      <Link href="/log">Go To Log Food Section</Link>
      <Link href="/">Go To Log Workout</Link>

    </div>
  );
}
