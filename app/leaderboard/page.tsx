"use client"

import { useState } from "react"
import { Header, Footer, LevelBadge } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Star,
  Target,
  CheckCircle,
  Users,
} from "lucide-react"

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

// 排行榜数据
const leaderboardData = {
  contribution: [
    { rank: 1, name: "王教授", avatar: "", level: 9, score: 158960, change: 2, institution: "北京协和医院" },
    { rank: 2, name: "李主任", avatar: "", level: 8, score: 142350, change: 0, institution: "上海瑞金医院" },
    { rank: 3, name: "陈医生", avatar: "", level: 7, score: 128740, change: 1, institution: "广州中山医院" },
    { rank: 4, name: "赵专家", avatar: "", level: 7, score: 115280, change: -1, institution: "四川华西医院" },
    { rank: 5, name: "张医生", avatar: "", level: 5, score: 98650, change: 3, institution: "协和医院", isCurrentUser: true },
    { rank: 6, name: "刘博士", avatar: "", level: 6, score: 92340, change: -2, institution: "浙江大学附属医院" },
    { rank: 7, name: "周医师", avatar: "", level: 6, score: 87120, change: 0, institution: "天津医科大学总医院" },
    { rank: 8, name: "吴主任", avatar: "", level: 5, score: 82560, change: 1, institution: "南京鼓楼医院" },
    { rank: 9, name: "郑医生", avatar: "", level: 5, score: 78930, change: -1, institution: "武汉同济医院" },
    { rank: 10, name: "孙专家", avatar: "", level: 6, score: 75280, change: 2, institution: "西安交大附属医院" },
  ],
  accuracy: [
    { rank: 1, name: "李主任", avatar: "", level: 8, score: 99.2, change: 0, institution: "上海瑞金医院" },
    { rank: 2, name: "王教授", avatar: "", level: 9, score: 98.8, change: 1, institution: "北京协和医院" },
    { rank: 3, name: "陈医生", avatar: "", level: 7, score: 98.5, change: -1, institution: "广州中山医院" },
    { rank: 4, name: "刘博士", avatar: "", level: 6, score: 97.9, change: 2, institution: "浙江大学附属医院" },
    { rank: 5, name: "赵专家", avatar: "", level: 7, score: 97.6, change: 0, institution: "四川华西医院" },
    { rank: 6, name: "张医生", avatar: "", level: 5, score: 96.8, change: 1, institution: "协和医院", isCurrentUser: true },
    { rank: 7, name: "周医师", avatar: "", level: 6, score: 96.2, change: -2, institution: "天津医科大学总医院" },
    { rank: 8, name: "吴主任", avatar: "", level: 5, score: 95.8, change: 0, institution: "南京鼓楼医院" },
    { rank: 9, name: "孙专家", avatar: "", level: 6, score: 95.3, change: 3, institution: "西安交大附属医院" },
    { rank: 10, name: "郑医生", avatar: "", level: 5, score: 94.9, change: -1, institution: "武汉同济医院" },
  ],
  review: [
    { rank: 1, name: "王教授", avatar: "", level: 9, score: 2856, change: 0, institution: "北京协和医院" },
    { rank: 2, name: "李主任", avatar: "", level: 8, score: 2340, change: 1, institution: "上海瑞金医院" },
    { rank: 3, name: "赵专家", avatar: "", level: 7, score: 1892, change: -1, institution: "四川华西医院" },
    { rank: 4, name: "陈医生", avatar: "", level: 7, score: 1654, change: 0, institution: "广州中山医院" },
    { rank: 5, name: "刘博士", avatar: "", level: 6, score: 1423, change: 2, institution: "浙江大学附属医院" },
    { rank: 6, name: "周医师", avatar: "", level: 6, score: 1256, change: -1, institution: "天津医科大学总医院" },
    { rank: 7, name: "孙专家", avatar: "", level: 6, score: 1089, change: 1, institution: "西安交大附属医院" },
    { rank: 8, name: "张医生", avatar: "", level: 5, score: 956, change: 0, institution: "协和医院", isCurrentUser: true },
    { rank: 9, name: "吴主任", avatar: "", level: 5, score: 834, change: -2, institution: "南京鼓楼医院" },
    { rank: 10, name: "郑医生", avatar: "", level: 5, score: 712, change: 1, institution: "武汉同济医院" },
  ],
}

