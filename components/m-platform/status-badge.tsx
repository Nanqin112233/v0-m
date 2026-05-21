"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  Pause,
  Lock,
} from "lucide-react"

// 任务状态类型
export type TaskStatus =
  | "draft" // 草稿
  | "pending" // 待发布
  | "open" // 开放中
  | "in_progress" // 进行中
  | "under_review" // 审核中
  | "completed" // 已完成
  | "cancelled" // 已取消
  | "paused" // 已暂停

// 状态配置
const statusConfig: Record<
  TaskStatus,
  {
    label: string
    color: string
    bgColor: string
    borderColor: string
    icon: React.ElementType
  }
> = {
  draft: {
    label: "草稿",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted",
    icon: Clock,
  },
  pending: {
    label: "待发布",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    icon: Clock,
  },
  open: {
    label: "开放中",
    color: "text-primary",
    bgColor: "bg-accent",
    borderColor: "border-primary/30",
    icon: Play,
  },
  in_progress: {
    label: "进行中",
    color: "text-primary",
    bgColor: "bg-accent",
    borderColor: "border-primary/30",
    icon: Play,
  },
  under_review: {
    label: "审核中",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    icon: AlertCircle,
  },
  completed: {
    label: "已完成",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    icon: CheckCircle,
  },
  cancelled: {
    label: "已取消",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    icon: XCircle,
  },
  paused: {
    label: "已暂停",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted",
    icon: Pause,
  },
}

interface TaskStatusBadgeProps {
  status: TaskStatus
  className?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

export function TaskStatusBadge({
  status,
  className,
  showIcon = true,
  size = "md",
}: TaskStatusBadgeProps) {
  const config = statusConfig[status]
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

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium gap-1 rounded-full shadow-sm",
        config.bgColor,
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </Badge>
  )
}

// 数据集状态
export type DatasetStatus =
  | "uploading" // 上传中
  | "processing" // 处理中
  | "private" // 私有
  | "public" // 公开
  | "archived" // 已归档

const datasetStatusConfig: Record<
  DatasetStatus,
  {
    label: string
    color: string
    bgColor: string
    borderColor: string
    icon: React.ElementType
  }
> = {
  uploading: {
    label: "上传中",
    color: "text-primary",
    bgColor: "bg-accent",
    borderColor: "border-primary/30",
    icon: Clock,
  },
  processing: {
    label: "处理中",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    icon: Clock,
  },
  private: {
    label: "私有",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted",
    icon: Lock,
  },
  public: {
    label: "公开",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    icon: CheckCircle,
  },
  archived: {
    label: "已归档",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-muted",
    icon: Pause,
  },
}

interface DatasetStatusBadgeProps {
  status: DatasetStatus
  className?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
}

export function DatasetStatusBadge({
  status,
  className,
  showIcon = true,
  size = "md",
}: DatasetStatusBadgeProps) {
  const config = datasetStatusConfig[status]
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

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium gap-1 rounded-full shadow-sm",
        config.bgColor,
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </Badge>
  )
}

// 导出配置
export { statusConfig, datasetStatusConfig }
