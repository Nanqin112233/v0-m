"use client"

import { useState } from "react"
import { Header, Footer, LevelBadge, DatasetStatusBadge } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  SlidersHorizontal,
  Upload,
  Database,
  Building2,
  X,
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

// 筛选选项
const modalityOptions = ["CT", "MRI", "X-Ray", "超声", "OCT", "病理", "内镜"]
const specialtyOptions = ["放射科", "心内科", "神经内科", "眼科", "肿瘤科", "骨科", "呼吸内科"]
const statusOptions = [
  { value: "active", label: "已发布" },
  { value: "pending_audit", label: "待审核" },
]
const sampleRangeOptions = [
  { value: "0-1000", label: "< 1,000" },
  { value: "1000-5000", label: "1,000 - 5,000" },
  { value: "5000-10000", label: "5,000 - 10,000" },
  { value: "10000+", label: "> 10,000" },
]

// 模拟数据集
const mockDatasets = [
  {
    id: "DS001",
    name: "胸部CT肺结节数据集",
    description: "包含12,500例胸部CT影像，标注有肺结节位置与良恶性分类",
    owner: "协和医院影像中心",
    ownerType: "institution" as const,
    ownerLevel: 7,
    modality: "CT",
    specialty: "放射科",
    samples: 12500,
    status: "active" as const,
    price: 5000,
    coverImage: null,
    createdAt: "2026-03-15",
  },
  {
    id: "DS002",
    name: "脑部MRI肿瘤分割数据",
    description: "8,200例脑部MRI影像，包含肿瘤边界分割标注",
    owner: "华西医学影像研究院",
    ownerType: "institution" as const,
    ownerLevel: 8,
    modality: "MRI",
    specialty: "神经内科",
    samples: 8200,
    status: "active" as const,
    price: 8000,
    coverImage: null,
    createdAt: "2026-02-28",
  },
  {
    id: "DS003",
    name: "眼底OCT糖网病变数据",
    description: "15,800例眼底OCT影像，糖尿病视网膜病变分级标注",
    owner: "中山眼科中心",
    ownerType: "institution" as const,
    ownerLevel: 6,
    modality: "OCT",
    specialty: "眼科",
    samples: 15800,
    status: "active" as const,
    price: 3500,
    coverImage: null,
    createdAt: "2026-04-01",
  },
  {
    id: "DS004",
    name: "胸部X光肺炎检测数据",
    description: "22,000例胸部X光片，包含正常与肺炎分类标注",
    owner: "北京大学人民医院",
    ownerType: "institution" as const,
    ownerLevel: 7,
    modality: "X-Ray",
    specialty: "放射科",
    samples: 22000,
    status: "active" as const,
    price: 4500,
    coverImage: null,
    createdAt: "2026-03-20",
  },
  {
    id: "DS005",
    name: "心脏超声结构分割数据",
    description: "6,500例心脏超声影像，心室心房边界分割",
    owner: "阜外医院",
    ownerType: "institution" as const,
    ownerLevel: 8,
    modality: "超声",
    specialty: "心内科",
    samples: 6500,
    status: "active" as const,
    price: 6000,
    coverImage: null,
    createdAt: "2026-01-15",
  },
  {
    id: "DS006",
    name: "病理切片乳腺癌分级",
    description: "9,800例乳腺病理切片，恶性程度分级标注",
    owner: "复旦大学附属肿瘤医院",
    ownerType: "institution" as const,
    ownerLevel: 9,
    modality: "病理",
    specialty: "肿瘤科",
    samples: 9800,
    status: "active" as const,
    price: 12000,
    coverImage: null,
    createdAt: "2026-04-10",
  },
]

