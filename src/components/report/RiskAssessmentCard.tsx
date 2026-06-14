import { Card } from "@/components/ui/card"
import { RiskBadge } from "./RiskBadge"
import type { ReviewReport } from "@/lib/types"
import { ShieldAlert, AlertCircle } from "lucide-react"

export function RiskAssessmentCard({
  riskAssessment,
}: {
  riskAssessment: ReviewReport["riskAssessment"]
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
            <ShieldAlert className="h-4 w-4 text-orange-600" />
          </div>
          <h2 className="text-sm font-semibold">Risk Assessment</h2>
        </div>
        <RiskBadge level={riskAssessment.level} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {riskAssessment.summary}
      </p>

      {riskAssessment.items.length > 0 && (
        <div className="space-y-2.5" role="list" aria-label="Risk factors">
          {riskAssessment.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 text-sm p-3 rounded-lg bg-muted/50"
              role="listitem"
            >
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
