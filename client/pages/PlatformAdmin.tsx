import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  Briefcase,
  TrendingUp,
  Eye,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Settings,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Flag,
  Shield,
  Award,
  Target,
  Calendar,
  DollarSign,
  UserCheck,
  MessageSquare,
  Bell,
  Activity,
  Download,
  Upload,
  Globe,
  Database,
  Server,
  Lock,
  Key,
  RefreshCw,
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  Brain,
  Crown,
  Building,
} from "lucide-react";
import { cn } from "@/lib/utils";

const platformStats = {
  community: {
    totalUsers: 12456,
    activeUsers: 8932,
    posts: 3421,
    comments: 15678,
    engagement: 78.5,
  },
  jobs: {
    totalJobs: 1234,
    activeJobs: 892,
    applications: 5678,
    placements: 234,
    successRate: 85.2,
  },
  revenue: {
    monthly: 2450000,
    growth: 15.3,
    subscriptions: 456,
    transactions: 1234,
  },
  system: {
    uptime: 99.9,
    responseTime: 120,
    activeConnections: 2847,
    storageUsed: 67.3,
  },
};

const adminModules = [
  {
    id: 1,
    title: "إدارة المستخدمين",
    description: "إدارة حسابات المستخدمين والصلاحيات",
    icon: Users,
    color: "bg-blue-100 text-blue-700",
    stats: {
      total: platformStats.community.totalUsers,
      active: platformStats.community.activeUsers,
      growth: "+12%",
    },
    actions: ["عرض المستخدمين", "إضافة مستخدم", "إدارة الأدوار"],
  },
  {
    id: 2,
    title: "إدارة المحتوى",
    description: "مراقبة وإدارة المنشورات والتعليقات",
    icon: MessageCircle,
    color: "bg-green-100 text-green-700",
    stats: {
      total: platformStats.community.posts,
      active: platformStats.community.comments,
      growth: "+8%",
    },
    actions: ["مراجعة المحتوى", "إدارة التقارير", "إعدادات النشر"],
  },
  {
    id: 3,
    title: "إدارة الوظائف",
    description: "مراقبة سوق العمل والتوظيف",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-700",
    stats: {
      total: platformStats.jobs.totalJobs,
      active: platformStats.jobs.activeJobs,
      growth: "+20%",
    },
    actions: ["مراجعة الوظائف", "إدارة الشركات", "إحصائيات التوظيف"],
  },
  {
    id: 4,
    title: "الإدارة المالية",
    description: "تتبع الإيرادات والمدفوعات",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-700",
    stats: {
      total: platformStats.revenue.monthly,
      active: platformStats.revenue.subscriptions,
      growth: `+${platformStats.revenue.growth}%`,
    },
    actions: ["عرض الإيرادات", "إدارة الاشتراكات", "تقارير مالية"],
  },
  {
    id: 5,
    title: "مراقبة النظام",
    description: "مراقبة أداء الخوادم والبنية التحتية",
    icon: Monitor,
    color: "bg-red-100 text-red-700",
    stats: {
      total: platformStats.system.uptime,
      active: platformStats.system.activeConnections,
      growth: "مستقر",
    },
    actions: ["حالة الخوادم", "سجلات النظام", "النسخ الاحتياطي"],
  },
  {
    id: 6,
    title: "الأمان والخصوصية",
    description: "إدارة الأمان وحماية البيانات",
    icon: Shield,
    color: "bg-indigo-100 text-indigo-700",
    stats: {
      total: 0,
      active: 24,
      growth: "آمن",
    },
    actions: ["سجل الأمان", "إدارة الصلاحيات", "مراجعة التهديدات"],
  },
];

const recentActivities = [
  {
    id: 1,
    type: "user",
    title: "مستخدم جديد",
    description: "انضم د. محمد أحمد للمنصة",
    time: "منذ 5 دقائق",
    icon: UserCheck,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    type: "content",
    title: "منشور جديد",
    description: "تم نشر مناقشة حول تقويم الأسنان",
    time: "منذ 15 دقيقة",
    icon: MessageSquare,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    type: "job",
    title: "وظيفة جديدة",
    description: "تم نشر وظيفة طبيب أسنان في بغداد",
    time: "منذ 30 دقيقة",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 4,
    type: "system",
    title: "تحديث النظام",
    description: "تم تحديث خادم قاعدة البيانات",
    time: "منذ ساعة",
    icon: Server,
    color: "bg-orange-100 text-orange-700",
  },
];

