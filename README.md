# Code Review Report Portal

A static website for displaying AI-generated code review reports. Built with Next.js, TypeScript, TailwindCSS, and shadcn/ui.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

Static files are exported to the `out/` directory. Serve with any static file server:

```bash
npx serve out
```

## Project Structure

```
src/
  app/
    page.tsx                 # Report list page
    not-found.tsx            # 404 page
    report/[id]/page.tsx     # Report detail page
  components/
    report/                  # Report-specific components
    ui/                      # shadcn/ui components
  lib/
    types.ts                 # TypeScript types
    report-loader.ts         # Data loading utilities
public/
  reports/
    index.json               # Report index
    pr-001.json ... pr-010.json  # Individual reports
```

## Adding Reports

1. Create a new JSON file in `public/reports/` following the `ReviewReport` schema in `src/lib/types.ts`
2. Add an entry to `public/reports/index.json`
3. Rebuild the project

## Tech Stack

- Next.js 16 (App Router, Static Export)
- TypeScript
- TailwindCSS 4
- shadcn/ui
- Lucide Icons
