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
      {/* M平台 Logo - 简洁猫头鹰，轮廓即M字母 */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "w-auto")}
      >
        {/* 猫头鹰身体 - M形轮廓 */}
        <path
          d="M4 26V10L11 17L16 6L21 17L28 10V26H4Z"
          className="fill-primary"
        />
        
        {/* 左眼 */}
        <circle cx="11" cy="20" r="2.5" className="fill-background" />
        <circle cx="11.5" cy="19.5" r="1" className="fill-foreground" />
        
        {/* 右眼 */}
        <circle cx="21" cy="20" r="2.5" className="fill-background" />
        <circle cx="21.5" cy="19.5" r="1" className="fill-foreground" />
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
