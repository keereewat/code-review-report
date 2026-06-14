import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
      <FileQuestion className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold mb-2">Report not found</h1>
      <p className="text-muted-foreground mb-6">
        The report you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Back to Reports
      </Link>
    </main>
  )
}
