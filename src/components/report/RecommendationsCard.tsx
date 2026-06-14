import { Card } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

export function RecommendationsCard({
  recommendations,
}: {
  recommendations: string[]
}) {
  if (recommendations.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
            <Lightbulb className="h-4 w-4 text-amber-600" />
          </div>
          <h2 className="text-sm font-semibold">Recommendations</h2>
        </div>
        <p className="text-sm text-muted-foreground">No recommendations.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 text-amber-600" />
        </div>
        <h2 className="text-sm font-semibold">Recommendations</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {recommendations.length}
        </span>
      </div>
      <div className="space-y-2.5" role="list" aria-label="Recommendations">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex gap-3 text-sm p-3 rounded-lg bg-muted/50"
            role="listitem"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="pt-0.5">{rec}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
