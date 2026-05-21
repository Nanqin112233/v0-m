"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps {
  className?: string
  title: string
  value: string | number
  description?: string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  variant?: "default" | "primary" | "success" | "warning"
}

export function StatCard({
  className,
  title,
  value,
  description,
  change,
  changeLabel,
  icon,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "bg-card",
    primary: "bg-accent",
    success: "bg-success/5",
    warning: "bg-warning/5",
  }

  const iconBgStyles = {
    default: "bg-muted",
    primary: "bg-primary/10",
    success: "bg-success/10",
    warning: "bg-warning/10",
  }

  const changeIcon =
    change !== undefined ? (
      change > 0 ? (
        <TrendingUp className="h-3 w-3 text-success" />
      ) : change < 0 ? (
        <TrendingDown className="h-3 w-3 text-destructive" />
      ) : (
        <Minus className="h-3 w-3 text-muted-foreground" />
      )
    ) : null

  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0 flex-1">
            <p className="text-sm font-medium text-muted-foreground truncate">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground tracking-tight">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {(description || change !== undefined) && (
              <div className="flex items-center gap-2 flex-wrap">
                {change !== undefined && (
                  <div className="flex items-center gap-1">
                    {changeIcon}
                    <span
                      className={cn(
                        "text-xs font-medium",
                        change > 0
                          ? "text-success"
                          : change < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    >
                      {change > 0 ? "+" : ""}
                      {change}%
                    </span>
                    {changeLabel && (
                      <span className="text-xs text-muted-foreground">
                        {changeLabel}
                      </span>
                    )}
                  </div>
                )}
                {description && (
                  <p className="text-xs text-muted-foreground">{description}</p>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                "flex-shrink-0 rounded-lg p-2",
                iconBgStyles[variant]
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 迷你统计卡片（用于内联显示）
interface MiniStatProps {
  className?: string
  label: string
  value: string | number
  icon?: React.ReactNode
}

export function MiniStat({ className, label, value, icon }: MiniStatProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full bg-muted/50 px-4 py-2 shadow-sm",
        className
      )}
    >
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-sm font-semibold text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  )
}
