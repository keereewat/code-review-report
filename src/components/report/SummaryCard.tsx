import { Card } from "@/components/ui/card"
import { RiskBadge } from "./RiskBadge"
import { ScoreCircle } from "./ScoreCircle"
import type { ReviewReport } from "@/lib/types"
import {
  Calendar,
  GitBranch,
  GitCommit,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Hash,
} from "lucide-react"

export function SummaryCard({ report }: { report: ReviewReport }) {
  const { summary, riskAssessment, codeReview, filesChanged } = report
  const issueCount = codeReview.issues.length
  const criticalCount = codeReview.issues.filter(
    (i) => i.severity === "Critical"
  ).length

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold">{report.title}</h1>
              <RiskBadge level={riskAssessment.level} />
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              {report.repository}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5" />
                {report.branch}
              </span>
              <span className="flex items-center gap-1.5">
                <GitCommit className="h-3.5 w-3.5" />
                {report.commitId}
              </span>
              <span className="flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5" />
                {report.pullRequestId}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {report.reviewDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {report.reportedBy}
              </span>
            </div>
          </div>
          <ScoreCircle
            score={summary.score}
            size={80}
            strokeWidth={7}
            fontSize="text-xl"
          />
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Files Changed</p>
            <p className="text-xl font-bold">{filesChanged.length}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Issues Found</p>
            <p className="text-xl font-bold">{issueCount}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Critical</p>
            <p className="text-xl font-bold">{criticalCount}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Strengths</p>
            <p className="text-xl font-bold">{codeReview.strengths.length}</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          Overview
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          {summary.overview}
        </p>
      </Card>
    </div>
  )
}
