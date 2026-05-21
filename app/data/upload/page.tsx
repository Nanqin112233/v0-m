"use client"

import { useState } from "react"
import { Header, Footer } from "@/components/m-platform"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Upload,
  FileStack,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Info,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// 模拟用户数据
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
  change: 12500,
}

// 步骤配置
const steps = [
  { id: 1, title: "选择数据", description: "上传或选择数据集" },
  { id: 2, title: "填写元数据", description: "完善数据集信息" },
  { id: 3, title: "预检验证", description: "检查数据合规性" },
  { id: 4, title: "发布确认", description: "确认并发布" },
]

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

// 系统/部位选项
const bodyPartOptions = [
  { value: "头部", label: "头部" },
  { value: "胸部", label: "胸部" },
  { value: "腹部", label: "腹部" },
  { value: "四肢", label: "四肢" },
  { value: "脊柱", label: "脊柱" },
  { value: "全身", label: "全身" },
]

// 预检项目
const precheckItems = [
  { id: "format", label: "文件格式验证", description: "DICOM/PNG/JPG格式检查" },
  { id: "privacy", label: "隐私脱敏检查", description: "检查患者隐私信息是否已脱敏" },
  { id: "quality", label: "图像质量检查", description: "检查图像清晰度和完整性" },
  { id: "metadata", label: "元数据完整性", description: "检查必填元数据字段" },
  { id: "duplicate", label: "重复数据检查", description: "检查是否存在重复样本" },
]

// 步骤指示器组件
function StepIndicator({ currentStep, steps }: { currentStep: number; steps: typeof steps }) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  currentStep > step.id
                    ? "border-success bg-success text-success-foreground"
                    : currentStep === step.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-sm font-medium",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-4 h-0.5 w-12 sm:w-20 lg:w-32",
                  currentStep > step.id ? "bg-success" : "bg-muted"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Step 1: 选择数据
