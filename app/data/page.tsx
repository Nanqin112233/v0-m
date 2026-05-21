"use client"

import { useState, useMemo } from "react"
import { Header, Footer, LevelBadge } from "@/components/m-platform"
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Search,
  Filter,
  Upload,
  FileStack,
  Building2,
  ArrowUpDown,
  X,
  Lock,
  Eye,
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
const modalityOptions = [
  { value: "CT", label: "CT" },
  { value: "MRI", label: "MRI" },
  { value: "X-ray", label: "X-ray" },
  { value: "病理", label: "病理" },
  { value: "超声", label: "超声" },
  { value: "内镜", label: "内镜" },
]

const specialtyOptions = [
  { value: "胸外科", label: "胸外科" },
  { value: "神经内科", label: "神经内科" },
  { value: "眼科", label: "眼科" },
  { value: "骨科", label: "骨科" },
  { value: "消化内科", label: "消化内科" },
  { value: "心内科", label: "心内科" },
]

const sampleRangeOptions = [
  { value: "0-1000", label: "< 1,000" },
  { value: "1000-5000", label: "1,000 - 5,000" },
  { value: "5000-10000", label: "5,000 - 10,000" },
  { value: "10000+", label: "> 10,000" },
]

const statusOptions = [
  { value: "active", label: "已发布" },
  { value: "pending_audit", label: "待审核" },
]

// 模拟数据集
const mockDatasets = [
  {
    id: "ds-001",
    name: "胸部CT影像数据集",
    description: "包含正常及异常胸部CT扫描影像，适用于肺部病变检测模型训练",
    owner: "协和医院",
    ownerLevel: 6,
    modality: "CT",
    specialty: "胸外科",
    samples: 12500,
    price: 0.8,
    status: "active",
    cover: "/api/placeholder/400/200",
    accessLevel: 3,
    createdAt: "2026-05-01",
  },
  {
    id: "ds-002",
    name: "脑部MRI标准数据集",
    description: "高质量脑部MRI影像集，包含T1、T2、FLAIR序列",
    owner: "华西医院",
    ownerLevel: 7,
    modality: "MRI",
    specialty: "神经内科",
    samples: 8200,
    price: 1.2,
    status: "active",
    cover: "/api/placeholder/400/200",
    accessLevel: 4,
    createdAt: "2026-04-28",
  },
  {
    id: "ds-003",
    name: "眼底病理切片集",
    description: "眼底病理切片数字化影像，涵盖多种常见眼底疾病",
    owner: "中山眼科",
    ownerLevel: 8,
    modality: "病理",
    specialty: "眼科",
    samples: 15800,
    price: 0.5,
    status: "active",
    cover: "/api/placeholder/400/200",
    accessLevel: 2,
    createdAt: "2026-04-25",
  },
  {
    id: "ds-004",
    name: "骨折X光片数据集",
    description: "四肢骨折X光影像集，标注骨折位置与类型",
    owner: "积水潭医院",
    ownerLevel: 5,
    modality: "X-ray",
    specialty: "骨科",
    samples: 6300,
    price: 0.6,
    status: "active",
    cover: "/api/placeholder/400/200",
    accessLevel: 1,
    createdAt: "2026-04-20",
  },
  {
    id: "ds-005",
    name: "胃镜检查影像集",
    description: "胃镜检查高清影像，包含正常及病变样本",
    owner: "瑞金医院",
    ownerLevel: 6,
    modality: "内镜",
    specialty: "消化内科",
    samples: 4500,
    price: 0.9,
    status: "pending_audit",
    cover: "/api/placeholder/400/200",
    accessLevel: 3,
    createdAt: "2026-05-10",
  },
  {
    id: "ds-006",
    name: "心脏超声动态影像",
    description: "心脏超声检查动态影像集，包含多切面视图",
    owner: "阜外医院",
    ownerLevel: 9,
    modality: "超声",
    specialty: "心内科",
    samples: 3200,
    price: 1.5,
    status: "active",
    cover: "/api/placeholder/400/200",
    accessLevel: 5,
    createdAt: "2026-05-05",
  },
]