const PlatformAdmin = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = adminModules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-8 h-8" />
                <h1 className="text-3xl font-bold">إدارة المنصة</h1>
              </div>
              <p className="text-red-100 text-lg mb-4">
                مركز التحكم الرئيسي لإدارة جميع جوانب المنصة
              </p>
              <p className="text-red-100">
                {platformStats.community.totalUsers.toLocaleString()} مستخدم،{" "}
                {platformStats.system.uptime}% وقت التشغيل،{" "}
                {platformStats.revenue.growth}% نمو
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium hover:bg-white/30 transition-all flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                لوحة المعلومات
              </button>
              <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-medium hover:bg-red-50 transition-all flex items-center gap-2">
                <Settings className="w-5 h-5" />
                الإعدادات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Overview - Bento Style */}
      <div className="grid grid-cols-12 gap-6">
        {/* System Health */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">صحة النظام</h3>
            <Monitor className="w-6 h-6 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 rounded-3xl border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">
                {platformStats.system.uptime}%
              </p>
              <p className="text-sm font-medium text-green-700">وقت التشغيل</p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {platformStats.system.responseTime}
              </p>
              <p className="text-sm font-medium text-blue-700">
                وقت الاستجابة (مللي ثانية)
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-3xl border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {platformStats.system.activeConnections.toLocaleString()}
              </p>
              <p className="text-sm font-medium text-purple-700">اتصال نشط</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-3xl border border-orange-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HardDrive className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-orange-600 mb-2">
                {platformStats.system.storageUsed}%
              </p>
              <p className="text-sm font-medium text-orange-700">
                استخدام التخزين
              </p>
            </div>
          </div>

          {/* Performance Chart */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              أداء المنصة الأسبوعي
            </h4>
            <div className="h-40 bg-gradient-to-r from-red-50 to-purple-50 rounded-2xl p-6">
              <div className="grid grid-cols-7 gap-2 h-full">
                {[98.5, 99.2, 99.8, 99.1, 99.9, 99.3, 99.7].map(
                  (uptime, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-end space-y-2"
                    >
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">
                          {uptime}%
                        </div>
                        <div
                          className="bg-gradient-to-t from-red-500 to-purple-500 rounded-t-lg w-8 transition-all duration-300"
                          style={{ height: `${uptime}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {["س", "ح", "ث", "ر", "خ", "ج", "ب"][index]}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">النشاط الأخير</h3>
            <Activity className="w-6 h-6 text-gray-400" />
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    activity.color,
                  )}
                >
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    {activity.description}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium">
            عرض جميع الأنشطة
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="البحث في وحدات الإدارة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Admin Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div
            key={module.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center",
                  module.color,
                )}
              >
                <module.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors text-lg">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>

            {/* Module Stats */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {typeof module.stats.total === "number" &&
                    module.stats.total > 1000
                      ? `${(module.stats.total / 1000).toFixed(1)}K`
                      : module.stats.total}
                  </p>
                  <p className="text-xs text-gray-600">الإجمالي</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {typeof module.stats.active === "number" &&
                    module.stats.active > 1000
                      ? `${(module.stats.active / 1000).toFixed(1)}K`
                      : module.stats.active}
                  </p>
                  <p className="text-xs text-gray-600">النشط</p>
                </div>
                <div>
                  <p
                    className={cn(
                      "text-lg font-bold",
                      module.stats.growth.includes("+")
                        ? "text-green-600"
                        : "text-gray-900",
                    )}
                  >
                    {module.stats.growth}
                  </p>
                  <p className="text-xs text-gray-600">النمو</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 mb-4">
              {module.actions.map((action, index) => (
                <button
                  key={index}
                  className="w-full text-right p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-sm font-medium text-gray-700"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all">
                <Eye className="w-4 h-4" />
                عرض التفاصيل
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                <Settings className="w-4 h-4" />
                إعدادات
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              رؤى الذكاء الاصطناعي للمنصة
            </h3>
            <p className="text-indigo-700">تحليلات متقدمة وتوصيات ذكية</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h4 className="font-semibold text-gray-800">نمو المستخدمين</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              من المتوقع زيادة المستخدمين بنسبة 25% خلال الشهر القادم.
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Target className="w-4 h-4" />
              <span>ثقة 92%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-indigo-600" />
              <h4 className="font-semibold text-gray-800">
                الإيرادات المتوقعة
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              توقع زيادة الإيرادات بـ 18% مع نمو الاشتراكات المدفوعة.
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Award className="w-4 h-4" />
              <span>أداء ممتاز</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-indigo-600" />
              <h4 className="font-semibold text-gray-800">الأمان والاستقرار</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              النظام يعمل بكفاءة عالية مع مستوى أمان ممتاز.
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <CheckCircle className="w-4 h-4" />
              <span>آمن 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAdmin;
