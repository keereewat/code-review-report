"use client"

import { useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchBar } from "./SearchBar"
import { ReportCard } from "./ReportCard"
import { StatsCards } from "./StatsCards"
import type { ReportIndexEntry, RiskLevel } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"

const RISK_LEVELS: Array<RiskLevel | "All"> = [
  "All",
  "Low",
  "Medium",
  "High",
  "Critical",
]

const PAGE_SIZES = [10, 20, 50]

export function ReportListClient({
  reports,
}: {
  reports: ReportIndexEntry[]
}) {
  const [search, setSearch] = useState("")
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "All">("All")
  const [repoFilter, setRepoFilter] = useState("All")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const repositories = useMemo(() => {
    const repos = Array.from(new Set(reports.map((r) => r.repository))).sort()
    return ["All", ...repos]
  }, [reports])

  const filtered = useMemo(() => {
    const query = search.toLowerCase()
    return reports
      .filter((r) => {
        if (
          query &&
          !r.title.toLowerCase().includes(query) &&
          !r.repository.toLowerCase().includes(query) &&
          !r.reportedBy.toLowerCase().includes(query)
        ) {
          return false
        }
        if (riskFilter !== "All" && r.riskLevel !== riskFilter) {
          return false
        }
        if (repoFilter !== "All" && r.repository !== repoFilter) {
          return false
        }
        if (dateFrom && r.reviewDate < dateFrom) {
          return false
        }
        if (dateTo && r.reviewDate > dateTo) {
          return false
        }
        return true
      })
      .sort((a, b) => b.reviewDate.localeCompare(a.reviewDate))
  }, [reports, search, riskFilter, repoFilter, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)
  const startIdx = (safePage - 1) * pageSize + 1
  const endIdx = Math.min(safePage * pageSize, filtered.length)

  return (
    <div className="space-y-6">
      <StatsCards reports={reports} />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1 max-w-md">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex gap-3 flex-wrap items-end">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Risk Level
            </label>
            <Select
              value={riskFilter}
              onValueChange={(v) => {
                setRiskFilter(v as RiskLevel | "All")
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RISK_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Repository
            </label>
            <Select
              value={repoFilter}
              onValueChange={(v) => {
                setRepoFilter(v ?? "All")
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {repositories.map((repo) => (
                  <SelectItem key={repo} value={repo}>
                    {repo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value)
                setPage(1)
              }}
              className="flex h-9 w-[150px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Filter from date"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value)
                setPage(1)
              }}
              className="flex h-9 w-[150px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Filter to date"
            />
          </div>
        </div>
      </div>

      {paged.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No reports found.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-sm text-muted-foreground">
              Showing {startIdx} to {endIdx} of {filtered.length} reports
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  className="p-1.5 rounded-md border border-input hover:bg-muted disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`min-w-[32px] h-8 rounded-md text-sm font-medium ${
                        p === safePage
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  className="p-1.5 rounded-md border border-input hover:bg-muted disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <Select
                value={String(pageSize)}
                onValueChange={(v) => {
                  setPageSize(Number(v))
                  setPage(1)
                }}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZES.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s} per page
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
