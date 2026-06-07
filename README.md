# 🥗💪 Personal Health Tracker

> A self-hosted meal & workout logging app — built to replace paid subscriptions like MacroFactor, MyFitnessPal...

**Live:** [your-url-here.com](https://your-url-here.com)
**Access:** Free to use — just create an account.
**Purpose:** Strictly personal use. Not for commercial distribution.

---

## Why This Exists

Subscription fatigue is real. Rather than paying monthly for MacroFactor, a separate workout tracker, and other fitness apps, this project combines the core features I actually use into one self-hosted tool — built once, owned forever.

---

## Features

### 🥗 Meal Logger

A nutrition tracking tool inspired by MacroFactor and similar apps.

- **Log meals** with calories, protein, carbs, and fats
- **Food search** with nutritional data lookup
- **Custom foods & meals** — save and reuse your go-to meals
- **Daily macro targets** — set goals and track against them
- **Calorie cycling support** — assign different targets per day of the week
- **Analytics dashboard**
  - Weekly/monthly calorie and macro trends
  - Protein intake consistency
  - Running averages and goal adherence
  - Body weight tracking with trend line (like MacroFactor's adaptive algorithm approach)
- **TDEE estimation** — based on logged intake and weight change over time

---

### 🏋️ Workout Logger

A clean, no-nonsense training log for strength and BJJ sessions.

- **Log workouts** by type: lifting, BJJ, cardio, recovery
- **Exercise library** — searchable, with custom exercise support
- **Sets × reps × weight** tracking with previous session reference
- **Session notes** — rate effort, log how you felt, add context
- **Analytics dashboard**
  - Volume over time per muscle group / movement pattern
  - Strength progression graphs per exercise
  - Weekly training load and frequency
  - Session duration trends

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes / Server Actions |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js |
| Hosting | Self-hosted (Hetzner VPS + Cloudflare) |

---

## Getting Started

### 1. Create an Account

Head to [your-url-here.com](https://your-url-here.com) and register. No email verification required — just pick a username and password.

### 2. Set Up Your Profile

- Set your **calorie and macro targets**
- Choose your **goal** (fat loss / maintenance / muscle gain)
- Optionally configure **calorie cycling** targets per day

### 3. Start Logging

- Use the **Meal Logger** to track what you eat each day
- Use the **Workout Logger** to record training sessions

---

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login / register
│   ├── meals/              # Meal logger views
│   ├── workouts/           # Workout logger views
│   └── analytics/          # Charts and dashboards
├── components/             # Reusable UI components
├── lib/                    # Utilities, helpers
├── prisma/                 # Database schema and migrations
└── services/               # Business logic layer
```

---

## Disclaimer

This project is built **strictly for personal use**. It is not intended for commercial distribution, resale, or public SaaS deployment. No guarantees are made about uptime, data integrity, or feature completeness — it does exactly what I need it to do.

---

## Roadmap

- [ ] Barcode scanning for food logging
- [ ] WHOOP recovery score integration
- [ ] Weekly summary email digest
- [ ] Progressive overload auto-suggestions
- [ ] Export data to CSV / JSON

---

*Built to stop paying for apps I can just build myself.*
