"use client"

import { useState, useMemo } from "react"
import { Header, Footer, LevelBadge } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Search,
  Plus,
  Clock,
  Coins,
  Users,
  ArrowUpDown,
  CheckCircle2,
  Play,
  Lock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

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

// 任务状态配置
const taskStatusConfig = {
  active: { label: "进行中", color: "bg-success text-success-foreground" },
  pending_audit: { label: "待审核", color: "bg-warning text-warning-foreground" },
  terminated: { label: "已截止", color: "bg-muted text-muted-foreground" },
  settled: { label: "已结算", color: "bg-primary text-primary-foreground" },
}

// 模拟任务数据
const mockTasks = [
  {
    id: "task-001",
    title: "肺结节CT影像标注",
    description: "对胸部CT影像中的肺结节进行标注，包括位置、大小、形态等特征",
    publisher: "协和医院",
    publisherLevel: 6,
    reward: 2400,
    perCase: 4.8,
    deadline: "2026-06-15",
    minLevel: 2,
    claimed: 45,
    maxClaims: 100,
    totalCases: 500,
    modality: "CT",
    specialty: "胸外科",
    status: "active",
    createdAt: "2026-05-01",
  },
  {
    id: "task-002",
    title: "脑肿瘤MRI分割标注",
    description: "对脑部MRI影像中的肿瘤区域进行精确分割标注",
    publisher: "华西医院",
    publisherLevel: 7,
    reward: 4800,
    perCase: 12,
    deadline: "2026-06-20",
    minLevel: 3,
    claimed: 28,
    maxClaims: 50,
    totalCases: 400,
    modality: "MRI",
    specialty: "神经内科",
    status: "active",
    createdAt: "2026-05-05",
  },
  {
    id: "task-003",
    title: "眼底血管造影分析",
    description: "标注眼底血管造影图像中的血管走向、分支和异常区域",
    publisher: "中山眼科",
    publisherLevel: 8,
    reward: 1800,
    perCase: 3,
    deadline: "2026-06-10",
    minLevel: 1,
    claimed: 72,
    maxClaims: 80,
    totalCases: 600,
    modality: "造影",
    specialty: "眼科",
    status: "active",
    createdAt: "2026-05-08",
  },
  {
    id: "task-004",
    title: "骨折X光片标注",
    description: "标注四肢X光片中的骨折位置、类型和严重程度",
    publisher: "积水潭医院",
    publisherLevel: 5,
    reward: 1200,
    perCase: 2.4,
    deadline: "2026-06-08",
    minLevel: 1,
    claimed: 50,
    maxClaims: 50,
    totalCases: 500,
    modality: "X-ray",
    specialty: "骨科",
    status: "terminated",
    createdAt: "2026-04-20",
  },
  {
    id: "task-005",
    title: "胃镜病变检测标注",
    description: "标注胃镜检查影像中的病变区域和类型",
    publisher: "瑞金医院",
    publisherLevel: 6,
    reward: 3600,
    perCase: 6,
    deadline: "2026-06-25",
    minLevel: 4,
    claimed: 15,
    maxClaims: 40,
    totalCases: 600,
    modality: "内镜",
    specialty: "消化内科",
    status: "active",
    createdAt: "2026-05-12",
  },
]

// 模拟用户已领取的任务
const userClaimedTasks = ["task-003"]

// 模拟用户发布的任务
const userPublishedTasks = ["task-001"]

// 模拟待审核任务（Lv5+可见）
const auditTasks = [
  {
    id: "audit-001",
    taskId: "task-001",
    taskTitle: "肺结节CT影像标注",
    submitter: "李医生",
    submitterLevel: 3,
    submittedAt: "2026-05-18 14:30",
    caseCount: 25,
  },
  {
    id: "audit-002",
    taskId: "task-002",
    taskTitle: "脑肿瘤MRI分割标注",
    submitter: "王医生",
    submitterLevel: 4,
    submittedAt: "2026-05-18 10:15",
    caseCount: 20,
  },
]

