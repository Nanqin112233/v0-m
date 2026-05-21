"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/m-platform/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  ArrowRight,
  Loader2,
} from "lucide-react"

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 发送验证码
  const handleSendCode = async () => {
    if (countdown > 0) return
    
    setIsSendingCode(true)
    // 模拟发送验证码
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSendingCode(false)
    setCountdown(60)
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // 登录/注册
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // 模拟登录
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // TODO: 实际登录逻辑
  }

  const canSubmit = loginMethod === "email" 
    ? email && code 
    : phone && code

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-chart-2/5 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            欢迎回来
          </p>
        </div>

        {/* 登录表单卡片 */}
        <div className="bg-card rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            <Tabs 
              value={loginMethod} 
              onValueChange={(v) => setLoginMethod(v as "email" | "phone")} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-5">
                <TabsTrigger value="email" className="text-sm">邮箱登录</TabsTrigger>
                <TabsTrigger value="phone" className="text-sm">手机登录</TabsTrigger>
              </TabsList>

              {/* 邮箱登录 */}
              <TabsContent value="email" className="space-y-4 mt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs text-muted-foreground">邮箱地址</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email-code" className="text-xs text-muted-foreground">验证码</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email-code"
                      type="text"
                      placeholder="输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      className="h-11 flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendCode}
                      disabled={!email || countdown > 0 || isSendingCode}
                      className="h-11 px-4 whitespace-nowrap"
                    >
                      {isSendingCode ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : countdown > 0 ? (
                        `${countdown}s`
                      ) : (
                        "获取验证码"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* 手机登录 */}
              <TabsContent value="phone" className="space-y-4 mt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground">手机号码</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="输入手机号"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-9 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone-code" className="text-xs text-muted-foreground">验证码</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone-code"
                      type="text"
                      placeholder="输入验证码"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                      className="h-11 flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendCode}
                      disabled={!phone || countdown > 0 || isSendingCode}
                      className="h-11 px-4 whitespace-nowrap"
                    >
                      {isSendingCode ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : countdown > 0 ? (
                        `${countdown}s`
                      ) : (
                        "获取验证码"
                      )}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              type="submit" 
              className="w-full mt-5 h-11" 
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                <>
                  登录
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* 协议 */}
          <p className="mt-4 text-xs text-center text-muted-foreground leading-relaxed">
            登录即表示同意{" "}
            <Link href="/terms" className="text-primary hover:underline">
              服务条款
            </Link>
          </p>
        </div>

        {/* 底部链接 */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            返回首页
          </Link>
          <span className="mx-2">·</span>
          <Link href="/help" className="hover:text-foreground">
            帮助中心
          </Link>
        </div>
      </div>
    </div>
  )
}