// 排名图标
function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Crown className="h-6 w-6 text-amber-500" />
  if (rank === 2) return <Medal className="h-6 w-6 text-slate-400" />
  if (rank === 3) return <Award className="h-6 w-6 text-amber-700" />
  return <span className="text-lg font-bold text-muted-foreground">{rank}</span>
}

// 排名变化图标
function ChangeIndicator({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="flex items-center gap-0.5 text-xs text-success">
        <TrendingUp className="h-3 w-3" />
        {change}
      </span>
    )
  }
  if (change < 0) {
    return (
      <span className="flex items-center gap-0.5 text-xs text-destructive">
        <TrendingDown className="h-3 w-3" />
        {Math.abs(change)}
      </span>
    )
  }
  return (
    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
      <Minus className="h-3 w-3" />
    </span>
  )
}

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        isLoggedIn={true}
        user={mockUser}
        wallet={mockWallet}
        notificationCount={3}
      />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl flex items-center gap-3">
              <Trophy className="h-8 w-8 text-amber-500" />
              贡献排行榜
            </h1>
            <p className="mt-1 text-muted-foreground">
              表彰优秀贡献者，激励持续参与
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <Users className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12,586</p>
                    <p className="text-sm text-muted-foreground">活跃贡献者</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">856,432</p>
                    <p className="text-sm text-muted-foreground">本月标注数</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">96.8%</p>
                    <p className="text-sm text-muted-foreground">平均准确率</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 筛选器 */}
          <div className="flex items-center justify-between mb-6">
            <Tabs defaultValue="contribution" className="w-full">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <TabsList>
                  <TabsTrigger value="contribution">
                    <Star className="mr-2 h-4 w-4" />
                    贡献总榜
                  </TabsTrigger>
                  <TabsTrigger value="accuracy">
                    <Target className="mr-2 h-4 w-4" />
                    准确率榜
                  </TabsTrigger>
                  <TabsTrigger value="review">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    审核榜
                  </TabsTrigger>
                </TabsList>
                
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">本周</SelectItem>
                    <SelectItem value="month">本月</SelectItem>
                    <SelectItem value="quarter">本季度</SelectItem>
                    <SelectItem value="year">本年度</SelectItem>
                    <SelectItem value="all">全部时间</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 贡献总榜 */}
              <TabsContent value="contribution" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">贡献积分排行</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {leaderboardData.contribution.map((item) => (
                        <div
                          key={item.rank}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                            item.isCurrentUser
                              ? "bg-primary/10 ring-1 ring-primary/20"
                              : "bg-muted/30 hover:bg-muted/50"
                          }`}
                        >
                          {/* 排名 */}
                          <div className="flex h-10 w-10 items-center justify-center">
                            <RankIcon rank={item.rank} />
                          </div>

                          {/* 用户信息 */}
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {item.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground truncate">
                                {item.name}
                              </span>
                              <LevelBadge level={item.level} size="sm" showTooltip={false} />
                              {item.isCurrentUser && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                  我
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.institution}
                            </p>
                          </div>

                          {/* 分数 */}
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              {item.score.toLocaleString()}
                            </p>
                            <ChangeIndicator change={item.change} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 准确率榜 */}
              <TabsContent value="accuracy" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">标注准确率排行</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {leaderboardData.accuracy.map((item) => (
                        <div
                          key={item.rank}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                            item.isCurrentUser
                              ? "bg-primary/10 ring-1 ring-primary/20"
                              : "bg-muted/30 hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center">
                            <RankIcon rank={item.rank} />
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {item.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground truncate">
                                {item.name}
                              </span>
                              <LevelBadge level={item.level} size="sm" showTooltip={false} />
                              {item.isCurrentUser && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                  我
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.institution}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{item.score}%</p>
                            <ChangeIndicator change={item.change} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 审核榜 */}
              <TabsContent value="review" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">审核贡献排行</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {leaderboardData.review.map((item) => (
                        <div
                          key={item.rank}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                            item.isCurrentUser
                              ? "bg-primary/10 ring-1 ring-primary/20"
                              : "bg-muted/30 hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center">
                            <RankIcon rank={item.rank} />
                          </div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {item.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-foreground truncate">
                                {item.name}
                              </span>
                              <LevelBadge level={item.level} size="sm" showTooltip={false} />
                              {item.isCurrentUser && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                  我
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.institution}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              {item.score.toLocaleString()} 次
                            </p>
                            <ChangeIndicator change={item.change} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
