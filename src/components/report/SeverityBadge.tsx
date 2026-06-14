import { Badge } from "@/components/ui/badge"
import type { Severity } from "@/lib/types"

const severityColors: Record<Severity, string> = {
  Low: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  High: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
  Critical: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <Badge variant="outline" className={severityColors[severity]}>
      {severity}
    </Badge>
  )
}
