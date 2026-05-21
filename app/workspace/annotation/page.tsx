"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Square,
  Circle,
  Pencil,
  CheckCircle2,
  Clock,
  Coins,
  Send,
  Loader2,
  X,
  Info,
  Image as ImageIcon,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 模拟任务信息
const mockTask = {
  id: "T001",
  title: "肺结节良恶性标注",
  totalCases: 100,
  completedCases: 45,
  pricePerCase: 4,
  deadline: "2026-06-15",
}

// 模拟案例列表
const mockCases = Array.from({ length: 100 }, (_, i) => ({
  id: `CASE-${String(i + 1).padStart(3, "0")}`,
  thumbnail: null,
  status: i < 45 ? "completed" : i === 45 ? "current" : "pending",
}))

// 标注工具
const annotationTools = [
  { id: "select", icon: Square, label: "框选" },
  { id: "circle", icon: Circle, label: "圆形" },
  { id: "freehand", icon: Pencil, label: "自由绘制" },
  { id: "done", icon: CheckCircle2, label: "标记完成" },
]

export default function AnnotationWorkspacePage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(45)
  const [selectedTool, setSelectedTool] = useState("select")
  const [zoom, setZoom] = useState(100)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  const currentCase = mockCases[currentCaseIndex]
  const pendingIncome = mockTask.completedCases * mockTask.pricePerCase

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex(prev => prev - 1)
    }
  }

  const handleNextCase = () => {
    if (currentCaseIndex < mockCases.length - 1) {
      setCurrentCaseIndex(prev => prev + 1)
    }
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const handleResetZoom = () => {
    setZoom(100)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSubmitConfirm(false)
      // 模拟提交成功
    }, 1500)
  }

  return (
    <div className="h-screen flex flex-col bg-[#0D1117] text-[#E6EDF3]">
      {/* 顶部栏 */}
      <header className="h-14 border-b border-[#30363D] bg-[#161B22] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/tasks" 
            className="flex items-center gap-1 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            返回任务
          </Link>
          <div className="h-4 w-px bg-[#30363D]" />
          <h1 className="font-medium">{mockTask.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-[#8B949E]" />
            <span className="text-[#8B949E]">截止</span>
            <span>{mockTask.deadline}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 左侧边栏 - 任务信息和案例列表 */}
        <aside className="w-60 border-r border-[#30363D] bg-[#161B22] flex flex-col">
          {/* 任务进度 */}
          <div className="p-4 border-b border-[#30363D]">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#8B949E]">标注进度</span>
              <span className="font-mono">
                {mockTask.completedCases}/{mockTask.totalCases}
              </span>
            </div>
            <Progress 
              value={(mockTask.completedCases / mockTask.totalCases) * 100} 
              className="h-2 bg-[#21262D]"
            />
            <p className="text-xs text-[#8B949E] mt-2">
              还剩 {mockTask.totalCases - mockTask.completedCases} 例待标注
            </p>
          </div>

          {/* 案例列表 */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-4 py-2 text-sm text-[#8B949E]">案例列表</div>
            <ScrollArea className="flex-1">
              <div className="grid grid-cols-3 gap-2 p-4 pt-0">
                {mockCases.map((caseItem, index) => (
                  <button
                    key={caseItem.id}
                    onClick={() => setCurrentCaseIndex(index)}
                    className={cn(
                      "aspect-square rounded border flex items-center justify-center text-xs transition-colors",
                      caseItem.status === "completed"
                        ? "border-[#2EA88A] bg-[#2EA88A]/10 text-[#2EA88A]"
                        : caseItem.status === "current"
                        ? "border-[#4A9AD8] bg-[#4A9AD8]/20 text-[#4A9AD8] ring-2 ring-[#4A9AD8]"
                        : "border-[#30363D] bg-[#21262D] text-[#8B949E] hover:border-[#8B949E]"
                    )}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* 中央 - 影像查看器 */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* 工具栏 */}
          <div className="h-12 border-b border-[#30363D] bg-[#161B22] flex items-center justify-between px-4">
            <div className="flex items-center gap-1">
              {annotationTools.map((tool) => (
                <Button
                  key={tool.id}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 px-3 text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]",
                    selectedTool === tool.id && "bg-[#21262D] text-[#4A9AD8]"
                  )}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <tool.icon className="h-4 w-4 mr-1.5" />
                  {tool.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-mono w-12 text-center">{zoom}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
                onClick={handleResetZoom}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 影像查看区域 */}
          <div className="flex-1 relative bg-[#0D1117] flex items-center justify-center overflow-hidden">
            {/* 模拟影像 */}
            <div 
              className="relative border border-[#30363D] rounded-lg bg-[#161B22] flex items-center justify-center"
              style={{ 
                width: `${480 * zoom / 100}px`, 
                height: `${480 * zoom / 100}px`,
                transition: "all 0.2s ease"
              }}
            >
              <div className="text-center text-[#8B949E]">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-sm">影像查看区域</p>
                <p className="text-xs mt-1">案例 {currentCase.id}</p>
              </div>
              
              {/* 模拟标注框 */}
              {currentCase.status === "current" && (
                <div className="absolute top-1/3 left-1/3 w-24 h-24 border-2 border-[#2EA88A] rounded bg-[#2EA88A]/10">
                  <div className="absolute -top-6 left-0 text-xs text-[#2EA88A] bg-[#2EA88A]/20 px-2 py-0.5 rounded">
                    结节 #1
                  </div>
                </div>
              )}
            </div>

            {/* 案例导航 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#161B22] px-4 py-2 rounded-lg border border-[#30363D]">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
                onClick={handlePrevCase}
                disabled={currentCaseIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                上一例
              </Button>
              <span className="text-sm font-mono">
                {currentCaseIndex + 1} / {mockCases.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
                onClick={handleNextCase}
                disabled={currentCaseIndex === mockCases.length - 1}
              >
                下一例
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </main>

        {/* 右侧边栏 - 标注工具和属性 */}
        <aside className="w-72 border-l border-[#30363D] bg-[#161B22] flex flex-col">
          {/* 当前案例信息 */}
          <div className="p-4 border-b border-[#30363D]">
            <h3 className="font-medium mb-3">当前案例</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#8B949E]">案例ID</span>
                <span className="font-mono">{currentCase.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B949E]">状态</span>
                <Badge 
                  className={cn(
                    "text-xs",
                    currentCase.status === "completed"
                      ? "bg-[#2EA88A]/10 text-[#2EA88A] border-[#2EA88A]/30"
                      : "bg-[#4A9AD8]/10 text-[#4A9AD8] border-[#4A9AD8]/30"
                  )}
                >
                  {currentCase.status === "completed" ? "已完成" : "进行中"}
                </Badge>
              </div>
            </div>
          </div>

          {/* 标注属性 */}
          <div className="p-4 border-b border-[#30363D]">
            <h3 className="font-medium mb-3">标注属性</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-[#8B949E] block mb-1.5">结节分类</label>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-[#30363D] bg-[#21262D] text-[#E6EDF3] hover:bg-[#30363D]"
                  >
                    良性
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-[#30363D] bg-[#21262D] text-[#E6EDF3] hover:bg-[#30363D]"
                  >
                    恶性
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#8B949E] block mb-1.5">置信度</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <Button
                      key={level}
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 border-[#30363D] bg-[#21262D] text-[#E6EDF3] hover:bg-[#30363D]"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 备注 */}
          <div className="p-4 flex-1">
            <h3 className="font-medium mb-3">备注</h3>
            <Textarea
              placeholder="添加备注信息..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-24 bg-[#21262D] border-[#30363D] text-[#E6EDF3] placeholder:text-[#8B949E] resize-none"
            />
          </div>
        </aside>
      </div>

      {/* 底部提交栏 */}
      <footer className="h-16 border-t border-[#30363D] bg-[#161B22] flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8B949E]">已完成</span>
            <span className="font-mono font-bold text-lg text-[#2EA88A]">
              {mockTask.completedCases}
            </span>
            <span className="text-sm text-[#8B949E]">例</span>
          </div>
          <div className="h-8 w-px bg-[#30363D]" />
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-[#E3B341]" />
            <span className="text-sm text-[#8B949E]">预计收益</span>
            <span className="font-mono font-bold text-lg text-[#E3B341]">
              +{pendingIncome.toLocaleString()}
            </span>
            <span className="text-xs text-[#8B949E]">审查中</span>
          </div>
        </div>
        <Button
          className="bg-[#2EA88A] hover:bg-[#238636] text-white h-10 px-6"
          onClick={() => setShowSubmitConfirm(true)}
        >
          <Send className="h-4 w-4 mr-2" />
          提交审核
        </Button>
      </footer>

      {/* 提交确认弹窗 */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 bg-[#161B22] border-[#30363D]">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#E6EDF3]">确认提交审核</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D]"
                  onClick={() => setShowSubmitConfirm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-[#30363D]">
                  <span className="text-[#8B949E]">已完成案例</span>
                  <span className="font-mono text-[#E6EDF3]">{mockTask.completedCases} 例</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[#30363D]">
                  <span className="text-[#8B949E]">预计收益</span>
                  <span className="font-mono text-[#E3B341]">+{pendingIncome.toLocaleString()} 积分</span>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-[#21262D] border border-[#30363D]">
                  <Info className="h-4 w-4 text-[#8B949E] flex-shrink-0 mt-0.5" />
                  <p className="text-[#8B949E]">
                    提交后，您的标注将进入「审查中收益」状态，等待 Lv5+ 专家审核。
                    审核通过后收益将转入可用余额。
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 border-[#30363D] text-[#E6EDF3] hover:bg-[#21262D]"
                  onClick={() => setShowSubmitConfirm(false)}
                >
                  取消
                </Button>
                <Button
                  className="flex-1 bg-[#2EA88A] hover:bg-[#238636] text-white"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    "确认提交"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