export default function DataMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModalities, setSelectedModalities] = useState<string[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [selectedSampleRange, setSelectedSampleRange] = useState<string>("")
  const [sortBy, setSortBy] = useState("newest")

  const hasFilters = selectedModalities.length > 0 || selectedSpecialties.length > 0 || selectedStatus || selectedSampleRange

  const clearFilters = () => {
    setSelectedModalities([])
    setSelectedSpecialties([])
    setSelectedStatus("")
    setSelectedSampleRange("")
  }

  const toggleModality = (modality: string) => {
    setSelectedModalities(prev =>
      prev.includes(modality)
        ? prev.filter(m => m !== modality)
        : [...prev, modality]
    )
  }

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  // 过滤数据集
  const filteredDatasets = mockDatasets.filter(dataset => {
    if (searchQuery && !dataset.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (selectedModalities.length > 0 && !selectedModalities.includes(dataset.modality)) {
      return false
    }
    if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(dataset.specialty)) {
      return false
    }
    if (selectedStatus && dataset.status !== selectedStatus) {
      return false
    }
    return true
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={mockWallet}
        currentPath="/data"
        notificationCount={3}
        onNavigate={(path) => console.log("Navigate to:", path)}
        onLogout={() => console.log("Logout")}
        onNotificationClick={() => console.log("Notifications")}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 页面标题区 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">数据广场</h1>
              <p className="mt-1 text-muted-foreground">浏览公开数据资产，发现高质量医学影像数据集</p>
            </div>
            <Button className="bg-[#0F8770] hover:bg-[#0A6655] text-white" asChild>
              <Link href="/data/upload">
                <Upload className="mr-2 h-4 w-4" />
                上传数据集
              </Link>
            </Button>
          </div>

          {/* 搜索栏 */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索数据集名称、机构..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="排序方式" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">最新发布</SelectItem>
                <SelectItem value="samples">样本数量</SelectItem>
                <SelectItem value="price-asc">价格从低到高</SelectItem>
                <SelectItem value="price-desc">价格从高到低</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-6">
            {/* 左侧筛选栏 */}
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <SlidersHorizontal className="h-4 w-4" />
                    筛选条件
                  </div>
                  {hasFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                      <X className="mr-1 h-3 w-3" />
                      清除
                    </Button>
                  )}
                </div>

                {/* 模态筛选 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">影像模态</Label>
                  <div className="space-y-2">
                    {modalityOptions.map((modality) => (
                      <div key={modality} className="flex items-center space-x-2">
                        <Checkbox
                          id={`modality-${modality}`}
                          checked={selectedModalities.includes(modality)}
                          onCheckedChange={() => toggleModality(modality)}
                        />
                        <label
                          htmlFor={`modality-${modality}`}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {modality}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 科室筛选 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">科室</Label>
                  <div className="space-y-2">
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`specialty-${specialty}`}
                          checked={selectedSpecialties.includes(specialty)}
                          onCheckedChange={() => toggleSpecialty(specialty)}
                        />
                        <label
                          htmlFor={`specialty-${specialty}`}
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          {specialty}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 状态筛选 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">状态</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="全部状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">全部状态</SelectItem>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 样本规模筛选 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">样本规模</Label>
                  <Select value={selectedSampleRange} onValueChange={setSelectedSampleRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="全部规模" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">全部规模</SelectItem>
                      {sampleRangeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* 右侧数据集列表 */}
            <div className="flex-1">
              {/* 已选筛选标签 */}
              {hasFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedModalities.map((modality) => (
                    <Badge key={modality} variant="secondary" className="gap-1">
                      {modality}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleModality(modality)}
                      />
                    </Badge>
                  ))}
                  {selectedSpecialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="gap-1">
                      {specialty}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => toggleSpecialty(specialty)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* 结果计数 */}
              <p className="text-sm text-muted-foreground mb-4">
                共找到 <span className="font-mono font-medium text-foreground">{filteredDatasets.length}</span> 个数据集
              </p>

              {/* 数据集卡片网格 */}
              {filteredDatasets.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredDatasets.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className="border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      {/* 封面图区域 */}
                      <div className="aspect-[16/9] bg-muted rounded-t-lg flex items-center justify-center border-b border-border">
                        <Database className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base truncate group-hover:text-primary transition-colors">
                              {dataset.name}
                            </CardTitle>
                            <CardDescription className="mt-1 flex items-center gap-1.5 text-sm">
                              <Building2 className="h-3.5 w-3.5" />
                              <span className="truncate">{dataset.owner}</span>
                              <LevelBadge level={dataset.ownerLevel} size="sm" />
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {dataset.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs font-normal">
                            {dataset.modality}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-normal">
                            {dataset.specialty}
                          </Badge>
                          <DatasetStatusBadge status={dataset.status} />
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-sm text-muted-foreground">
                            <span className="font-mono font-medium text-foreground">{dataset.samples.toLocaleString()}</span> 样本
                          </span>
                          <span className="text-sm font-medium text-[#0F8770]">
                            <span className="font-mono">{dataset.price.toLocaleString()}</span> 积分
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border border-dashed">
                  <CardContent className="py-16 text-center">
                    <Database className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <h3 className="mt-4 text-lg font-medium text-foreground">未找到匹配的数据集</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      尝试调整筛选条件或搜索关键词
                    </p>
                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                      清除筛选条件
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
