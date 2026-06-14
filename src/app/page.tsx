import { getAllReports } from "@/lib/report-loader"
import { ReportListClient } from "@/components/report/ReportListClient"
import { Sparkles, Download } from "lucide-react"

export default function HomePage() {
  const reports = getAllReports()

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Code Review Reports
            <Sparkles className="h-7 w-7 text-violet-500" />
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated code review reports for pull request analysis.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted transition-colors">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>
      <ReportListClient reports={reports} />
    </main>
  )
}
