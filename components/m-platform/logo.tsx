"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  }

  const textSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* M平台 Logo - 简洁的医疗数据图标 */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "w-auto")}
      >
        {/* 外圈 - 代表数据生态 */}
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
        {/* M 字母 - 核心标识 */}
        <path
          d="M9 22V10L16 17L23 10V22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        {/* 数据节点 */}
        <circle cx="16" cy="8" r="2" fill="currentColor" className="text-success" />
      </svg>
      {showText && (
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            textSizeClasses[size]
          )}
        >
          M平台
        </span>
      )}
    </div>
  )
}
