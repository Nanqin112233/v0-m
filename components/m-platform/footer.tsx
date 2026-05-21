"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Logo } from "./logo"

const footerLinks = {
  platform: {
    title: "平台",
    links: [
      { label: "数据广场", href: "/data" },
      { label: "任务广场", href: "/tasks" },
      { label: "排行榜", href: "/leaderboard" },
      { label: "社区", href: "/community" },
    ],
  },
  resources: {
    title: "资源",
    links: [
      { label: "帮助中心", href: "/help" },
      { label: "API 文档", href: "/docs/api" },
      { label: "标注规范", href: "/docs/guidelines" },
      { label: "常见问题", href: "/faq" },
    ],
  },
  legal: {
    title: "法律",
    links: [
      { label: "服务条款", href: "/terms" },
      { label: "隐私政策", href: "/privacy" },
      { label: "数据协议", href: "/data-agreement" },
    ],
  },
}

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn("bg-card shadow-[0_-4px_24px_rgba(0,0,0,0.08)]", className)}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Logo 和描述 */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              医学影像数据资产平台
              <br />
              连接数据、标注与价值
            </p>
          </div>

          {/* 链接列 */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部版权 */}
        <div className="mt-12 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} M平台. 保留所有权利.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                医学数据资产 · 标注任务撮合 · 沙箱积分账本
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
