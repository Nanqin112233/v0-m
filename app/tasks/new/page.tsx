"use client"

import { useState, useMemo } from "react"
import { Header, Footer, LevelBadge } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertCircle,
  ArrowLeft,
  Calculator,
  CheckCircle2,
  Coins,
  Info,
  Loader2,
  Lock,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 模拟用户数据（机构账号）
const mockUser = {
  name: "协和医院",
  email: "data@pumch.cn",
  avatar: undefined,
  level: 6,
  verified: true,
}

const mockWallet = {
  balance: 500000,
  locked: 85000,
  pending: 12500,
}

// 模态选项
const modalityOptions = [
  { value: "CT", label: "CT" },
  { value: "MRI", label: "MRI" },
  { value: "X-ray", label: "X-ray" },
  { value: "病理", label: "病理" },
  { value: "超声", label: "超声" },
  { value: "内镜", label: "内镜" },
]

// 科室选项
const specialtyOptions = [
  { value: "胸外科", label: "胸外科" },
  { value: "神经内科", label: "神经内科" },
  { value: "眼科", label: "眼科" },
  { value: "骨科", label: "骨科" },
  { value: "消化内科", label: "消化内科" },
  { value: "心内科", label: "心内科" },
]

// 表单数据类型
interface TaskFormData {
  title: string
  description: string
  modality: string
  specialty: string
  deadline: string
  maxParticipants: number
  minLevel: number
  totalCases: number
  pricePerCase: number
}