// 数据集卡片组件
function DatasetCard({ 
  dataset, 
  userLevel 
}: { 
  dataset: typeof mockDatasets[0]
  userLevel: number
}) {
  const isAccessible = userLevel >= dataset.accessLevel
  
  return (
    <Card className="border border-border hover:border-primary/50 transition-colors group">
      {/* 封面图 */}
      <div className="relative h-32 bg-muted rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20">
          <FileStack className="h-12 w-12 text-primary/40" />
        </div>
        {/* 状态徽章 */}
        <Badge 
          variant={dataset.status === "active" ? "default" : "secondary"}
          className="absolute top-2 right-2 text-xs"
        >
          {dataset.status === "active" ? "已发布" : "待审核"}
        </Badge>
        {/* 访问限制提示 */}
        {!isAccessible && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center p-4">
              <Lock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">需要 Lv{dataset.accessLevel}+ 访问</p>
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="outline" className="text-xs shrink-0">{dataset.modality}</Badge>
          <span className="text-xs text-muted-foreground font-mono">{dataset.id}</span>
        </div>
        <CardTitle className="text-base mt-2 line-clamp-1 group-hover:text-primary transition-colors">
          {dataset.name}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {dataset.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* 机构信息 */}
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{dataset.owner}</span>
          <LevelBadge level={dataset.ownerLevel} size="sm" showTooltip={false} />
        </div>
        
        {/* 数据信息 */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <FileStack className="h-4 w-4" />
            {dataset.samples.toLocaleString()} 样本
          </span>
          <span className="font-mono text-foreground font-medium">
            {dataset.price} 积分/例
          </span>
        </div>
        
        {/* 操作按钮 */}
        <div className="mt-4">
          {isAccessible ? (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/data/${dataset.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                查看详情
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" className="w-full" disabled>
              <Lock className="h-4 w-4 mr-2" />
              等级不足
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// 筛选栏组件
function FilterRail({
  filters,
  onFilterChange,
  onReset,
}: {
  filters: {
    modality: string[]
    specialty: string[]
    sampleRange: string[]
    status: string[]
  }
  onFilterChange: (key: string, values: string[]) => void
  onReset: () => void
}) {
  const hasFilters = Object.values(filters).some(arr => arr.length > 0)
  
  return (
    <div className="space-y-6">
      {/* 重置按钮 */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="w-full justify-start text-muted-foreground">
          <X className="h-4 w-4 mr-2" />
          清除所有筛选
        </Button>
      )}
      
      {/* 模态筛选 */}
      <div>
        <Label className="text-sm font-medium mb-3 block">影像模态</Label>
        <div className="space-y-2">
          {modalityOptions.map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`modality-${option.value}`}
                checked={filters.modality.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("modality", [...filters.modality, option.value])
                  } else {
                    onFilterChange("modality", filters.modality.filter(v => v !== option.value))
                  }
                }}
              />
              <Label htmlFor={`modality-${option.value}`} className="text-sm font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* 科室筛选 */}
      <div>
        <Label className="text-sm font-medium mb-3 block">科室</Label>
        <div className="space-y-2">
          {specialtyOptions.map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`specialty-${option.value}`}
                checked={filters.specialty.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("specialty", [...filters.specialty, option.value])
                  } else {
                    onFilterChange("specialty", filters.specialty.filter(v => v !== option.value))
                  }
                }}
              />
              <Label htmlFor={`specialty-${option.value}`} className="text-sm font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* 样本规模筛选 */}
      <div>
        <Label className="text-sm font-medium mb-3 block">样本规模</Label>
        <div className="space-y-2">
          {sampleRangeOptions.map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`range-${option.value}`}
                checked={filters.sampleRange.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("sampleRange", [...filters.sampleRange, option.value])
                  } else {
                    onFilterChange("sampleRange", filters.sampleRange.filter(v => v !== option.value))
                  }
                }}
              />
              <Label htmlFor={`range-${option.value}`} className="text-sm font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* 状态筛选 */}
      <div>
        <Label className="text-sm font-medium mb-3 block">状态</Label>
        <div className="space-y-2">
          {statusOptions.map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`status-${option.value}`}
                checked={filters.status.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onFilterChange("status", [...filters.status, option.value])
                  } else {
                    onFilterChange("status", filters.status.filter(v => v !== option.value))
                  }
                }}
              />
              <Label htmlFor={`status-${option.value}`} className="text-sm font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DataMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState({
    modality: [] as string[],
    specialty: [] as string[],
    sampleRange: [] as string[],
    status: [] as string[],
  })
  
  const userLevel = mockUser.level
  
  // 过滤数据集
  const filteredDatasets = useMemo(() => {
    let result = [...mockDatasets]
    
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(ds => 
        ds.name.toLowerCase().includes(query) ||
        ds.description.toLowerCase().includes(query) ||
        ds.owner.toLowerCase().includes(query)
      )
    }
    
    // 模态过滤
    if (filters.modality.length > 0) {
      result = result.filter(ds => filters.modality.includes(ds.modality))
    }
    
    // 科室过滤
    if (filters.specialty.length > 0) {
      result = result.filter(ds => filters.specialty.includes(ds.specialty))
    }
    
    // 状态过滤
    if (filters.status.length > 0) {
      result = result.filter(ds => filters.status.includes(ds.status))
    }
    
    // 排序
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === "samples") {
      result.sort((a, b) => b.samples - a.samples)
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    }
    
    return result
  }, [searchQuery, filters, sortBy])
  
  const handleFilterChange = (key: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [key]: values }))
  }
  
  const handleResetFilters = () => {
    setFilters({
      modality: [],
      specialty: [],
      sampleRange: [],
      status: [],
    })
  }
  
  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)
  
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
              <h1 className="text-2xl font-bold text-foreground">数据广场</h1>
              <p className="text-muted-foreground mt-1">浏览公开数据资产，按模态、科室筛选</p>
            </div>
            
            {/* 上传入口 - 仅机构/有权账号可见 */}
            {userLevel >= 3 && (
              <Button asChild>
                <Link href="/data/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  上传数据集
                </Link>
              </Button>
            )}
          </div>
          
          {/* 搜索和排序栏 */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索数据集名称、描述、机构..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              {/* 移动端筛选按钮 */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    筛选
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-2">{activeFilterCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle>筛选条件</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterRail
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onReset={handleResetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* 排序下拉 */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新发布</SelectItem>
                  <SelectItem value="samples">样本量最多</SelectItem>
                  <SelectItem value="price-low">价格从低到高</SelectItem>
                  <SelectItem value="price-high">价格从高到低</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* 主内容区：左侧筛选 + 右侧卡片 */}
          <div className="flex gap-8">
            {/* 左侧筛选栏 - 桌面端 */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-20">
                <FilterRail
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </aside>
            
            {/* 右侧卡片栅格 */}
            <div className="flex-1">
              {/* 筛选结果统计 */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  共 {filteredDatasets.length} 个数据集
                </p>
                
                {/* 已选筛选标签 */}
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {filters.modality.map(v => (
                      <Badge key={v} variant="secondary" className="text-xs">
                        {v}
                        <button
                          onClick={() => handleFilterChange("modality", filters.modality.filter(x => x !== v))}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {filters.specialty.map(v => (
                      <Badge key={v} variant="secondary" className="text-xs">
                        {v}
                        <button
                          onClick={() => handleFilterChange("specialty", filters.specialty.filter(x => x !== v))}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {/* 数据集卡片 */}
              {filteredDatasets.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredDatasets.map(dataset => (
                    <DatasetCard key={dataset.id} dataset={dataset} userLevel={userLevel} />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <FileStack className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground text-center">
                      没有找到匹配的数据集
                    </p>
                    <Button variant="link" onClick={handleResetFilters} className="mt-2">
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
