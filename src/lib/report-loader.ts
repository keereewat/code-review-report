import fs from "fs"
import path from "path"
import type { ReportIndexEntry, ReviewReport } from "./types"

const reportsDir = path.join(process.cwd(), "public", "reports")

export function getAllReports(): ReportIndexEntry[] {
  const raw = fs.readFileSync(path.join(reportsDir, "index.json"), "utf-8")
  return JSON.parse(raw) as ReportIndexEntry[]
}

export function getReportById(id: string): ReviewReport | null {
  const filePath = path.join(reportsDir, `${id}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as ReviewReport
}

export function getAllReportIds(): string[] {
  return getAllReports().map((r) => r.id)
}

export function getRiskColor(level: string): string {
  switch (level) {
    case "Low":
      return "bg-green-100 text-green-800 border-green-200"
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Critical":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getSeverityColor(level: string): string {
  return getRiskColor(level)
}
