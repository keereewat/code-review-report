import type { Metadata } from "next"
import "./globals.css"

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME

export const metadata: Metadata = {
  title: projectName ? `Code Review Reports - ${projectName}` : "Code Review Reports",
  description: "AI-generated code review reports for pull request analysis",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
