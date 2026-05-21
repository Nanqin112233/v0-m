"use client"

import { useState } from "react"
import { LevelBadge } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Coins,
  Eye,
  EyeOff,
  FileStack,
  Layers,
  Loader2,
  Lock,
  User,
  X,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 模拟用户等级 - Lv5+才能访问
const userLevel = 5

// 模拟审核队列
const mockAuditQueue = [
  {
    id: "audit-001",
    taskId: "task-001",
    taskTitle: "肺结节CT影像标注",
    submitter: "李医生",
    submitterLevel: 3,
    submittedAt: "2026-05-18 14:30",
    caseCount: 25,
    totalReward: 120,
    status: "pending",
  },
  {
    id: "audit-002",
    taskId: "task-002",
    taskTitle: "脑肿瘤MRI分割标注",
    submitter: "王医生",
    submitterLevel: 4,
    submittedAt: "2026-05-18 10:15",
    caseCount: 20,
    totalReward: 240,
    status: "pending",
  },
  {
    id: "audit-003",
    taskId: "task-001",
    taskTitle: "肺结节CT影像标注",
    submitter: "张护士",
    submitterLevel: 2,
    submittedAt: "2026-05-17 16:45",
    caseCount: 15,
    totalReward: 72,
    status: "pending",
  },
]

// 模拟标注数据
const mockAnnotations = [
  { id: "ann-1", type: "rectangle", x: 25, y: 30, width: 15, height: 12, label: "结节1" },
  { id: "ann-2", type: "circle", x: 55, y: 45, width: 10, height: 10, label: "结节2" },
  { id: "ann-3", type: "rectangle", x: 35, y: 60, width: 12, height: 8, label: "阴影区" },
]

