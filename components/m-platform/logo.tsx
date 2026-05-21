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
      {/* M平台 Logo - 七巧板风格猫头鹰 */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizeClasses[size], "w-auto")}
      >
        {/* 猫头鹰 - 七巧板几何拼图 */}
        
        {/* 头部 - 大三角形 */}
        <polygon
          points="18,2 6,14 30,14"
          className="fill-primary"
        />
        
        {/* 左耳 - 小三角形 */}
        <polygon
          points="8,6 6,14 12,12"
          className="fill-chart-2"
        />
        
        {/* 右耳 - 小三角形 */}
        <polygon
          points="28,6 24,12 30,14"
          className="fill-chart-2"
        />
        
        {/* 身体左侧 - 中三角形 */}
        <polygon
          points="6,14 6,28 18,28"
          className="fill-primary"
        />
        
        {/* 身体右侧 - 中三角形 */}
        <polygon
          points="30,14 18,28 30,28"
          className="fill-primary"
        />
        
        {/* 胸部 - 正方形（旋转45度的菱形） */}
        <polygon
          points="18,14 12,20 18,26 24,20"
          className="fill-chart-3"
        />
        
        {/* 左脚 - 平行四边形 */}
        <polygon
          points="8,28 6,34 12,34 14,28"
          className="fill-chart-2"
        />
        
        {/* 右脚 - 平行四边形 */}
        <polygon
          points="22,28 24,34 30,34 28,28"
          className="fill-chart-2"
        />
        
        {/* 左眼 - 圆形 */}
        <circle cx="13" cy="11" r="2.5" className="fill-background" />
        <circle cx="13.5" cy="10.5" r="1" className="fill-foreground" />
        
        {/* 右眼 - 圆形 */}
        <circle cx="23" cy="11" r="2.5" className="fill-background" />
        <circle cx="23.5" cy="10.5" r="1" className="fill-foreground" />
        
        {/* 喙 - 小三角形 */}
        <polygon
          points="18,12 16,15 20,15"
          className="fill-warning"
        />
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
