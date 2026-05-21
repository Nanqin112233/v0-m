"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  User,
  Settings,
  Award,
  Wallet,
  Trophy,
  MessageSquare,
  LogOut,
  ChevronDown,
  Shield,
} from "lucide-react"

// 用户等级配置
const levelConfig: Record<
  number,
  { label: string; color: string; bgColor: string }
> = {
  1: { label: "Lv1", color: "text-muted-foreground", bgColor: "bg-muted" },
  2: { label: "Lv2", color: "text-muted-foreground", bgColor: "bg-muted" },
  3: { label: "Lv3", color: "text-primary", bgColor: "bg-accent" },
  4: { label: "Lv4", color: "text-primary", bgColor: "bg-accent" },
  5: { label: "Lv5", color: "text-success", bgColor: "bg-success/10" },
  6: { label: "Lv6", color: "text-success", bgColor: "bg-success/10" },
}

interface UserMenuProps {
  className?: string
  user: {
    name: string
    email: string
    avatar?: string
    level: number
    verified: boolean
  }
  onNavigate?: (path: string) => void
  onLogout?: () => void
}

export function UserMenu({
  className,
  user,
  onNavigate,
  onLogout,
}: UserMenuProps) {
  const levelInfo = levelConfig[user.level] || levelConfig[1]
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const menuItems = [
    { icon: User, label: "个人中心", path: "/profile" },
    { icon: Wallet, label: "我的资产", path: "/wallet" },
    { icon: Award, label: "认证中心", path: "/certification" },
    { icon: Trophy, label: "排行榜", path: "/leaderboard" },
    { icon: MessageSquare, label: "社区", path: "/community" },
    { icon: Settings, label: "设置", path: "/settings" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-full px-2 py-1.5 shadow-sm",
            "hover:shadow-md transition-all cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
          )}
        >
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            {user.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-success p-0.5">
                <Shield className="h-2.5 w-2.5 text-success-foreground" />
              </div>
            )}
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="text-sm font-medium text-foreground max-w-[100px] truncate">
              {user.name}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                "px-2 py-0 text-[10px] font-semibold rounded-full shadow-sm",
                levelInfo.bgColor,
                levelInfo.color
              )}
            >
              {levelInfo.label}
            </Badge>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <Badge
                variant="secondary"
                className={cn(
                  "px-2 py-0 text-[10px] font-semibold rounded-full shadow-sm",
                  levelInfo.bgColor,
                  levelInfo.color
                )}
              >
                {levelInfo.label}
              </Badge>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.path}
              onClick={() => onNavigate?.(item.path)}
              className="cursor-pointer"
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