// 等级不足阻断页面
function AccessBlockedPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">访问受限</h1>
        <p className="text-gray-400 mb-6">
          审核工作台仅对 Lv5 及以上等级用户开放。
          完成更多标注任务并通过认证以提升等级。
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="text-gray-500">当前等级:</span>
          <LevelBadge level={3} showTooltip={false} />
          <ArrowRight className="h-4 w-4 text-gray-600" />
          <span className="text-gray-500">需要:</span>
          <LevelBadge level={5} showTooltip={false} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/me/certification">
              去认证升级
            </Link>
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
            <Link href="/tasks">
              返回任务广场
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// 审核后果面板
function AuditConsequencePanel({
  audit,
  action,
}: {
  audit: typeof mockAuditQueue[0]
  action: "approve" | "reject"
}) {
  // 计算分成比例
  const getShareRate = (level: number) => {
    if (level >= 9) return 1.0
    if (level >= 5) return 0.8
    return 0.6
  }
  
  const shareRate = getShareRate(audit.submitterLevel)
  const platformFee = audit.totalReward * 0.05
  const submitterIncome = audit.totalReward * shareRate
  
  if (action === "approve") {
    return (
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2 text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            批准后账本变化
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">标注者 {audit.submitter}</span>
            <span className="text-green-400 font-mono">
              审查中收益 → 可用余额
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">到账金额</span>
            <span className="text-green-400 font-mono font-medium">
              +{submitterIncome.toFixed(1)} 积分
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>平台服务费 (5%)</span>
            <span className="font-mono">-{platformFee.toFixed(1)} 积分</span>
          </div>
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>分成比例 (Lv{audit.submitterLevel})</span>
            <span className="font-mono">{(shareRate * 100).toFixed(0)}%</span>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className="border-red-500/30 bg-red-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2 text-red-400">
          <XCircle className="h-4 w-4" />
          驳回后账本变化
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">标注者 {audit.submitter}</span>
          <span className="text-red-400 font-mono">
            审查中收益 → 取消
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">发布方锁仓</span>
          <span className="text-yellow-400 font-mono">
            退款 +{audit.totalReward.toFixed(1)} 积分
          </span>
        </div>
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
          驳回后标注者需重新提交，发布方锁仓资金暂时退回
        </div>
      </CardContent>
    </Card>
  )
}

// 审核工作台主页面
export default function AuditWorkspacePage() {
  const [selectedAudit, setSelectedAudit] = useState<typeof mockAuditQueue[0] | null>(mockAuditQueue[0])
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [rejectReason, setRejectReason] = useState("")
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    action: "approve" | "reject"
  }>({ open: false, action: "approve" })
  const [processing, setProcessing] = useState(false)
  const [processedIds, setProcessedIds] = useState<string[]>([])
  
  // 检查用户等级
  if (userLevel < 5) {
    return <AccessBlockedPage />
  }
  
  const pendingQueue = mockAuditQueue.filter(a => !processedIds.includes(a.id))
  
  const handleAction = (action: "approve" | "reject") => {
    setConfirmDialog({ open: true, action })
  }
  
  const handleConfirm = () => {
    if (!selectedAudit) return
    
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setProcessedIds(prev => [...prev, selectedAudit.id])
      setConfirmDialog({ open: false, action: "approve" })
      setRejectReason("")
      
      // 选择下一个待审核项
      const nextAudit = pendingQueue.find(a => a.id !== selectedAudit.id)
      setSelectedAudit(nextAudit || null)
    }, 1500)
  }
  
  // 空队列状态
  if (pendingQueue.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center p-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">审核队列已清空</h2>
          <p className="text-gray-400 mt-2">
            暂无待审核任务，稍后再来查看
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/me">
                返回工作台
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* 顶部导航栏 */}
      <header className="h-14 border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            asChild
          >
            <Link href="/tasks">
              <ChevronLeft className="h-4 w-4 mr-1" />
              返回
            </Link>
          </Button>
          <div className="h-6 w-px bg-gray-800" />
          <div>
            <h1 className="text-sm font-medium">审核工作台</h1>
            <p className="text-xs text-gray-500">Lv5+ 专家审核</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-gray-700 text-gray-400">
            待审核: {pendingQueue.length}
          </Badge>
          <LevelBadge level={userLevel} showTooltip={false} />
        </div>
      </header>
      
      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：审核队列 */}
        <aside className="w-80 border-r border-gray-800 flex flex-col bg-[#161b22]">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-sm font-medium text-gray-300">审核队列</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {pendingQueue.map((audit) => (
              <button
                key={audit.id}
                onClick={() => setSelectedAudit(audit)}
                className={cn(
                  "w-full p-4 text-left border-b border-gray-800 transition-colors",
                  selectedAudit?.id === audit.id
                    ? "bg-primary/10 border-l-2 border-l-primary"
                    : "hover:bg-gray-800/50"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-medium text-sm text-gray-200 line-clamp-1">
                    {audit.taskTitle}
                  </p>
                  <Badge variant="outline" className="shrink-0 text-xs border-yellow-500/50 text-yellow-500">
                    待审
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <User className="h-3 w-3" />
                  <span>{audit.submitter}</span>
                  <LevelBadge level={audit.submitterLevel} size="sm" showTooltip={false} />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FileStack className="h-3 w-3" />
                    {audit.caseCount} 案例
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {audit.submittedAt.split(" ")[1]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>
        
        {/* 中央：提交预览 */}
        <main className="flex-1 flex flex-col">
          {selectedAudit ? (
            <>
              {/* 工具栏 */}
              <div className="h-12 border-b border-gray-800 flex items-center justify-between px-4 bg-[#161b22]">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAnnotations(!showAnnotations)}
                    className={cn(
                      "text-gray-400",
                      showAnnotations && "text-primary"
                    )}
                  >
                    {showAnnotations ? (
                      <Eye className="h-4 w-4 mr-2" />
                    ) : (
                      <EyeOff className="h-4 w-4 mr-2" />
                    )}
                    {showAnnotations ? "隐藏标注" : "显示标注"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    对比原图
                  </Button>
                </div>
                <span className="text-xs text-gray-500 font-mono">
                  案例 1 / {selectedAudit.caseCount}
                </span>
              </div>
              
              {/* 影像预览区 */}
              <div className="flex-1 p-4">
                <div className="relative w-full h-full bg-[#0a0a0a] rounded-lg overflow-hidden">
                  {/* 模拟影像 */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[600px] max-h-[600px] aspect-square">
                      <div className="absolute inset-0 rounded-full bg-gradient-radial from-gray-600 via-gray-700 to-gray-800" />
                      <div className="absolute inset-[15%] rounded-full bg-gradient-radial from-gray-500 via-gray-600 to-gray-700 opacity-80" />
                      <div className="absolute inset-[35%] rounded-full bg-gradient-radial from-gray-400 via-gray-500 to-gray-600 opacity-60" />
                      <div className="absolute top-[25%] left-[20%] w-[25%] h-[40%] rounded-[40%] bg-gray-900/50" />
                      <div className="absolute top-[25%] right-[20%] w-[25%] h-[40%] rounded-[40%] bg-gray-900/50" />
                    </div>
                  </div>
                  
                  {/* 标注叠加层 */}
                  {showAnnotations && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {mockAnnotations.map((ann) => (
                        ann.type === "rectangle" ? (
                          <g key={ann.id}>
                            <rect
                              x={`${ann.x}%`}
                              y={`${ann.y}%`}
                              width={`${ann.width}%`}
                              height={`${ann.height}%`}
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <text
                              x={`${ann.x}%`}
                              y={`${ann.y - 1}%`}
                              fill="#22c55e"
                              fontSize="12"
                            >
                              {ann.label}
                            </text>
                          </g>
                        ) : (
                          <g key={ann.id}>
                            <ellipse
                              cx={`${ann.x + ann.width / 2}%`}
                              cy={`${ann.y + ann.height / 2}%`}
                              rx={`${ann.width / 2}%`}
                              ry={`${ann.height / 2}%`}
                              fill="none"
                              stroke="#eab308"
                              strokeWidth="2"
                            />
                            <text
                              x={`${ann.x}%`}
                              y={`${ann.y - 1}%`}
                              fill="#eab308"
                              fontSize="12"
                            >
                              {ann.label}
                            </text>
                          </g>
                        )
                      ))}
                    </svg>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">选择一个待审核项开始审核</p>
            </div>
          )}
        </main>
        
        {/* 右侧：审核决策面板 */}
        {selectedAudit && (
          <aside className="w-80 border-l border-gray-800 bg-[#161b22] flex flex-col">
            {/* 提交信息 */}
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-sm font-medium text-gray-300 mb-4">提交信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">任务</span>
                  <span className="text-gray-300">{selectedAudit.taskTitle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">提交人</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">{selectedAudit.submitter}</span>
                    <LevelBadge level={selectedAudit.submitterLevel} size="sm" showTooltip={false} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">案例数</span>
                  <span className="text-gray-300 font-mono">{selectedAudit.caseCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">涉及金额</span>
                  <span className="text-yellow-500 font-mono">{selectedAudit.totalReward} 积分</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">提交时间</span>
                  <span className="text-gray-400 text-xs">{selectedAudit.submittedAt}</span>
                </div>
              </div>
            </div>
            
            {/* 后果预览 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <h3 className="text-sm font-medium text-gray-300">账本变化预览</h3>
              <AuditConsequencePanel audit={selectedAudit} action="approve" />
              <AuditConsequencePanel audit={selectedAudit} action="reject" />
            </div>
            
            {/* 决策按钮 */}
            <div className="p-4 border-t border-gray-800 space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleAction("approve")}
              >
                <Check className="h-4 w-4 mr-2" />
                批准
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={() => handleAction("reject")}
              >
                <X className="h-4 w-4 mr-2" />
                驳回
              </Button>
            </div>
          </aside>
        )}
      </div>
      
      {/* 确认对话框 */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <DialogContent className="bg-[#161b22] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {confirmDialog.action === "approve" ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  确认批准
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  确认驳回
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {confirmDialog.action === "approve"
                ? "批准后，标注者的审查中收益将转为可用余额，此操作不可撤销。"
                : "驳回后，标注者的审查中收益将被取消，需重新提交。"}
            </DialogDescription>
          </DialogHeader>
          
          {confirmDialog.action === "reject" && (
            <div className="space-y-2">
              <Label className="text-gray-300">驳回原因（必填）</Label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="请说明驳回原因，帮助标注者改进..."
                className="bg-gray-900 border-gray-700 text-gray-300 placeholder:text-gray-600"
              />
            </div>
          )}
          
          {selectedAudit && (
            <div className="py-2">
              <AuditConsequencePanel audit={selectedAudit} action={confirmDialog.action} />
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
              className="text-gray-400"
            >
              取消
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={processing || (confirmDialog.action === "reject" && !rejectReason.trim())}
              className={cn(
                confirmDialog.action === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              )}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : confirmDialog.action === "approve" ? (
                "确认批准"
              ) : (
                "确认驳回"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
