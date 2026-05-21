"use client"

import { Header, Footer, StatCard, LevelBadge } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Database,
  ClipboardList,
  Users,
  Coins,
  ArrowRight,
  Upload,
  FileSearch,
  CheckSquare,
  Wallet,
} from "lucide-react"
import Link from "next/link"

// 模拟用户数据
const mockUser = {
  name: "张医生",
  email: "zhang@hospital.com",
  avatar: undefined,
  level: 5,
  verified: true,
}

const mockWallet = {
  balance: 125680,
  locked: 15000,
  change: 2350,
}

// 业务闭环步骤
const workflowSteps = [
  {
    icon: Upload,
    title: "数据上传",
    description: "上传医学影像数据集，设定访问权限与定价",
  },
  {
    icon: FileSearch,
    title: "数据发布",
    description: "发布数据至广场，供标注者浏览与选择",
  },
  {
    icon: ClipboardList,
    title: "任务发布",
    description: "创建标注任务，锁定积分作为报酬",
  },
  {
    icon: CheckSquare,
    title: "标注审核",
    description: "标注完成后由Lv5+专家审核质量",
  },
  {
    icon: Wallet,
    title: "积分结算",
    description: "审核通过后积分自动结算至钱包",
  },
]

// 平台统计
const platformStats = [
  {
    title: "数据集总量",
    value: "12,458",
    change: 12,
    changeLabel: "较上月",
    icon: <Database className="h-5 w-5 text-primary" />,
  },
  {
    title: "活跃任务",
    value: "3,842",
    change: 8,
    changeLabel: "较上周",
    icon: <ClipboardList className="h-5 w-5 text-primary" />,
  },
  {
    title: "注册用户",
    value: "28,965",
    change: 15,
    changeLabel: "较上月",
    icon: <Users className="h-5 w-5 text-primary" />,
  },
  {
    title: "累计结算",
    value: "¥8.5M",
    change: 23,
    changeLabel: "较上月",
    icon: <Coins className="h-5 w-5 text-success" />,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 全局顶部导航 */}
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={mockWallet}
        notificationCount={3}
        onNavigate={(path) => console.log("Navigate to:", path)}
        onLogout={() => console.log("Logout")}
        onNotificationClick={() => console.log("Notifications")}
      />

      {/* 主内容区 */}
      <main className="flex-1">
        {/* Hero 区域 */}
        <section className="border-b border-border bg-gradient-to-b from-accent/30 to-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                医学影像数据资产平台
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                连接数据、标注与价值。通过沙箱积分系统，实现医学影像数据的安全流转与价值变现。
              </p>
              <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  开始探索
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  了解更多
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 平台统计 */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {platformStats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeLabel={stat.changeLabel}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 业务闭环 */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                业务闭环
              </h2>
              <p className="mt-2 text-muted-foreground">
                从数据上传到积分结算，完整的数据资产流转链路
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {workflowSteps.map((step, index) => (
                <Card
                  key={step.title}
                  className="relative border border-border bg-card"
                >
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-3 left-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <h3 className="mt-4 font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 等级系统预览 */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                用户等级体系
              </h2>
              <p className="mt-2 text-muted-foreground">
                六级成长体系，解锁更多平台权限
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <LevelBadge key={level} level={level} size="lg" />
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Lv5+ 用户具备审核资格，可参与标注质量审核
            </p>
          </div>
        </section>

        {/* 快速入口 */}
        <section>
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Database className="h-5 w-5" />
                    </div>
                    数据广场
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    浏览公开数据资产，按模态、部位、病种筛选，查看数据详情与定价
                  </p>
                  <Link
                    href="/data"
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    浏览数据
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ClipboardList className="h-5 w-5" />
                    </div>
                    任务广场
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    查看开放的标注任务，按报酬、难度、截止时间筛选，一键领取任务
                  </p>
                  <Link
                    href="/tasks"
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    浏览任务
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground transition-colors">
                      <Upload className="h-5 w-5" />
                    </div>
                    上传数据
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    上传您的医学影像数据集，设置访问权限与定价，开始价值变现
                  </p>
                  <Link
                    href="/upload"
                    className="mt-4 inline-flex items-center text-sm font-medium text-success hover:underline"
                  >
                    开始上传
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* 全局底部 */}
      <Footer />
    </div>
  )
}
