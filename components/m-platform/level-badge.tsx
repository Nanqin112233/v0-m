"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Shield, Star, Award, Crown } from "lucide-react"

// 等级配置
const levelConfig: Record<
  number,
  {
    label: string
    description: string
    color: string
    bgColor: string
    borderColor: string
    icon: React.ElementType
    permissions: string[]
  }
> = {
  1: {
    label: "Lv1 新手",
    description: "刚加入平台的用户",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted",
    icon: Star,
    permissions: ["浏览数据", "领取基础任务"],
  },
  2: {
    label: "Lv2 初级",
    description: "完成基础认证的用户",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted",
    icon: Star,
    permissions: ["浏览数据", "领取初级任务", "参与社区讨论"],
  },
  3: {
    label: "Lv3 中级",
    description: "具备专业标注能力的用户",
    color: "text-primary",
    bgColor: "bg-accent",
    borderColor: "border-primary/30",
    icon: Shield,
    permissions: ["领取中级任务", "上传数据集", "发布基础任务"],
  },
  4: {
    label: "Lv4 高级",
    description: "经验丰富的标注专家",
    color: "text-primary",
    bgColor: "bg-accent",
    borderColor: "border-primary/30",
    icon: Shield,
    permissions: ["领取高级任务", "发布进阶任务", "数据定价建议"],
  },
  5: {
    label: "Lv5 专家",
    description: "具备审核资格的专家",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    icon: Award,
    permissions: ["审核他人标注", "发布专家任务", "参与质量评定"],
  },
  6: {
    label: "Lv6 大师",
    description: "平台认证的顶级专家",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    icon: Crown,
    permissions: ["全部权限", "制定标注规范", "培训其他用户"],
  },
}

interface LevelBadgeProps {
  level: number
  className?: string
  showTooltip?: boolean
  size?: "sm" | "md" | "lg"
}

export function LevelBadge({
  level,
  className,
  showTooltip = true,
  size = "md",
}: LevelBadgeProps) {
  const config = levelConfig[level] || levelConfig[1]
  const Icon = config.icon

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0 h-4",
    md: "text-xs px-2 py-0.5",
    lg: "text-sm px-2.5 py-1",
  }

  const iconSizes = {
    sm: "h-2.5 w-2.5",
    md: "h-3 w-3",
    lg: "h-3.5 w-3.5",
  }

  const badge = (
    <Badge
      variant="outline"
      className={cn(
        "font-semibold gap-1 border",
        config.bgColor,
        config.color,
        config.borderColor,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      <span>Lv{level}</span>
    </Badge>
  )

  if (!showTooltip) {
    return badge
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs p-3">
          <div className="space-y-2">
            <div>
              <p className="font-semibold">{config.label}</p>
              <p className="text-xs text-muted-foreground">
                {config.description}
              </p>
            </div>
            <div className="border-t border-border pt-2">
              <p className="text-xs font-medium mb-1">权限：</p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {config.permissions.map((perm) => (
                  <li key={perm} className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-success" />
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// 导出等级配置供其他组件使用
export { levelConfig }
