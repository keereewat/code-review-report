import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SeverityBadge } from "./SeverityBadge"
import type { ReviewReport } from "@/lib/types"
import { Bug, CheckCircle, FileCode } from "lucide-react"

const severityBorderColors = {
  Critical: "border-l-red-500",
  High: "border-l-orange-500",
  Medium: "border-l-yellow-500",
  Low: "border-l-green-500",
} as const

export function CodeReviewIssues({
  codeReview,
}: {
  codeReview: ReviewReport["codeReview"]
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-pink-100 flex items-center justify-center">
          <Bug className="h-4 w-4 text-pink-600" />
        </div>
        <h2 className="text-sm font-semibold">Code Review</h2>
      </div>

      {codeReview.strengths.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            Strengths
          </h3>
          <div className="space-y-2" role="list" aria-label="Code strengths">
            {codeReview.strengths.map((strength, i) => (
              <div
                key={i}
                className="flex gap-3 text-sm p-3 rounded-lg bg-emerald-50"
                role="listitem"
              >
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {codeReview.strengths.length > 0 && codeReview.issues.length > 0 && (
        <Separator className="mb-5" />
      )}

      {codeReview.issues.length > 0 ? (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Bug className="h-3.5 w-3.5 text-red-500" />
            Issues
            <span className="bg-muted px-2 py-0.5 rounded-full text-xs normal-case tracking-normal font-medium">
              {codeReview.issues.length}
            </span>
          </h3>
          <div className="space-y-3">
            {codeReview.issues.map((issue, i) => (
              <div
                key={i}
                className={`border-l-4 rounded-lg border bg-card p-4 space-y-2.5 ${severityBorderColors[issue.severity]}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <SeverityBadge severity={issue.severity} />
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileCode className="h-3 w-3" />
                    <span className="font-mono">{issue.file}</span>
                  </div>
                </div>
                <p className="text-sm font-medium">{issue.message}</p>
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3">
                  <span className="font-medium text-foreground">
                    Recommendation:{" "}
                  </span>
                  {issue.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        codeReview.strengths.length === 0 && (
          <p className="text-sm text-muted-foreground">No issues detected.</p>
        )
      )}
    </Card>
  )
}
