"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  Circle,
  Coins,
  Loader2,
  MessageSquare,
  Minus,
  MousePointer2,
  Move,
  Plus,
  RotateCcw,
  Send,
  Square,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 模拟任务数据
const mockTask = {
  id: "task-001",
  title: "肺结节CT影像标注",
  publisher: "协和医院",
  totalCases: 50,
  completedCases: 23,
  pricePerCase: 4.8,
}

// 模拟案例列表
const mockCases = Array.from({ length: 50 }, (_, i) => ({
  id: `case-${String(i + 1).padStart(3, "0")}`,
  status: i < 23 ? "completed" : i === 23 ? "current" : "pending",
  thumbnail: `/api/placeholder/80/80`,
}))

// 标注工具配置
const annotationTools = [
  { id: "select", icon: MousePointer2, label: "选择", shortcut: "V" },
  { id: "rectangle", icon: Square, label: "矩形框选", shortcut: "R" },
  { id: "circle", icon: Circle, label: "圆形标注", shortcut: "C" },
  { id: "pan", icon: Move, label: "平移", shortcut: "H" },
]

// 影像查看器组件
function ImagingViewer({
  currentCase,
  zoom,
  brightness,
  contrast,
  annotations,
  activeTool,
  onAddAnnotation,
}: {
  currentCase: typeof mockCases[0]
  zoom: number
  brightness: number
  contrast: number
  annotations: Array<{ id: string; type: string; x: number; y: number; width: number; height: number }>
  activeTool: string
  onAddAnnotation: (annotation: { type: string; x: number; y: number; width: number; height: number }) => void
}) {
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === "rectangle" || activeTool === "circle") {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      onAddAnnotation({
        type: activeTool,
        x: x - 10,
        y: y - 10,
        width: 20,
        height: 20,
      })
    }
  }
  
  return (
    <div 
      className="relative w-full h-full bg-[#0a0a0a] rounded-lg overflow-hidden cursor-crosshair"
      onClick={handleCanvasClick}
    >
      {/* 模拟影像 */}
      <div 
        className="absolute inset-4 flex items-center justify-center"
        style={{
          transform: `scale(${zoom / 100})`,
          filter: `brightness(${brightness / 100}) contrast(${contrast / 100})`,
        }}
      >
        {/* 模拟CT影像 - 用渐变和形状代替 */}
        <div className="relative w-full h-full max-w-[600px] max-h-[600px] aspect-square">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-gray-600 via-gray-700 to-gray-800" />
          <div className="absolute inset-[15%] rounded-full bg-gradient-radial from-gray-500 via-gray-600 to-gray-700 opacity-80" />
          <div className="absolute inset-[35%] rounded-full bg-gradient-radial from-gray-400 via-gray-500 to-gray-600 opacity-60" />
          {/* 模拟肺部轮廓 */}
          <div className="absolute top-[25%] left-[20%] w-[25%] h-[40%] rounded-[40%] bg-gray-900/50" />
          <div className="absolute top-[25%] right-[20%] w-[25%] h-[40%] rounded-[40%] bg-gray-900/50" />
          {/* 模拟结节标记位置 */}
          <div className="absolute top-[35%] left-[30%] w-3 h-3 rounded-full bg-yellow-500/50 animate-pulse" />
        </div>
      </div>
      
      {/* 标注叠加层 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {annotations.map((ann) => (
          ann.type === "rectangle" ? (
            <rect
              key={ann.id}
              x={`${ann.x}%`}
              y={`${ann.y}%`}
              width={`${ann.width}%`}
              height={`${ann.height}%`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              className="animate-in fade-in"
            />
          ) : (
            <ellipse
              key={ann.id}
              cx={`${ann.x + ann.width / 2}%`}
              cy={`${ann.y + ann.height / 2}%`}
              rx={`${ann.width / 2}%`}
              ry={`${ann.height / 2}%`}
              fill="none"
              stroke="#eab308"
              strokeWidth="2"
              className="animate-in fade-in"
            />
          )
        ))}
      </svg>
      
      {/* 案例ID水印 */}
      <div className="absolute top-4 left-4 text-xs text-gray-500 font-mono">
        {currentCase.id}
      </div>
      
      {/* 缩放比例指示 */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono">
        {zoom}%
      </div>
    </div>
  )
}

