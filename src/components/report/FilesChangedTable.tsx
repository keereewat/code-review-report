import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileCode } from "lucide-react"

interface FileChange {
  file: string
  additions: number
  deletions: number
}

export function FilesChangedTable({ files }: { files: FileChange[] }) {
  if (files.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <FileCode className="h-4 w-4 text-violet-600" />
          </div>
          <h2 className="text-sm font-semibold">Files Changed</h2>
        </div>
        <p className="text-sm text-muted-foreground">No files changed.</p>
      </Card>
    )
  }

  const totalAdditions = files.reduce((s, f) => s + f.additions, 0)
  const totalDeletions = files.reduce((s, f) => s + f.deletions, 0)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <FileCode className="h-4 w-4 text-violet-600" />
          </div>
          <h2 className="text-sm font-semibold">Files Changed</h2>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {files.length}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-green-600 font-mono font-medium">
            +{totalAdditions}
          </span>
          <span className="text-red-600 font-mono font-medium">
            -{totalDeletions}
          </span>
        </div>
      </div>
      <ScrollArea className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[300px]">File</TableHead>
              <TableHead className="text-right w-[100px]">Additions</TableHead>
              <TableHead className="text-right w-[100px]">Deletions</TableHead>
              <TableHead className="text-right w-[120px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => {
              const total = file.additions + file.deletions
              const addPct = total > 0 ? (file.additions / total) * 100 : 0
              return (
                <TableRow key={file.file}>
                  <TableCell className="font-mono text-sm">
                    {file.file}
                  </TableCell>
                  <TableCell className="text-right text-green-600 font-mono text-sm">
                    +{file.additions}
                  </TableCell>
                  <TableCell className="text-right text-red-600 font-mono text-sm">
                    -{file.deletions}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden flex">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${addPct}%` }}
                        />
                        <div
                          className="h-full bg-red-500"
                          style={{ width: `${100 - addPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-medium w-8 text-right">
                        {total}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  )
}
