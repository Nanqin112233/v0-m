"use client"

import { Header } from "@/components/m-platform"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

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

// 跑马灯公告
const announcements = [
  "[资产发布] #SPEC-224 染色体非整倍体畸变数据集今日新增 12,500 例样本",
  "[学术快讯] 24小时内新发表 Lancet 影像学论文已成功挂载对应微调模型体验入口",
  "[确权清算] 智能网关今日已完成 48,200 次 API 调用利润分配，收益秒级到账",
]

// 排行榜轮播数据
const boardData = [
  {
    title: "专家劳务分成榜",
    items: [
      { name: "王*平 教授 (胸部影像科)", value: "24,150 权值", rank: 1 },
      { name: "刘*国 副主任医师", value: "18,210 权值", rank: 2 },
    ],
    valueColor: "text-emerald-600",
  },
  {
    title: "开发者大模型准确率榜",
    items: [
      { name: "DeepSight-染色体分割 V2.1", value: "99.42%", rank: 1 },
      { name: "BioMind-微小结节分割", value: "98.15%", rank: 2 },
    ],
    valueColor: "text-primary",
  },
  {
    title: "优秀数据贡献持股机构",
    items: [
      { name: "浙江省肿瘤医院 (台州分组)", value: "1.2M 独立影像资产", rank: 1 },
      { name: "浙江大学医学院附属儿童医院", value: "850K 独立影像资产", rank: 2 },
    ],
    valueColor: "text-foreground",
  },
]

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginAccount, setLoginAccount] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [channelType, setChannelType] = useState<"phone" | "email" | "unknown">("unknown")
  
  // 实时数字统计
  const [imageVolume, setImageVolume] = useState(48291042)
  const [labelRecords, setLabelRecords] = useState(4812094)
  
  // 排行榜轮播
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0)
  const [boardOpacity, setBoardOpacity] = useState(1)

  // 数字跳动效果
  useEffect(() => {
    const interval = setInterval(() => {
      setImageVolume(prev => prev + Math.floor(Math.random() * 12) + 1)
      setLabelRecords(prev => prev + Math.floor(Math.random() * 8) + 1)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // 排行榜轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setBoardOpacity(0)
      setTimeout(() => {
        setCurrentBoardIndex(prev => (prev + 1) % boardData.length)
        setBoardOpacity(1)
      }, 200)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // 账号输入检测
  const handleAccountInput = useCallback((value: string) => {
    setLoginAccount(value)
    const phoneRegex = /^1[3-9]\d{9}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (phoneRegex.test(value)) {
      setChannelType("phone")
    } else if (emailRegex.test(value)) {
      setChannelType("email")
    } else {
      setChannelType("unknown")
    }
  }, [])

  // 登录处理
  const handleLogin = useCallback(() => {
    if (!loginAccount) {
      alert("请输入手机号或电子邮箱！")
      return
    }
    setIsLoggedIn(true)
    setLoginModalOpen(false)
    alert("全球多通道验证通过！系统已为您自动绑定去中心化账户流节点安全关联。")
  }, [loginAccount])

  // 退出登录
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setLoginAccount("")
    setAuthCode("")
    alert("已成功断开去中心化账户流节点安全关联。")
  }, [])

  // 医生专家变现入口
  const handleDoctorConversion = useCallback(() => {
    if (!isLoggedIn) {
      alert("【资质鉴权拦截】要素流转在线变现限定[认证医学专家]，检测到您未登录，已为您无缝激活急速登录网关。")
      setLoginModalOpen(true)
    } else {
      window.location.href = "/tasks"
    }
  }, [isLoggedIn])

  const currentBoard = boardData[currentBoardIndex]

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans antialiased selection:bg-primary selection:text-white">
      {/* 跑马灯公告栏 */}
      <div className="w-full bg-blue-50 border-b border-blue-100 py-2 text-xs text-blue-700 overflow-hidden select-none">
        <div 
          className="flex animate-marquee whitespace-nowrap"
          style={{ 
            animation: "marquee 30s linear infinite",
          }}
        >
          {[...announcements, ...announcements].map((text, i) => (
            <span key={i} className="mx-8">{text}</span>
          ))}
        </div>
      </div>

      {/* 顶部导航 */}
      <Header
        isLoggedIn={isLoggedIn}
        user={isLoggedIn ? mockUser : undefined}
        wallet={isLoggedIn ? mockWallet : undefined}
        notificationCount={isLoggedIn ? 3 : 0}
        onLogout={handleLogout}
        onLogin={() => setLoginModalOpen(true)}
      />

      {/* 登录弹窗 */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-base font-black text-slate-900">
              欢迎加入全球医疗要素网络
            </DialogTitle>
            <p className="text-[10px] text-slate-400 text-center mt-0.5">
              系统根据输入动态分流（国内手机号 / 海外邮箱）
            </p>
          </DialogHeader>
          
          <div className="space-y-3 pt-2 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 block">
                手机号 (+86) 或 电子邮箱 (Global Email)
              </label>
              <Input
                type="text"
                value={loginAccount}
                onChange={(e) => handleAccountInput(e.target.value)}
                placeholder="请输入大陆手机号 或 国际电子邮箱..."
                className="bg-slate-50 border-slate-200 text-slate-800"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-bold text-slate-700">
                  {channelType === "phone" ? "手机短信验证码" : 
                   channelType === "email" ? "邮箱验证码 / 独立密码" : 
                   "验证码 / 独立密码"}
                </label>
                <span className={`text-[9px] px-1 rounded border font-mono ${
                  channelType === "phone" 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                    : channelType === "email"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {channelType === "phone" ? "国内+86电信网关" :
                   channelType === "email" ? "海外全球加密邮箱分流" :
                   "请识别输入"}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="请输入校验要素..."
                  className="flex-1 bg-slate-50 border-slate-200 text-slate-800"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 px-3 text-[10px] shrink-0"
                >
                  获取验证码
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 text-xs"
              >
                进入生态大盘 (登录即注册)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero 区域 */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center bg-gradient-to-b from-blue-50/30 to-white px-6 py-12 text-center relative">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-4 py-1 text-xs font-medium">
            <span>全球规模领先的医学影像数据平台</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight text-balance">
            加速全球医学影像行业迈入智能化时代
          </h1>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-slate-500 leading-relaxed">
            中国拥有超 3200 项医学影像检测，但智能化辅助诊断渗透率不足 1%。我们致力于打破传统瓶颈，全面加速临床级智能化应用的普及与落地。
          </p>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-400 mb-1">接入影像总量 (TB)</div>
              <div className="text-xl font-bold font-mono text-slate-900">
                {imageVolume.toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-400 mb-1">覆盖适应症/检测项</div>
              <div className="text-xl font-bold font-mono text-slate-900">
                3,200+ <span className="text-xs text-slate-400 font-normal">/ 5,000</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-[11px] text-slate-400 mb-1">全球认证专家 (位)</div>
              <div className="text-xl font-bold font-mono text-slate-900">12,450</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm bg-gradient-to-br from-white to-blue-50/20">
              <div className="text-[11px] text-primary mb-1">标注记录</div>
              <div className="text-xl font-bold font-mono text-primary">
                {labelRecords.toLocaleString()} <span className="text-xs text-slate-400 font-normal">Cases</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 解耦三大核心 */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-balance">
              打破院墙限制：让沉睡的影像资产，跨时空连接全球专家智库
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              将海量数据获取能力与专家高年资智力彻底并行解耦，全面释放产业效率。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 数据端解耦 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:border-primary/40 transition">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-3">数据端解耦</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  数据资产拥有者无需操心标注，一键上传脱敏数据，即可转化为长效分红的资产。
                </p>
              </div>
              <Link 
                href="/data"
                className="w-full text-center bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-primary font-semibold text-xs py-2.5 rounded-lg border border-slate-200 hover:border-blue-200 transition block"
              >
                医院/机构：让闲置数据变资产 &rarr;
              </Link>
            </div>

            {/* 标注端解耦 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:border-primary/40 transition">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-xl text-cyan-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-3">标注端解耦</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  全球高年资医生突破地域限制，用碎片时间与顶级专业经验在线变现。
                </p>
              </div>
              <button 
                onClick={handleDoctorConversion}
                className="w-full text-center bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-primary font-semibold text-xs py-2.5 rounded-lg border border-slate-200 hover:border-blue-200 transition"
              >
                高年资医生：开启专家经验变现 &rarr;
              </button>
            </div>

            {/* 区块链确权 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:border-primary/40 transition">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl text-emerald-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-3">区块链确权</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {"每一份贡献都有据可查，API 只要被调用，收益秒级分账，上传者即为资产\"股东\"。"}
                </p>
              </div>
              <div className="text-[11px] text-emerald-600 bg-emerald-50/50 border border-emerald-100 rounded-lg p-2 text-center font-medium">
                清算结算系统全合规支持
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 安全防线 */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100 relative overflow-hidden group">
        {/* DNA 背景动画 */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full max-w-4xl" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M10,50 Q25,20 40,50 T70,50 T100,50" strokeWidth="0.3" className="stroke-cyan-500 animate-pulse" />
            <path d="M10,50 Q25,80 40,50 T70,50 T100,50" strokeWidth="0.3" className="stroke-primary animate-pulse" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10">
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl md:text-2xl font-black tracking-tight flex items-center space-x-2 text-slate-900">
              <span>构筑要素主权的双重物理安全防线</span>
            </h2>
            
            <div className="space-y-4 text-xs">
              <div className="border-l-4 border-primary bg-slate-50 p-4 rounded-xl hover:bg-slate-100/50 transition">
                <h4 className="font-bold text-slate-900 text-sm">防线一：像素级 Data-DNA 追踪</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  引入彩色激光打印机序列号追踪技术。在导出的图像中隐式植入不可察觉的明码与暗码。任何一张流出平台的数据，均可精准溯源至具体用户名、IP、分发时间点。
                </p>
              </div>
              
              <div className="border-l-4 border-primary bg-slate-50 p-4 rounded-xl hover:bg-slate-100/50 transition">
                <h4 className="font-bold text-slate-900 text-sm">防线二：合规与法律兜底</h4>
                <p className="text-slate-500 mt-1 leading-relaxed">
                  联合顶级律所起草闭环合同。所有数据流转严格符合 HIPAA 及国内数据出境、脱敏合规标准，全面支持事后追责与司法穿透。
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">安全与合规生态伙伴联合认证</div>
            <div className="grid grid-cols-1 gap-2 text-center font-bold text-xs text-slate-700">
              <div className="bg-white p-3.5 rounded-xl border border-slate-150 flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>腾讯云 安全防线 (Tencent Cloud Secure Escrow)</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-150 flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>新华三 算力审计 (H3C Infrastructure)</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-150 flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>顶级律所 法律合规 (Legal Compliance)</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-150 flex items-center justify-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>去中心化 区块链存证 (Blockchain Provenance)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心大模型工厂 */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-8 border-t border-slate-100">
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">iMedImage 核心专科大模型工厂</h2>
          <p className="text-xs text-slate-400">{"\"从原始影像到生产级应用，只需三步。\""}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
            <div className="text-xs font-mono font-black text-primary">STEP 01 / FINE-TUNING</div>
            <h4 className="text-sm font-black text-slate-900">大模型分布式微调</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              预置 iMedImage 基础大模型，支持一键配置超参、TensorBoard 监控，打造专属专科模型。
            </p>
            <div className="text-[9px] bg-slate-50 text-slate-400 p-2 rounded font-mono border border-slate-100">
              [config] --base_model iMedImage-Core --lr 2e-5 --metrics=AUC/mAP
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
            <div className="text-xs font-mono font-black text-cyan-700">STEP 02 / DEPLOYMENT</div>
            <h4 className="text-sm font-black text-slate-900">快捷部署 (Deployment)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              零代码部署操作，一键部署。
            </p>
            <div className="text-[9px] bg-slate-50 text-slate-400 p-2 rounded font-mono border border-slate-100">
              [export] --format=onnx/tensorrt_engine --node=cloud_cluster
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 relative overflow-hidden">
            <div className="text-xs font-mono font-black text-emerald-700">STEP 03 / INFERENCE</div>
            <h4 className="text-sm font-black text-slate-900">高并发推理 (Inference)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {"毫秒级批量推理，输出临床级 CAM（可解释性分析）热力图，全链路\"先充值，后扣费\"风控防白嫖。"}
            </p>
            <div className="text-[9px] bg-red-50 text-red-700 p-2 rounded font-bold font-mono border border-red-100">
              [security] status=active; firewall_mode=prepaid_intercept
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link 
            href="https://github.com" 
            target="_blank" 
            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition shadow-md shadow-primary/10"
          >
            进入 MaaS 深度开发控制台 &rarr;
          </Link>
        </div>
      </section>

      {/* 论文/新闻/排行榜 三栏 */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 热点论文与模型联动 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-800 flex items-center">热点论文与模型联动</h3>
                <Link href="/community" className="text-xs text-primary font-medium hover:underline">去社区 &rarr;</Link>
              </div>
              <div className="space-y-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">Lancet Oncology</span>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">基于多中心深度学习的早期肺腺癌微环境时序病理特征识别</h4>
                  <div className="text-[11px] text-primary font-mono font-bold pt-1 cursor-pointer hover:underline">挂载模型：一键复现体验 &rarr;</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[9px] bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded">Radiology</span>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">三维多模态 CT 剂量估计大模型在儿科多中心临床中的可行性研究</h4>
                  <div className="text-[11px] text-primary font-mono font-bold pt-1 cursor-pointer hover:underline">挂载模型：一键复现体验 &rarr;</div>
                </div>
              </div>
            </div>

            {/* 行业前沿新闻 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-800 flex items-center">行业前沿新闻</h3>
                <Link href="/community" className="text-xs text-primary font-medium hover:underline">去社区 &rarr;</Link>
              </div>
              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-slate-400 text-[10px]">2026年5月18日</div>
                  <h4 className="font-bold text-slate-800 hover:text-primary cursor-pointer transition">国家卫健委：推进二级及以上医院普及影像诊断AI部署政策落地情况汇报</h4>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <div className="text-slate-400 text-[10px]">2026年5月15日</div>
                  <h4 className="font-bold text-slate-800 hover:text-primary cursor-pointer transition">全球细胞遗传学联合会：高分辨显微染色体核型大模型算法通过最新临床工程验证</h4>
                </div>
              </div>
            </div>

            {/* 生态实时贡献排行榜 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-800 flex items-center">生态实时贡献排行榜</h3>
                <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-1.5 rounded border border-blue-100 font-mono">
                  {currentBoard.title}
                </span>
              </div>
              
              <div 
                className="text-xs space-y-2.5 min-h-[100px] transition-opacity duration-300"
                style={{ opacity: boardOpacity }}
              >
                {currentBoard.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-medium text-slate-700">
                      {item.rank === 1 ? "1" : "2"} {item.name}
                    </span>
                    <span className={`font-mono font-black ${currentBoard.valueColor}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center text-xs py-12 px-6 space-y-3">
        <p className="max-w-4xl mx-auto text-slate-500">
          所有数据流转严格遵循 HIPAA 与中国医疗数据安全管理合规标准。全面通过国家网信办算法备案。要素资产采用端到端不可逆脱敏及 Data-DNA 追踪算法加密上链。
        </p>
        <p className="text-slate-600">&copy; 2026 AI医疗生态平台. Powered by iMedImage Technical Group.</p>
      </footer>

      {/* 跑马灯动画样式 */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