function Step1Upload({
  onNext,
  formData,
  setFormData,
}: {
  onNext: () => void
  formData: FormData
  setFormData: (data: FormData) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  
  const handleMockUpload = () => {
    // 模拟上传
    setFormData({
      ...formData,
      uploadedFiles: ["sample_001.dcm", "sample_002.dcm", "...", "sample_500.dcm"],
      sampleCount: 500,
    })
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">选择数据</h2>
        <p className="text-muted-foreground mt-1">上传您的医学影像数据或选择已有数据集</p>
      </div>
      
      {/* 上传区域 */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted",
          formData.uploadedFiles.length > 0 ? "border-success bg-success/5" : ""
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleMockUpload() }}
      >
        {formData.uploadedFiles.length > 0 ? (
          <div className="space-y-4">
            <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
            <div>
              <p className="text-lg font-medium text-foreground">已选择 {formData.sampleCount} 个样本</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.uploadedFiles.slice(0, 3).join(", ")} 等文件
              </p>
            </div>
            <Button variant="outline" onClick={() => setFormData({ ...formData, uploadedFiles: [], sampleCount: 0 })}>
              重新选择
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <p className="text-lg font-medium text-foreground">拖拽文件到此处上传</p>
              <p className="text-sm text-muted-foreground mt-1">
                支持 DICOM, PNG, JPG 格式，单次最多 10,000 个文件
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button onClick={handleMockUpload}>
                <Upload className="h-4 w-4 mr-2" />
                选择文件
              </Button>
              <span className="text-muted-foreground">或</span>
              <Button variant="outline" onClick={handleMockUpload}>
                从已有数据集选择
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* 提示信息 */}
      <Card className="bg-accent/50 border-accent">
        <CardContent className="flex items-start gap-3 py-4">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">数据上传说明</p>
            <ul className="mt-1 text-muted-foreground space-y-1">
              <li>- 请确保数据已完成患者隐私脱敏处理</li>
              <li>- 建议使用 DICOM 标准格式以保留完整元数据</li>
              <li>- V1 版本为 Mock 上传，实际数据不会被存储</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {/* 下一步 */}
      <div className="flex justify-end pt-4">
        <Button onClick={onNext} disabled={formData.uploadedFiles.length === 0}>
          下一步
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Step 2: 填写元数据
function Step2Metadata({
  onNext,
  onPrev,
  formData,
  setFormData,
}: {
  onNext: () => void
  onPrev: () => void
  formData: FormData
  setFormData: (data: FormData) => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "请输入数据集名称"
    if (!formData.modality) newErrors.modality = "请选择影像模态"
    if (!formData.specialty) newErrors.specialty = "请选择科室"
    if (!formData.bodyPart) newErrors.bodyPart = "请选择部位"
    if (!formData.description.trim()) newErrors.description = "请输入数据集描述"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validate()) {
      onNext()
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">填写元数据</h2>
        <p className="text-muted-foreground mt-1">完善数据集的详细信息</p>
      </div>
      
      <div className="grid gap-6 max-w-2xl mx-auto">
        {/* 数据集名称 */}
        <div className="space-y-2">
          <Label htmlFor="name">数据集名称 *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="例如：胸部CT影像数据集"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        
        {/* 影像模态 */}
        <div className="space-y-2">
          <Label>影像模态 *</Label>
          <Select
            value={formData.modality}
            onValueChange={(v) => setFormData({ ...formData, modality: v })}
          >
            <SelectTrigger className={errors.modality ? "border-destructive" : ""}>
              <SelectValue placeholder="选择影像模态" />
            </SelectTrigger>
            <SelectContent>
              {modalityOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.modality && <p className="text-xs text-destructive">{errors.modality}</p>}
        </div>
        
        {/* 科室 */}
        <div className="space-y-2">
          <Label>科室 *</Label>
          <Select
            value={formData.specialty}
            onValueChange={(v) => setFormData({ ...formData, specialty: v })}
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
        
        {/* 部位 */}
        <div className="space-y-2">
          <Label>检查部位 *</Label>
          <Select
            value={formData.bodyPart}
            onValueChange={(v) => setFormData({ ...formData, bodyPart: v })}
          >
            <SelectTrigger className={errors.bodyPart ? "border-destructive" : ""}>
              <SelectValue placeholder="选择检查部位" />
            </SelectTrigger>
            <SelectContent>
              {bodyPartOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bodyPart && <p className="text-xs text-destructive">{errors.bodyPart}</p>}
        </div>
        
        {/* 样本数量（只读） */}
        <div className="space-y-2">
          <Label>样本数量</Label>
          <Input value={`${formData.sampleCount} 个样本`} disabled />
        </div>
        
        {/* 单例定价 */}
        <div className="space-y-2">
          <Label htmlFor="price">单例定价（积分/例）</Label>
          <Input
            id="price"
            type="number"
            step="0.1"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            placeholder="0.5"
          />
          <p className="text-xs text-muted-foreground">建议参考同类数据集定价</p>
        </div>
        
        {/* 描述 */}
        <div className="space-y-2">
          <Label htmlFor="description">数据集描述 *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="描述数据集的内容、来源、适用场景等..."
            rows={4}
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>
        
        {/* 特征标签 */}
        <div className="space-y-2">
          <Label htmlFor="tags">特征标签</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="用逗号分隔，例如：肺结节, 早期筛查, 高分辨率"
          />
        </div>
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          上一步
        </Button>
        <Button onClick={handleNext}>
          下一步
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Step 3: 预检验证
function Step3Precheck({
  onNext,
  onPrev,
}: {
  onNext: () => void
  onPrev: () => void
}) {
  const [checkStatus, setCheckStatus] = useState<"idle" | "checking" | "done">("idle")
  const [checkResults, setCheckResults] = useState<Record<string, "pending" | "pass" | "fail">>({})
  
  const startCheck = () => {
    setCheckStatus("checking")
    setCheckResults({})
    
    // 模拟预检过程
    let index = 0
    const interval = setInterval(() => {
      if (index < precheckItems.length) {
        setCheckResults(prev => ({
          ...prev,
          [precheckItems[index].id]: Math.random() > 0.1 ? "pass" : "fail"
        }))
        index++
      } else {
        clearInterval(interval)
        setCheckStatus("done")
      }
    }, 800)
  }
  
  const allPassed = checkStatus === "done" && Object.values(checkResults).every(r => r === "pass")
  const hasFailed = Object.values(checkResults).some(r => r === "fail")
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">预检验证</h2>
        <p className="text-muted-foreground mt-1">检查数据合规性和完整性</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-4">
        {/* 预检项目列表 */}
        {precheckItems.map((item) => {
          const status = checkResults[item.id]
          return (
            <Card key={item.id} className={cn(
              "transition-colors",
              status === "pass" && "border-success/50 bg-success/5",
              status === "fail" && "border-destructive/50 bg-destructive/5"
            )}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  {status === "pass" ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : status === "fail" ? (
                    <XCircle className="h-5 w-5 text-destructive" />
                  ) : checkStatus === "checking" && !status ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Badge
                  variant={status === "pass" ? "default" : status === "fail" ? "destructive" : "secondary"}
                  className={status === "pass" ? "bg-success" : ""}
                >
                  {status === "pass" ? "通过" : status === "fail" ? "失败" : "待检"}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
        
        {/* 开始预检按钮 */}
        {checkStatus === "idle" && (
          <div className="text-center pt-4">
            <Button onClick={startCheck} size="lg">
              开始预检
            </Button>
          </div>
        )}
        
        {/* 预检中状态 */}
        {checkStatus === "checking" && (
          <div className="text-center pt-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground mt-2">正在检查数据...</p>
          </div>
        )}
        
        {/* 预检失败提示 */}
        {checkStatus === "done" && hasFailed && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="flex items-start gap-3 py-4">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">预检未完全通过</p>
                <p className="text-sm text-muted-foreground mt-1">
                  请返回上一步修改数据后重新提交预检
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          上一步
        </Button>
        <Button onClick={onNext} disabled={!allPassed}>
          下一步
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Step 4: 发布确认
function Step4Publish({
  onPrev,
  formData,
}: {
  onPrev: () => void
  formData: FormData
}) {
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [agreed, setAgreed] = useState(false)
  
  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      setPublished(true)
    }, 2000)
  }
  
  if (published) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">发布成功！</h2>
        <p className="text-muted-foreground mt-2">
          您的数据集已成功发布到数据广场
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild>
            <Link href="/data">
              返回数据广场
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/data/ds-new`}>
              查看数据集
            </Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">发布确认</h2>
        <p className="text-muted-foreground mt-1">确认数据集信息并发布</p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* 数据集摘要 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">数据集摘要</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">名称</p>
                <p className="font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">模态</p>
                <p className="font-medium">{formData.modality}</p>
              </div>
              <div>
                <p className="text-muted-foreground">科室</p>
                <p className="font-medium">{formData.specialty}</p>
              </div>
              <div>
                <p className="text-muted-foreground">部位</p>
                <p className="font-medium">{formData.bodyPart}</p>
              </div>
              <div>
                <p className="text-muted-foreground">样本数量</p>
                <p className="font-medium font-mono">{formData.sampleCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">单例定价</p>
                <p className="font-medium font-mono">{formData.price} 积分/例</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">描述</p>
              <p className="text-sm mt-1">{formData.description}</p>
            </div>
            {formData.tags && (
              <div>
                <p className="text-muted-foreground text-sm mb-2">标签</p>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(",").map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag.trim()}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* 协议确认 */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
          />
          <Label htmlFor="agree" className="text-sm text-muted-foreground font-normal cursor-pointer">
            我已阅读并同意《数据发布协议》，确认数据已完成患者隐私脱敏，且有权发布该数据集
          </Label>
        </div>
        
        {/* V1沙箱提示 */}
        <Card className="bg-accent/50 border-accent">
          <CardContent className="flex items-start gap-3 py-4">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">V1 沙箱说明</p>
              <p className="text-muted-foreground mt-1">
                当前为 V1 沙箱演示版本，数据发布为模拟操作，实际数据不会被存储或共享。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          上一步
        </Button>
        <Button onClick={handlePublish} disabled={!agreed || publishing}>
          {publishing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              发布中...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              确认发布
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// 表单数据类型
interface FormData {
  uploadedFiles: string[]
  sampleCount: number
  name: string
  modality: string
  specialty: string
  bodyPart: string
  price: number
  description: string
  tags: string
}

export default function DataUploadPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    uploadedFiles: [],
    sampleCount: 0,
    name: "",
    modality: "",
    specialty: "",
    bodyPart: "",
    price: 0.5,
    description: "",
    tags: "",
  })
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={mockWallet}
        notificationCount={2}
      />
      
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 返回链接 */}
          <Link
            href="/data"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回数据广场
          </Link>
          
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">上传数据集</h1>
            <p className="text-muted-foreground mt-1">创建并发布您的医学影像数据集</p>
          </div>
          
          {/* 步骤指示器 */}
          <StepIndicator currentStep={currentStep} steps={steps} />
          
          {/* 步骤内容 */}
          <Card className="border border-border">
            <CardContent className="p-6 sm:p-8">
              {currentStep === 1 && (
                <Step1Upload
                  onNext={() => setCurrentStep(2)}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 2 && (
                <Step2Metadata
                  onNext={() => setCurrentStep(3)}
                  onPrev={() => setCurrentStep(1)}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {currentStep === 3 && (
                <Step3Precheck
                  onNext={() => setCurrentStep(4)}
                  onPrev={() => setCurrentStep(2)}
                />
              )}
              {currentStep === 4 && (
                <Step4Publish
                  onPrev={() => setCurrentStep(3)}
                  formData={formData}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
