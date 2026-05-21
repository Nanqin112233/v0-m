"use client"

import { Header, Footer, LevelBadge, StatCard } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock,
  Coins,
  Database,
  FileStack,
  Lock,
  Play,
  Settings,
  Shield,
  Upload,
  Wallet,
} from "lucide-react"
import Link from "next/link"

// 模拟用户数据 - 可以切换不同角色
const mockUser = {
  name: "张医生",
  email: "zhang@hospital.com",
  avatar: undefined,
  level: 5,
  verified: true,
  organization: "协和医院",
  specialty: "胸外科",
  joinedAt: "2025-03-15",
}

// 钱包数据
const mockWallet = {
  availableBalance: 125680,
  pendingIncome: 12500,
  lockedFunds: 85000,
  totalIncome: 458900,
  totalSpend: 120000,
}

// 模拟用户角色数据
const userRoles = {
  isPublisher: true, // 机构/发布方
  isWorker: true,    // 标注者
  isExpert: true,    // Lv5+专家
}

// 模拟发布方数据
const publisherData = {
  datasets: [
    { id: "ds-001", name: "胸部CT影像数据集", status: "active", samples: 12500 },
    { id: "ds-002", name: "脑部MRI标准数据集", status: "pending_audit", samples: 8200 },
  ],
  tasks: [
    { id: "task-001", title: "肺结节CT影像标注", status: "active", claimed: 45, total: 100 },
  ],
  totalLocked: 85000,
}

// 模拟标注者数据
const workerData = {
  claimedTasks: [
    { 
      id: "task-003", 
      title: "眼底血管造影分析", 
      progress: 72, 
      total: 100, 
      reward: 1800,
      deadline: "2026-06-10" 
    },
  ],
  pendingIncome: 12500,
  completedCount: 156,
}

// 模拟专家数据
const expertData = {
  pendingAudits: 5,
  todayAudited: 12,
  totalAudited: 892,
}

export default function PersonalCenterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={{
          balance: mockWallet.availableBalance,
          locked: mockWallet.lockedFunds,
          change: mockWallet.pendingIncome,
        }}
        notificationCount={3}
      />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 身份卡片 */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {mockUser.name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                    <LevelBadge level={mockUser.level} size="md" />
                    {mockUser.verified && (
                      <Badge variant="outline" className="border-success/50 text-success">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        已认证
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                    {mockUser.organization && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {mockUser.organization}
                      </span>
                    )}
                    {mockUser.specialty && (
                      <span className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        {mockUser.specialty}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      加入于 {mockUser.joinedAt}
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" asChild>
                  <Link href="/me/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    账号设置
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* 钱包概览卡片 */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
            <Link href="/me/assets">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">可用余额</span>
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    {mockWallet.availableBalance.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">积分</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/me/assets?tab=flows">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">审查中收益</span>
                    <Clock className="h-4 w-4 text-warning" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-warning">
                    +{mockWallet.pendingIncome.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">待审核</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/me/assets?tab=lockup">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">锁仓资金</span>
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-foreground">
                    {mockWallet.lockedFunds.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">任务锁定</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/me/assets?tab=flows">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">累计收益</span>
                    <Coins className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-2xl font-bold font-mono text-success">
                    {mockWallet.totalIncome.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    支出 {mockWallet.totalSpend.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          {/* 角色面板 - 千人千面 */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* 发布方面板 */}
            {userRoles.isPublisher && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    我的数据与任务
                  </CardTitle>
                  <CardDescription>作为发布方管理您的数据集和任务</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 数据集列表 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">数据集</span>
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link href="/data?tab=mine">查看全部</Link>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {publisherData.datasets.map(ds => (
                        <div key={ds.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <FileStack className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{ds.name}</p>
                              <p className="text-xs text-muted-foreground">{ds.samples.toLocaleString()} 样本</p>
                            </div>
                          </div>
                          <Badge variant={ds.status === "active" ? "default" : "secondary"}>
                            {ds.status === "active" ? "已发布" : "待审核"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 任务列表 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">发布的任务</span>
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link href="/tasks?tab=published">查看全部</Link>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {publisherData.tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.claimed}/{task.total} 已领取
                              </p>
                            </div>
                          </div>
                          <Badge>进行中</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 快捷入口 */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" asChild>
                      <Link href="/data/upload">
                        <Upload className="h-4 w-4 mr-2" />
                        上传数据
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href="/tasks/new">
                        <ClipboardList className="h-4 w-4 mr-2" />
                        发布任务
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* 标注者面板 */}
            {userRoles.isWorker && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-success" />
                    我的标注工作
                  </CardTitle>
                  <CardDescription>已领取的任务和待审收益</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 进行中的任务 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">进行中的任务</span>
                      <Button variant="link" size="sm" className="h-auto p-0" asChild>
                        <Link href="/tasks?tab=claimed">查看全部</Link>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {workerData.claimedTasks.map(task => (
                        <div key={task.id} className="p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{task.title}</p>
                            <span className="text-xs text-muted-foreground">
                              截止: {task.deadline}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex-1 mr-4">
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-success transition-all"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs font-mono">
                              {task.progress}/{task.total}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-success font-mono">
                              <Coins className="h-3 w-3 inline mr-1" />
                              {task.reward} 积分
                            </span>
                            <Button size="sm" className="h-7 bg-success hover:bg-success/90" asChild>
                              <Link href="/workspace/annotation">
                                <Play className="h-3 w-3 mr-1" />
                                继续标注
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 统计 */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-3 rounded-lg bg-warning/10">
                      <p className="text-2xl font-bold font-mono text-warning">
                        {workerData.pendingIncome.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">审查中收益</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-success/10">
                      <p className="text-2xl font-bold font-mono text-success">
                        {workerData.completedCount}
                      </p>
                      <p className="text-xs text-muted-foreground">累计完成案例</p>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full" variant="outline" asChild>
                    <Link href="/tasks">
                      浏览更多任务
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Lv5+专家面板 */}
            {userRoles.isExpert && mockUser.level >= 5 && (
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    专家审核中心
                    <Badge variant="outline" className="ml-2">Lv5+ 专属</Badge>
                  </CardTitle>
                  <CardDescription>审核标注质量，享受更高收益分成</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-warning/10">
                        <p className="text-3xl font-bold font-mono text-warning">
                          {expertData.pendingAudits}
                        </p>
                        <p className="text-sm text-muted-foreground">待审核</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-success/10">
                        <p className="text-3xl font-bold font-mono text-success">
                          {expertData.todayAudited}
                        </p>
                        <p className="text-sm text-muted-foreground">今日审核</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/10">
                        <p className="text-3xl font-bold font-mono text-primary">
                          {expertData.totalAudited}
                        </p>
                        <p className="text-sm text-muted-foreground">累计审核</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button size="lg" asChild>
                        <Link href="/workspace/audit">
                          进入审核工作台
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* 快速导航 */}
          <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4">
            <Link href="/me/certification">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">资质认证</p>
                    <p className="text-xs text-muted-foreground">提升等级</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/me/assets">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">我的资产</p>
                    <p className="text-xs text-muted-foreground">钱包与流水</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/me/settings">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">账号设置</p>
                    <p className="text-xs text-muted-foreground">基础信息</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/rankings">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">排行榜</p>
                    <p className="text-xs text-muted-foreground">查看排名</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
