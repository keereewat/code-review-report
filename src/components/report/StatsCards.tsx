"use client"

import { Card } from "@/components/ui/card"
import type { ReportIndexEntry } from "@/lib/types"
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react"

export function StatsCards({ reports }: { reports: ReportIndexEntry[] }) {
  const totalReports = reports.length
  const averageScore = Math.round(
    reports.reduce((sum, r) => sum + r.score, 0) / reports.length
  )
  const criticalIssues = reports.filter(
    (r) => r.riskLevel === "Critical"
  ).length
  const reviewedPct = Math.round(
    (reports.filter((r) => r.score >= 60).length / reports.length) * 100
  )

  const stats = [
    {
      label: "Total Reports",
      value: totalReports,
      icon: FileText,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      trend: "↑ 15% from last 30 days",
      trendUp: true,
    },
    {
      label: "Average Score",
      value: averageScore,
      icon: CheckCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "↑ 6% from last 30 days",
      trendUp: true,
    },
    {
      label: "Critical Issues",
      value: criticalIssues,
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      trend: `↓ ${criticalIssues} from last 30 days`,
      trendUp: false,
    },
    {
      label: "Reviewed PRs",
      value: `${reviewedPct}%`,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "↑ 8% from last 30 days",
      trendUp: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 flex items-center gap-4">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
          >
            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground truncate">
              {stat.label}
            </p>
            <p className="text-2xl font-bold leading-tight">{stat.value}</p>
            <p
              className={`text-xs mt-0.5 ${
                stat.trendUp ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {stat.trend}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
