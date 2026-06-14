export type RiskLevel = "Low" | "Medium" | "High" | "Critical"
export type Severity = "Low" | "Medium" | "High" | "Critical"

export interface ReportIndexEntry {
  id: string
  title: string
  repository: string
  branch: string
  reviewDate: string
  riskLevel: RiskLevel
  score: number
  reportedBy: string
}

export interface ReviewReport {
  id: string
  title: string
  repository: string
  branch: string
  commitId: string
  pullRequestId: string
  reviewDate: string
  reportedBy: string

  summary: {
    overview: string
    score: number
  }

  filesChanged: Array<{
    file: string
    additions: number
    deletions: number
  }>

  riskAssessment: {
    level: RiskLevel
    summary: string
    items: string[]
  }

  codeReview: {
    strengths: string[]
    issues: Array<{
      severity: Severity
      file: string
      message: string
      recommendation: string
    }>
  }

  recommendations: string[]
}
