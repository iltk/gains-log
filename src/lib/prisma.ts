import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; 
const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, 
}); 
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, 
  }); 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 
export default prisma; 

/*
What's next for you:

Set your database URL in .env — replace the placeholder with your actual PostgreSQL connection string:


DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
Define your models in prisma/schema.prisma

Run a migration once your schema is ready:


npx prisma migrate dev --name init
npx prisma generate
Use the client in server code by importing from @/lib/prisma:


import { prisma } from "@/lib/prisma"; 




1. When you update your model (schema)
Edit prisma/schema.prisma, then run:

npx prisma migrate dev --name describe_your_change
This does three things: creates a SQL migration file, 
applies it to your DB, and regenerates the Prisma client. 
You need to do this every time you add/remove/change a model or field.

2. Where to write DB code
In Next.js, never call prisma from client components — it only works server-side. Your options:

Option A — Server Actions (simplest, colocated with your UI)
Create a file like src/app/actions.ts:

"use server";
import { prisma } from "@/lib/prisma";

export async function createLog(data: { weight: number }) {
  return prisma.log.create({ data });
}
Then call it directly from a client component form.

Option B — API Routes (for REST-style endpoints)
Create src/app/api/logs/route.ts:

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const logs = await prisma.log.findMany();
  return NextResponse.json(logs);
}

export async function POST(req: Request) {
  const body = await req.json();
  const log = await prisma.log.create({ data: body });
  return NextResponse.json(log);
}
Option C — Server Components (for reading data to display)
In any page.tsx, just call prisma directly at the top level since pages are server components by default:


import { prisma } from "@/lib/prisma";

export default async function Page() {
  const logs = await prisma.log.findMany();
  return <div>{logs.map(...)}</div>;
}

Rule of thumb: Read data in Server Components (Option C), 
write data via Server Actions (Option A). 
API routes are useful 
if you ever need a public endpoint or call 
from outside Next.js.
*/