// 任务卡片组件
function TaskCard({
  task,
  userLevel,
  isClaimed,
  isPublisher,
}: {
  task: typeof mockTasks[0]
  userLevel: number
  isClaimed: boolean
  isPublisher: boolean
}) {
  const isEligible = userLevel >= task.minLevel
  const isFull = task.claimed >= task.maxClaims
  const isTerminated = task.status === "terminated"
  const canClaim = isEligible && !isFull && !isTerminated && !isClaimed && !isPublisher
  
  // 计算剩余天数
  const daysLeft = Math.ceil((new Date(task.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  const isUrgent = daysLeft <= 3 && daysLeft > 0
  
  return (
    <Card className={cn(
      "border border-border transition-colors",
      canClaim && "hover:border-primary/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <LevelBadge level={task.minLevel} size="sm" showTooltip={false} />
            <Badge variant="outline" className="text-xs">{task.modality}</Badge>
          </div>
          <Badge className={cn("text-xs", taskStatusConfig[task.status as keyof typeof taskStatusConfig].color)}>
            {taskStatusConfig[task.status as keyof typeof taskStatusConfig].label}
          </Badge>
        </div>
        <CardTitle className="text-base mt-2 line-clamp-1">{task.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* 发布方信息 */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">发布方</span>
          <div className="flex items-center gap-1">
            <span>{task.publisher}</span>
            <LevelBadge level={task.publisherLevel} size="sm" showTooltip={false} />
          </div>
        </div>
        
        {/* 奖励和截止时间 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-success font-medium font-mono">
            <Coins className="h-4 w-4" />
            <span>{task.reward.toLocaleString()} 积分</span>
            <span className="text-xs text-muted-foreground font-normal">
              ({task.perCase}/例)
            </span>
          </div>
          <Badge variant={isUrgent ? "destructive" : "outline"} className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {isTerminated ? "已截止" : daysLeft <= 0 ? "今日截止" : `${daysLeft}天后截止`}
          </Badge>
        </div>
        
        {/* 领取进度 */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Users className="h-4 w-4" />
              已领取
            </span>
            <span className="font-mono">{task.claimed}/{task.maxClaims}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isFull ? "bg-muted-foreground" : "bg-primary"
              )}
              style={{ width: `${(task.claimed / task.maxClaims) * 100}%` }}
            />
          </div>
        </div>
        
        {/* 操作按钮 */}
        <div>
          {isClaimed ? (
            <Button className="w-full bg-success hover:bg-success/90" asChild>
              <Link href="/workspace/annotation">
                <Play className="h-4 w-4 mr-2" />
                去标注
              </Link>
            </Button>
          ) : isPublisher ? (
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/tasks/${task.id}`}>
                查看详情
              </Link>
            </Button>
          ) : canClaim ? (
            <Button className="w-full bg-success hover:bg-success/90">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              领取任务
            </Button>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="w-full" disabled>
                    {!isEligible ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        需要 Lv{task.minLevel}+
                      </>
                    ) : isFull ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        名额已满
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        已截止
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {!isEligible
                    ? `需要 Lv${task.minLevel} 及以上等级才能领取此任务`
                    : isFull
                    ? "此任务领取人数已达上限"
                    : "此任务已截止，无法继续领取"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 审核任务卡片
function AuditTaskCard({ audit }: { audit: typeof auditTasks[0] }) {
  return (
    <Card className="border border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">{audit.taskTitle}</p>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <span>提交人: {audit.submitter}</span>
              <LevelBadge level={audit.submitterLevel} size="sm" showTooltip={false} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {audit.submittedAt} · {audit.caseCount} 个案例
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href="/workspace/audit">
              审核
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TaskMarketplacePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [modalityFilter, setModalityFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  
  const userLevel = mockUser.level
  const isExpert = userLevel >= 5
  const isPublisher = userLevel >= 3
  
  // 过滤和排序任务
  const filteredTasks = useMemo(() => {
    let result = [...mockTasks]
    
    // Tab筛选
    if (activeTab === "claimed") {
      result = result.filter(t => userClaimedTasks.includes(t.id))
    } else if (activeTab === "published") {
      result = result.filter(t => userPublishedTasks.includes(t.id))
    }
    
    // 搜索
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.publisher.toLowerCase().includes(query)
      )
    }
    
    // 模态筛选
    if (modalityFilter !== "all") {
      result = result.filter(t => t.modality === modalityFilter)
    }
    
    // 等级筛选
    if (levelFilter !== "all") {
      const level = parseInt(levelFilter)
      result = result.filter(t => t.minLevel <= level)
    }
    
    // 排序
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "reward") {
      result.sort((a, b) => b.reward - a.reward)
    } else if (sortBy === "deadline") {
      result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    }
    
    return result
  }, [activeTab, searchQuery, sortBy, modalityFilter, levelFilter])
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={mockWallet}
        notificationCount={3}
      />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">任务广场</h1>
              <p className="text-muted-foreground mt-1">浏览开放的标注任务，按条件筛选并领取</p>
            </div>
            
            {/* 发布任务入口 */}
            {isPublisher && (
              <Button asChild>
                <Link href="/tasks/new">
                  <Plus className="h-4 w-4 mr-2" />
                  发布任务
                </Link>
              </Button>
            )}
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">全部任务</TabsTrigger>
              <TabsTrigger value="claimed">我的接单</TabsTrigger>
              {isExpert && (
                <TabsTrigger value="audit" className="relative">
                  审核任务
                  {auditTasks.length > 0 && (
                    <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1">
                      {auditTasks.length}
                    </Badge>
                  )}
                </TabsTrigger>
              )}
              {isPublisher && (
                <TabsTrigger value="published">我发布的</TabsTrigger>
              )}
            </TabsList>
            
            {/* 搜索和筛选栏 */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索任务名称、描述、发布方..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Select value={modalityFilter} onValueChange={setModalityFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="模态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部模态</SelectItem>
                    <SelectItem value="CT">CT</SelectItem>
                    <SelectItem value="MRI">MRI</SelectItem>
                    <SelectItem value="X-ray">X-ray</SelectItem>
                    <SelectItem value="内镜">内镜</SelectItem>
                    <SelectItem value="造影">造影</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="等级要求" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部等级</SelectItem>
                    <SelectItem value="1">Lv1+</SelectItem>
                    <SelectItem value="2">Lv2+</SelectItem>
                    <SelectItem value="3">Lv3+</SelectItem>
                    <SelectItem value="4">Lv4+</SelectItem>
                    <SelectItem value="5">Lv5+</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">最新发布</SelectItem>
                    <SelectItem value="reward">奖励最高</SelectItem>
                    <SelectItem value="deadline">即将截止</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* 任务列表 */}
            <TabsContent value="all" className="mt-6">
              {filteredTasks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      userLevel={userLevel}
                      isClaimed={userClaimedTasks.includes(task.id)}
                      isPublisher={userPublishedTasks.includes(task.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">没有找到匹配的任务</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="claimed" className="mt-6">
              {filteredTasks.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      userLevel={userLevel}
                      isClaimed={true}
                      isPublisher={false}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">您还没有领取任何任务</p>
                    <Button variant="link" onClick={() => setActiveTab("all")} className="mt-2">
                      去任务广场看看
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {isExpert && (
              <TabsContent value="audit" className="mt-6">
                {auditTasks.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {auditTasks.map(audit => (
                      <AuditTaskCard key={audit.id} audit={audit} />
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <CheckCircle2 className="h-12 w-12 text-success/50 mb-4" />
                      <p className="text-muted-foreground">暂无待审核任务</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}
            
            {isPublisher && (
              <TabsContent value="published" className="mt-6">
                {filteredTasks.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        userLevel={userLevel}
                        isClaimed={false}
                        isPublisher={true}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">您还没有发布任何任务</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link href="/tasks/new">发布第一个任务</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