// 锁仓计算器组件
function LockupCalculator({
  formData,
  wallet,
}: {
  formData: TaskFormData
  wallet: typeof mockWallet
}) {
  // 计算锁仓金额：总例数 × 单例基础价 × 1.05（含5%平台服务费）
  const baseLockup = formData.totalCases * formData.pricePerCase
  const serviceFee = baseLockup * 0.05
  const totalLockup = baseLockup + serviceFee
  
  const balanceAfter = wallet.balance - totalLockup
  const isInsufficientBalance = totalLockup > wallet.balance
  
  return (
    <div className="space-y-6">
      {/* 锁仓计算 */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            锁仓计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">总例数</span>
              <span className="font-mono">{formData.totalCases.toLocaleString()} 例</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">单例基础价</span>
              <span className="font-mono">{formData.pricePerCase} 积分/例</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">标注报酬小计</span>
              <span className="font-mono">{baseLockup.toLocaleString()} 积分</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>平台服务费 (5%)</span>
              <span className="font-mono">+{serviceFee.toLocaleString()} 积分</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between font-medium">
                <span>需锁仓金额</span>
                <span className={cn(
                  "font-mono text-lg",
                  isInsufficientBalance ? "text-destructive" : "text-primary"
                )}>
                  {totalLockup.toLocaleString()} 积分
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 钱包余额卡片 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            钱包余额
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">当前可用余额</span>
              <span className="font-mono font-medium">{wallet.balance.toLocaleString()} 积分</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">当前锁仓资金</span>
              <span className="font-mono">{wallet.locked.toLocaleString()} 积分</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">本次锁仓</span>
              <span className={cn(
                "font-mono",
                isInsufficientBalance ? "text-destructive" : "text-warning"
              )}>
                -{totalLockup.toLocaleString()} 积分
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between font-medium">
                <span>发布后预计余额</span>
                <span className={cn(
                  "font-mono",
                  isInsufficientBalance ? "text-destructive" : "text-foreground"
                )}>
                  {isInsufficientBalance ? "余额不足" : `${balanceAfter.toLocaleString()} 积分`}
                </span>
              </div>
            </div>
          </div>
          
          {/* 余额不足提示 */}
          {isInsufficientBalance && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">可用余额不足</p>
                <p className="text-xs mt-0.5">
                  还需 {(totalLockup - wallet.balance).toLocaleString()} 积分
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 分成说明 */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="flex items-start gap-3 py-4">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">收益分成说明</p>
            <ul className="mt-1 text-muted-foreground space-y-1 text-xs">
              <li>Lv1-Lv4 标注者: 60% 收益</li>
              <li>Lv5-Lv8 标注者: 80% 收益</li>
              <li>Lv9 标注者: 100% 收益</li>
              <li>平台服务费: 5%</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TaskPublishPage() {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    modality: "",
    specialty: "",
    deadline: "",
    maxParticipants: 50,
    minLevel: 1,
    totalCases: 500,
    pricePerCase: 5,
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  
  // 计算锁仓金额
  const totalLockup = useMemo(() => {
    const baseLockup = formData.totalCases * formData.pricePerCase
    return baseLockup * 1.05
  }, [formData.totalCases, formData.pricePerCase])
  
  const isInsufficientBalance = totalLockup > mockWallet.balance
  
  // 表单验证
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = "请输入任务标题"
    if (!formData.description.trim()) newErrors.description = "请输入任务描述"
    if (!formData.modality) newErrors.modality = "请选择影像模态"
    if (!formData.specialty) newErrors.specialty = "请选择科室"
    if (!formData.deadline) newErrors.deadline = "请选择截止日期"
    if (formData.maxParticipants < 1) newErrors.maxParticipants = "参与人数至少为1"
    if (formData.totalCases < 1) newErrors.totalCases = "总例数至少为1"
    if (formData.pricePerCase <= 0) newErrors.pricePerCase = "单例价格必须大于0"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handlePublish = () => {
    if (!validate()) return
    if (isInsufficientBalance) return
    
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      setPublished(true)
    }, 2000)
  }
  
  const updateField = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }))
    }
  }
  
  // 发布成功页面
  if (published) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header isLoggedIn={true} user={mockUser} wallet={mockWallet} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12 px-4">
            <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground">任务发布成功！</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              您的任务已成功发布到任务广场，已从钱包锁仓 {totalLockup.toLocaleString()} 积分
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild>
                <Link href="/tasks">
                  返回任务广场
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/me/assets">
                  查看钱包
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={mockWallet}
        notificationCount={2}
      />
      
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 返回链接 */}
          <Link
            href="/tasks"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回任务广场
          </Link>
          
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">发布任务</h1>
            <p className="text-muted-foreground mt-1">创建标注任务，设置报酬并锁仓积分</p>
          </div>
          
          {/* 两栏布局 */}
          <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
            {/* 左侧：任务表单 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">任务信息</CardTitle>
                <CardDescription>填写标注任务的详细信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 任务标题 */}
                <div className="space-y-2">
                  <Label htmlFor="title">任务标题 *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="例如：肺结节CT影像标注"
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>
                
                {/* 任务描述 */}
                <div className="space-y-2">
                  <Label htmlFor="description">任务描述 *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="详细描述标注要求、标准和注意事项..."
                    rows={4}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                </div>
                
                {/* 模态和科室 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>影像模态 *</Label>
                    <Select
                      value={formData.modality}
                      onValueChange={(v) => updateField("modality", v)}
                    >
                      <SelectTrigger className={errors.modality ? "border-destructive" : ""}>
                        <SelectValue placeholder="选择模态" />
                      </SelectTrigger>
                      <SelectContent>
                        {modalityOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.modality && <p className="text-xs text-destructive">{errors.modality}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>科室 *</Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(v) => updateField("specialty", v)}
                    >
                      <SelectTrigger className={errors.specialty ? "border-destructive" : ""}>
                        <SelectValue placeholder="选择科室" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialtyOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.specialty && <p className="text-xs text-destructive">{errors.specialty}</p>}
                  </div>
                </div>
                
                {/* 截止时间 */}
                <div className="space-y-2">
                  <Label htmlFor="deadline">截止日期 *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateField("deadline", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={errors.deadline ? "border-destructive" : ""}
                  />
                  {errors.deadline && <p className="text-xs text-destructive">{errors.deadline}</p>}
                </div>
                
                {/* 参与人数和最低等级 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">最大参与人数 *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      min="1"
                      value={formData.maxParticipants}
                      onChange={(e) => updateField("maxParticipants", parseInt(e.target.value) || 0)}
                      className={errors.maxParticipants ? "border-destructive" : ""}
                    />
                    {errors.maxParticipants && <p className="text-xs text-destructive">{errors.maxParticipants}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>最低等级要求 *</Label>
                    <Select
                      value={formData.minLevel.toString()}
                      onValueChange={(v) => updateField("minLevel", parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                          <SelectItem key={level} value={level.toString()}>
                            <div className="flex items-center gap-2">
                              <LevelBadge level={level} size="sm" showTooltip={false} />
                              <span>及以上</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* 总例数和单例价格 */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="totalCases">总例数 *</Label>
                    <Input
                      id="totalCases"
                      type="number"
                      min="1"
                      value={formData.totalCases}
                      onChange={(e) => updateField("totalCases", parseInt(e.target.value) || 0)}
                      className={errors.totalCases ? "border-destructive" : ""}
                    />
                    {errors.totalCases && <p className="text-xs text-destructive">{errors.totalCases}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pricePerCase">单例基础价（积分/例）*</Label>
                    <Input
                      id="pricePerCase"
                      type="number"
                      step="0.5"
                      min="0.1"
                      value={formData.pricePerCase}
                      onChange={(e) => updateField("pricePerCase", parseFloat(e.target.value) || 0)}
                      className={errors.pricePerCase ? "border-destructive" : ""}
                    />
                    {errors.pricePerCase && <p className="text-xs text-destructive">{errors.pricePerCase}</p>}
                  </div>
                </div>
                
                {/* V1沙箱提示 */}
                <Card className="bg-accent/50 border-accent">
                  <CardContent className="flex items-start gap-3 py-4">
                    <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">V1 沙箱说明</p>
                      <p className="text-muted-foreground mt-1">
                        当前为 V1 沙箱演示版本，积分锁仓为模拟操作，不涉及真实资金流转。
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 发布按钮 */}
                <div className="pt-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePublish}
                    disabled={publishing || isInsufficientBalance}
                  >
                    {publishing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        发布中...
                      </>
                    ) : isInsufficientBalance ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        余额不足，无法发布
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        确认发布并锁仓 {totalLockup.toLocaleString()} 积分
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* 右侧：锁仓计算器（粘性定位） */}
            <div className="lg:sticky lg:top-20 lg:h-fit">
              <LockupCalculator formData={formData} wallet={mockWallet} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