// 标注工具栏组件
function AnnotationToolbar({
  activeTool,
  onToolChange,
  zoom,
  onZoomChange,
  brightness,
  onBrightnessChange,
  contrast,
  onContrastChange,
  onReset,
}: {
  activeTool: string
  onToolChange: (tool: string) => void
  zoom: number
  onZoomChange: (zoom: number) => void
  brightness: number
  onBrightnessChange: (brightness: number) => void
  contrast: number
  onContrastChange: (contrast: number) => void
  onReset: () => void
}) {
  return (
    <div className="space-y-6 p-4">
      {/* 标注工具 */}
      <div>
        <h3 className="text-xs font-medium text-gray-400 mb-3">标注工具</h3>
        <div className="grid grid-cols-2 gap-2">
          {annotationTools.map((tool) => (
            <TooltipProvider key={tool.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTool === tool.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onToolChange(tool.id)}
                    className={cn(
                      "h-10 justify-start gap-2",
                      activeTool === tool.id 
                        ? "bg-primary text-primary-foreground" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    )}
                  >
                    <tool.icon className="h-4 w-4" />
                    <span className="text-xs">{tool.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{tool.label} ({tool.shortcut})</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* 缩放控制 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-gray-400">缩放</h3>
          <span className="text-xs text-gray-500 font-mono">{zoom}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={() => onZoomChange(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Slider
            value={[zoom]}
            onValueChange={([v]) => onZoomChange(v)}
            min={50}
            max={200}
            step={10}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* 窗宽窗位 */}
      <div>
        <h3 className="text-xs font-medium text-gray-400 mb-3">窗宽窗位</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">亮度</span>
              <span className="text-xs text-gray-500 font-mono">{brightness}</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={([v]) => onBrightnessChange(v)}
              min={50}
              max={150}
              step={5}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">对比度</span>
              <span className="text-xs text-gray-500 font-mono">{contrast}</span>
            </div>
            <Slider
              value={[contrast]}
              onValueChange={([v]) => onContrastChange(v)}
              min={50}
              max={150}
              step={5}
            />
          </div>
        </div>
      </div>
      
      {/* 重置按钮 */}
      <Button
        variant="ghost"
        size="sm"
        className="w-full text-gray-400 hover:text-white"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        重置视图
      </Button>
      
      {/* 备注 */}
      <div>
        <h3 className="text-xs font-medium text-gray-400 mb-2">备注</h3>
        <Textarea
          placeholder="添加备注..."
          className="bg-gray-900 border-gray-700 text-gray-300 placeholder:text-gray-600 text-sm min-h-[80px]"
        />
      </div>
    </div>
  )
}

export default function AnnotationWorkspacePage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(23)
  const [activeTool, setActiveTool] = useState("select")
  const [zoom, setZoom] = useState(100)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [annotations, setAnnotations] = useState<Array<{
    id: string
    type: string
    x: number
    y: number
    width: number
    height: number
  }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  
  const currentCase = mockCases[currentCaseIndex]
  const completedCount = mockCases.filter(c => c.status === "completed").length
  const pendingIncome = (completedCount + 1) * mockTask.pricePerCase
  
  const handleAddAnnotation = (annotation: Omit<typeof annotations[0], "id">) => {
    setAnnotations(prev => [...prev, { ...annotation, id: `ann-${Date.now()}` }])
  }
  
  const handleMarkComplete = () => {
    // 标记当前案例完成并跳转到下一个
    if (currentCaseIndex < mockCases.length - 1) {
      setCurrentCaseIndex(prev => prev + 1)
      setAnnotations([])
    }
  }
  
  const handleReset = () => {
    setZoom(100)
    setBrightness(100)
    setContrast(100)
  }
  
  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSubmitConfirm(true)
    }, 2000)
  }
  
  // 提交成功确认
  if (showSubmitConfirm) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center p-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">提交成功！</h2>
          <p className="text-gray-400 mt-2">
            已提交 {completedCount + 1} 个案例，等待 Lv5+ 专家审核
          </p>
          <p className="text-gray-500 mt-1 font-mono">
            预计待审收益: +{pendingIncome.toFixed(1)} 积分
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild>
              <Link href="/me">
                返回工作台
              </Link>
            </Button>
            <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
              <Link href="/tasks">
                查看更多任务
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
            <h1 className="text-sm font-medium">{mockTask.title}</h1>
            <p className="text-xs text-gray-500">{mockTask.publisher}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-gray-700 text-gray-400">
            {currentCase.id}
          </Badge>
        </div>
      </header>
      
      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：任务信息 + 案例列表 */}
        <aside className="w-60 border-r border-gray-800 flex flex-col bg-[#161b22]">
          {/* 进度卡片 */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">标注进度</span>
              <span className="text-xs font-mono text-gray-300">
                {completedCount}/{mockTask.totalCases}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${(completedCount / mockTask.totalCases) * 100}%` }}
              />
            </div>
          </div>
          
          {/* 案例列表 */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-3 gap-1">
              {mockCases.map((caseItem, index) => (
                <button
                  key={caseItem.id}
                  onClick={() => { setCurrentCaseIndex(index); setAnnotations([]) }}
                  className={cn(
                    "aspect-square rounded border text-xs font-mono flex items-center justify-center transition-colors",
                    index === currentCaseIndex
                      ? "border-primary bg-primary/20 text-primary"
                      : caseItem.status === "completed"
                      ? "border-green-500/30 bg-green-500/10 text-green-500"
                      : "border-gray-700 bg-gray-800/50 text-gray-500 hover:border-gray-600"
                  )}
                >
                  {caseItem.status === "completed" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    index + 1
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>
        
        {/* 中央：影像查看器 */}
        <main className="flex-1 p-4">
          <ImagingViewer
            currentCase={currentCase}
            zoom={zoom}
            brightness={brightness}
            contrast={contrast}
            annotations={annotations}
            activeTool={activeTool}
            onAddAnnotation={handleAddAnnotation}
          />
        </main>
        
        {/* 右侧：标注工具栏 */}
        <aside className="w-64 border-l border-gray-800 bg-[#161b22] overflow-y-auto">
          <AnnotationToolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            zoom={zoom}
            onZoomChange={setZoom}
            brightness={brightness}
            onBrightnessChange={setBrightness}
            contrast={contrast}
            onContrastChange={setContrast}
            onReset={handleReset}
          />
          
          {/* 标记完成按钮 */}
          <div className="p-4 border-t border-gray-800">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleMarkComplete}
              disabled={currentCaseIndex >= mockCases.length - 1}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              标记完成并下一个
            </Button>
          </div>
        </aside>
      </div>
      
      {/* 底部提交栏 */}
      <footer className="h-16 border-t border-gray-800 bg-[#161b22] flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {/* 进度 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">已完成</span>
            <span className="text-lg font-mono font-medium text-white">
              {completedCount}
            </span>
            <span className="text-sm text-gray-500">/ {mockTask.totalCases}</span>
          </div>
          
          <div className="h-8 w-px bg-gray-800" />
          
          {/* 预计收益 */}
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-400">本批预计待审收益</span>
            <span className="text-lg font-mono font-medium text-yellow-500">
              +{pendingIncome.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">积分</span>
          </div>
        </div>
        
        {/* 导航和提交 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setCurrentCaseIndex(Math.max(0, currentCaseIndex - 1))}
              disabled={currentCaseIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400 font-mono min-w-[60px] text-center">
              {currentCaseIndex + 1} / {mockTask.totalCases}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setCurrentCaseIndex(Math.min(mockCases.length - 1, currentCaseIndex + 1))}
              disabled={currentCaseIndex === mockCases.length - 1}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={completedCount === 0 || isSubmitting}
            className="bg-primary hover:bg-primary/90 min-w-[140px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                提交中...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                提交审核
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
