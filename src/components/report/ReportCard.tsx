import Link from "next/link"
import { Card } from "@/components/ui/card"
import { RiskBadge } from "./RiskBadge"
import { ScoreCircle } from "./ScoreCircle"
import type { ReportIndexEntry } from "@/lib/types"
import {
  Calendar,
  GitBranch,
  User,
  MoreVertical,
  CreditCard,
  Plane,
  Shield,
  Hotel,
  Cloud,
  Bell,
  Users,
  Bot,
  Settings,
  Package,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const repoIcons: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  "travel-payment-api": { icon: CreditCard, bg: "bg-violet-100", color: "text-violet-600" },
  "flight-booking-api": { icon: Plane, bg: "bg-amber-100", color: "text-amber-600" },
  "identity-service": { icon: Shield, bg: "bg-red-100", color: "text-red-600" },
  "hotel-search-api": { icon: Hotel, bg: "bg-emerald-100", color: "text-emerald-600" },
  "document-service": { icon: Cloud, bg: "bg-sky-100", color: "text-sky-600" },
  "notification-service": { icon: Bell, bg: "bg-teal-100", color: "text-teal-600" },
  "customer-profile-api": { icon: Users, bg: "bg-indigo-100", color: "text-indigo-600" },
  "ai-review-engine": { icon: Bot, bg: "bg-pink-100", color: "text-pink-600" },
  "platform-devops": { icon: Settings, bg: "bg-purple-100", color: "text-purple-600" },
  "travel-package-api": { icon: Package, bg: "bg-orange-100", color: "text-orange-600" },
}

const defaultRepoIcon = { icon: Package, bg: "bg-gray-100", color: "text-gray-600" }

export function ReportCard({ report }: { report: ReportIndexEntry }) {
  const repoStyle = repoIcons[report.repository] ?? defaultRepoIcon
  const Icon = repoStyle.icon

  return (
    <Link href={`/report/${report.id}/`}>
      <Card className="p-4 transition-all hover:shadow-md hover:border-primary/20">
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${repoStyle.bg}`}
          >
            <Icon className={`h-5 w-5 ${repoStyle.color}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold leading-tight">
                  {report.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {report.repository}
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <RiskBadge level={report.riskLevel} />
                <button
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground"
                  onClick={(e) => e.preventDefault()}
                  aria-label="More options"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <GitBranch className="h-3 w-3" />
                  <span className="truncate max-w-[140px]">{report.branch}</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {report.reviewDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3 w-3" />
                    {report.reportedBy}
                  </span>
                </div>
              </div>

              <ScoreCircle score={report.score} />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
