"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/m-platform/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Database,
  Award,
  CheckCircle2,
} from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [agreeTerms, setAgreeTerms] = useState(false)

  // 平台特色
  const features = [
    {
      icon: Database,
      title: "海量医学数据",
      description: "连接全球优质医学影像数据资源",
    },
    {
      icon: Shield,
      title: "沙箱积分体系",
      description: "安全可信的积分账本与资产管理",
    },
    {
      icon: Award,
      title: "专业认证体系",
      description: "L0-Lv9等级阶梯，能力即信任",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* 左侧：品牌展示区 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/5 via-background to-[#0F8770]/5 flex-col justify-between p-12">
        <div>
          <Link href="/">
            <Logo size="lg" />
          </Link>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground leading-tight text-balance">
              加速全球医学影像行业
              <br />
              迈入智能化时代
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              M平台连接医学数据资产、标注任务与专业人才，构建可信的医学AI数据生态
            </p>
          </div>

          {/* 特色展示 */}
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-card shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>已有超过 <span className="font-semibold text-foreground">12,000+</span> 医学专业人士加入平台</p>
        </div>
      </div>

      {/* 右侧：登录/注册表单 */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* 移动端 Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-block">
              <Logo size="lg" />
            </Link>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">
                {activeTab === "login" ? "欢迎回来" : "创建账户"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login" 
                  ? "登录您的账户以继续" 
                  : "加入M平台，开启医学数据之旅"
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">登录</TabsTrigger>
                  <TabsTrigger value="register">注册</TabsTrigger>
                </TabsList>

                {/* 登录表单 */}
                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">邮箱</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">密码</Label>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        忘记密码？
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="输入密码"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      记住我
                    </Label>
                  </div>

                  <Button className="w-full" size="lg">
                    登录
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>

                {/* 注册表单 */}
                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">姓名</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="您的姓名"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">邮箱</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone">手机号（选填）</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="您的手机号"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="设置密码（至少8位）"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">确认密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="再次输入密码"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
                      我已阅读并同意{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        服务条款
                      </Link>
                      {" "}和{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        隐私政策
                      </Link>
                    </Label>
                  </div>

                  <Button className="w-full" size="lg" disabled={!agreeTerms}>
                    创建账户
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* 注册提示 */}
                  <div className="p-3 rounded-lg bg-accent/50">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#0F8770] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        注册后您将获得 <span className="font-medium text-foreground">L0 游客</span> 身份，完成基础认证后升级为 <span className="font-medium text-foreground">Lv1</span>，即可开始领取任务
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* 分隔线 */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">或</span>
                </div>
              </div>

              {/* 第三方登录 */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48C19.14 20.16 22 16.42 22 12c0-5.52-4.48-10-10-10z"
                    />
                  </svg>
                  使用 GitHub 继续
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#09B83E"
                      d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.32.32 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c4.8 0 8.691-3.288 8.691-7.342 0-4.054-3.89-7.342-8.69-7.342"
                    />
                    <path
                      fill="#09B83E"
                      d="M15.309 21.812C20.109 21.812 24 18.524 24 14.47c0-2.212-1.17-4.203-3.002-5.55a.59.59 0 0 1-.213-.665l.39-1.48c.019-.07.048-.141.048-.213a.291.291 0 0 0-.29-.295.32.32 0 0 0-.167.054l-1.903 1.114a.864.864 0 0 1-.717.098 10.16 10.16 0 0 0-2.837-.403c-4.8 0-8.691 3.288-8.691 7.342 0 4.054 3.89 7.342 8.69 7.342"
                      opacity=".5"
                    />
                  </svg>
                  使用微信继续
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 底部链接 */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              返回首页
            </Link>
            <span className="mx-2">·</span>
            <Link href="/help" className="hover:text-foreground">
              帮助中心
            </Link>
            <span className="mx-2">·</span>
            <Link href="/contact" className="hover:text-foreground">
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
