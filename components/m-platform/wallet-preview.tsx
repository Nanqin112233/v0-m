"use client"

import { cn } from "@/lib/utils"
import { Wallet, TrendingUp, TrendingDown, Minus } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

interface WalletPreviewProps {
  className?: string
  balance: number
  locked: number
  change?: number // 24小时变化
  currency?: string
}

export function WalletPreview({
  className,
  balance,
  locked,
  change = 0,
  currency = "积分",
}: WalletPreviewProps) {
  const available = balance - locked
  const changeIcon =
    change > 0 ? (
      <TrendingUp className="h-3 w-3 text-success" />
    ) : change < 0 ? (
      <TrendingDown className="h-3 w-3 text-destructive" />
    ) : (
      <Minus className="h-3 w-3 text-muted-foreground" />
    )

  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + "万"
    }
    return num.toLocaleString()
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/me/assets"
            className={cn(
              "flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm",
              "hover:shadow-md transition-all cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              className
            )}
          >
            <Wallet className="h-4 w-4 text-primary" />
            <div className="flex items-baseline gap-1">
              <span className="font-semibold text-sm text-foreground">
                {formatNumber(available)}
              </span>
              <span className="text-xs text-muted-foreground">{currency}</span>
            </div>
            {change !== 0 && (
              <div className="flex items-center gap-0.5">
                {changeIcon}
                <span
                  className={cn(
                    "text-xs",
                    change > 0
                      ? "text-success"
                      : change < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {change > 0 ? "+" : ""}
                  {formatNumber(change)}
                </span>
              </div>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" className="p-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">总余额</span>
              <span className="font-medium">
                {formatNumber(balance)} {currency}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">可用</span>
              <span className="font-medium text-success">
                {formatNumber(available)} {currency}
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">锁定中</span>
              <span className="font-medium text-warning">
                {formatNumber(locked)} {currency}
              </span>
            </div>
            {change !== 0 && (
              <>
                <div className="border-t border-border pt-2" />
                <div className="flex items-center justify-between gap-6">
                  <span className="text-muted-foreground">24h 变动</span>
                  <span
                    className={cn(
                      "font-medium",
                      change > 0
                        ? "text-success"
                        : change < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {change > 0 ? "+" : ""}
                    {formatNumber(change)} {currency}
                  </span>
                </div>
              </>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
