import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllReportIds, getReportById } from "@/lib/report-loader"
import { SummaryCard } from "@/components/report/SummaryCard"
import { FilesChangedTable } from "@/components/report/FilesChangedTable"
import { RiskAssessmentCard } from "@/components/report/RiskAssessmentCard"
import { CodeReviewIssues } from "@/components/report/CodeReviewIssues"
import { RecommendationsCard } from "@/components/report/RecommendationsCard"
import { ArrowLeft, Printer } from "lucide-react"

export function generateStaticParams() {
  return getAllReportIds().map((id) => ({ id }))
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = getReportById(id)

  if (!report) {
    notFound()
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reports
        </Link>
        <button className="flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted transition-colors">
          <Printer className="h-4 w-4" />
          Print Report
        </button>
      </div>

      <div className="space-y-6">
        <SummaryCard report={report} />
        <div className="grid gap-6 lg:grid-cols-2">
          <FilesChangedTable files={report.filesChanged} />
          <RiskAssessmentCard riskAssessment={report.riskAssessment} />
        </div>
        <CodeReviewIssues codeReview={report.codeReview} />
        <RecommendationsCard recommendations={report.recommendations} />
      </div>
    </main>
  )
}
