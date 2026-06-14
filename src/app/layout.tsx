import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Code Review Reports",
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
