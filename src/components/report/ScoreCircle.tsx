"use client"

function getScoreColor(score: number): string {
  if (score >= 90) return "#10b981"
  if (score >= 75) return "#f59e0b"
  if (score >= 60) return "#f97316"
  return "#ef4444"
}

export function ScoreCircle({
  score,
  size = 56,
  strokeWidth = 5,
  fontSize = "text-sm",
}: {
  score: number
  size?: number
  strokeWidth?: number
  fontSize?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center ${fontSize} font-bold`}
        style={{ color }}
      >
        {score}
      </span>
    </div>
  )
}
