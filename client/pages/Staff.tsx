import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Brain,
  Calendar,
  Clock,
  Star,
  Phone,
  Mail,
  MapPin,
  Activity,
  Users,
  Award,
  TrendingUp,
  Zap,
  Shield,
  UserCheck,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Timer,
  Grid3X3,
  List,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Heart,
  Target,
  BookOpen,
  FileText,
  Download,
  Upload,
  Badge,
  Crown,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const staffMembers = [
  {
    id: 1,
    name: "د. سارة أحمد",
    role: "طبيب أسنان أول",
    specialization: "علاج الجذور",
    experience: 12,
    rating: 4.9,
    patients: 145,
    availability: "متاح",
    phone: "07801234567",
    email: "sara.ahmed@clinic.com",
    aiScore: 96,
    weeklyHours: 40,
    nextAvailable: "اليوم 2:00 مساءً",
    avatar: "س.أ",
    color: "bg-blue-100 text-blue-700",
    specialties: ["علاج الجذور", "جراحة الجذور", "حالات الطوارئ"],
    aiInsights: {
      efficiency: 94,
      patientSatisfaction: 4.9,
      onTimeRate: 98,
      successRate: 96,
    },
    salary: "2500000 د.ع",
    joinDate: "2020-03-15",
    status: "نشط",
    department: "طب الأسنان",
    shift: "نهاري",
  },
  {
    id: 2,
    name: "د. أحمد محمد",
    role: "طبيب أسنان",
    specialization: "جراحة الفم",
    experience: 8,
    rating: 4.7,
    patients: 98,
    availability: "مشغول",
    phone: "07807654321",
    email: "ahmed.mohammed@clinic.com",
    aiScore: 92,
    weeklyHours: 35,
    nextAvailable: "غداً 10:00 صباحاً",
    avatar: "أ.م",
    color: "bg-green-100 text-green-700",
    specialties: ["زراعة الأسنان", "خلع الأسنان", "جراحة اللثة"],
    aiInsights: {
      efficiency: 89,
      patientSatisfaction: 4.7,
      onTimeRate: 95,
      successRate: 93,
    },
    salary: "2000000 د.ع",
    joinDate: "2021-06-10",
    status: "نشط",
    department: "جراحة الفم",
    shift: "نهاري",
  },
  {
    id: 3,
    name: "فاطمة علي",
    role: "مساعدة طبيب أسنان",
    specialization: "الرعاية العامة",
    experience: 5,
    rating: 4.8,
    patients: 75,
    availability: "متاح",
    phone: "07809876543",
    email: "fatima.ali@clinic.com",
    aiScore: 88,
    weeklyHours: 30,
    nextAvailable: "اليوم 11:00 صباحاً",
    avatar: "ف.ع",
    color: "bg-purple-100 text-purple-700",
    specialties: ["تحضير المريض", "تعقيم الأدوات", "متابعة ما بعد العلاج"],
    aiInsights: {
      efficiency: 91,
      patientSatisfaction: 4.8,
      onTimeRate: 97,
      successRate: 88,
    },
    salary: "800000 د.ع",
    joinDate: "2022-01-20",
    status: "نشط",
    department: "الدعم الطبي",
    shift: "نهاري",
  },
  {
    id: 4,
    name: "علي حسن",
    role: "أخصائي تقويم",
    specialization: "تقويم الأسنان",
    experience: 10,
    rating: 4.9,
    patients: 120,
    availability: "في إجازة",
    phone: "07801112223",
    email: "ali.hassan@clinic.com",
    aiScore: 95,
    weeklyHours: 38,
    nextAvailable: "الأسبوع ��لقادم",
    avatar: "ع.ح",
    color: "bg-amber-100 text-amber-700",
    specialties: ["تقويم معدني", "تقويم شفاف", "تقويم الأطفال"],
    aiInsights: {
      efficiency: 93,
      patientSatisfaction: 4.9,
      onTimeRate: 96,
      successRate: 95,
    },
    salary: "2200000 د.ع",
    joinDate: "2019-09-01",
    status: "في إجازة",
    department: "تقويم الأسنان",
    shift: "نهاري",
  },
  {
    id: 5,
    name: "زينب محمود",
    role: "مسؤولة الاستقبال",
    specialization: "خدمة العملاء",
    experience: 3,
    rating: 4.6,
    patients: 200,
    availability: "متاح",
    phone: "07805556667",
    email: "zeinab.mahmoud@clinic.com",
    aiScore: 85,
    weeklyHours: 40,
    nextAvailable: "متاح الآن",
    avatar: "ز.م",
    color: "bg-pink-100 text-pink-700",
    specialties: ["حجز المواعيد", "استقبال المرضى", "إدارة الملفات"],
    aiInsights: {
      efficiency: 87,
      patientSatisfaction: 4.6,
      onTimeRate: 99,
      successRate: 85,
    },
    salary: "600000 د.ع",
    joinDate: "2023-02-15",
    status: "نشط",
    department: "الإدارة",
    shift: "نه��ري",
  },
  {
    id: 6,
    name: "محمد كريم",
    role: "فني الأشعة",
    specialization: "التصوير الطبي",
    experience: 7,
    rating: 4.5,
    patients: 80,
    availability: "متاح",
    phone: "07803334445",
    email: "mohammed.karim@clinic.com",
    aiScore: 90,
    weeklyHours: 35,
    nextAvailable: "اليوم 3:00 مساءً",
    avatar: "م.ك",
    color: "bg-indigo-100 text-indigo-700",
    specialties: ["أشعة سينية", "أشعة بانوراما", "أشعة ثلاثية الأبعاد"],
    aiInsights: {
      efficiency: 88,
      patientSatisfaction: 4.5,
      onTimeRate: 94,
      successRate: 90,
    },
    salary: "1200000 د.ع",
    joinDate: "2021-11-08",
    status: "نشط",
    department: "التصوير الطبي",
    shift: "نهاري",
  },
];

const Staff = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "نشط":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            نشط
          </span>
        );
      case "في إجازة":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Timer className="w-3 h-3" />
            في إجازة
          </span>
        );
      case "غير نشط":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <AlertTriangle className="w-3 h-3" />
            غير نشط
          </span>
        );
      default:
        return null;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "متاح":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            متاح
          </span>
        );
      case "مشغول":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">
            <AlertTriangle className="w-3 h-3" />
            مشغول
          </span>
        );
      case "في إجازة":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700">
            <Timer className="w-3 h-3" />
            في إجازة
          </span>
        );
      default:
        return null;
    }
  };

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || staff.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "all" || staff.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const staffStats = {
    total: staffMembers.length,
    active: staffMembers.filter((s) => s.status === "نشط").length,
    available: staffMembers.filter((s) => s.availability === "متاح").length,
    onLeave: staffMembers.filter((s) => s.status === "في إجازة").length,
    avgRating: (
      staffMembers.reduce((sum, s) => sum + s.rating, 0) / staffMembers.length
    ).toFixed(1),
    totalPatients: staffMembers.reduce((sum, s) => sum + s.patients, 0),
  };

  const departments = Array.from(
    new Set(staffMembers.map((s) => s.department)),
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">إدارة الطاقم</h1>
              <p className="text-teal-100 text-lg mb-4">
                إدارة شاملة لفريق العمل والموارد البشرية
              </p>
              <p className="text-teal-100">
                {staffStats.total} موظف، {staffStats.active} نشط و{" "}
                {staffStats.available} متاح حالياً
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium hover:bg-white/30 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                تصدير الكشوفات
              </button>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-xl font-medium hover:bg-teal-50 transition-all flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                موظف جديد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Bento Style */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Stats */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">إحصائيات الطاقم</h3>
            <Users className="w-6 h-6 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-teal-50 rounded-3xl border border-teal-100">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <p className="text-3xl font-bold text-teal-600 mb-2">
                {staffStats.total}
              </p>
              <p className="text-sm font-medium text-teal-700">
                إجمالي الموظفين
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-3xl border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">
                {staffStats.available}
              </p>
              <p className="text-sm font-medium text-green-700">متاح الآن</p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {staffStats.avgRating}
              </p>
              <p className="text-sm font-medium text-blue-700">متوسط التقييم</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-3xl border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {staffStats.totalPatients}
              </p>
              <p className="text-sm font-medium text-purple-700">
                إجمالي المرضى
              </p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              أداء الفريق الشهري
            </h4>
            <div className="h-32 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl flex items-end justify-center p-4">
              <div className="flex items-end gap-2 h-full w-full">
                {[85, 92, 78, 95, 88, 90, 93, 97, 85, 89, 94, 91].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-teal-600 to-cyan-600 rounded-t-lg flex-1 transition-all duration-300 hover:from-teal-700 hover:to-cyan-700"
                      style={{ height: `${height}%` }}
                    ></div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">توزيع الأقسام</h3>
              <p className="text-sm text-gray-600">حسب التخصص</p>
            </div>
          </div>

          <div className="space-y-4">
            {departments.map((dept, index) => {
              const count = staffMembers.filter(
                (s) => s.department === dept,
              ).length;
              const percentage = Math.round((count / staffStats.total) * 100);
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-purple-500",
                "bg-orange-500",
                "bg-pink-500",
                "bg-indigo-500",
              ];

              return (
                <div key={dept} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{dept}</span>
                    <span className="text-gray-600">{count} موظف</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        colors[index % colors.length],
                      )}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث عن موظف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">جميع الأقسام</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="نشط">نشط</option>
              <option value="في إجازة">في إجازة</option>
              <option value="غير نشط">غير نشط</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-3 rounded-2xl transition-all",
                viewMode === "grid"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-3 rounded-2xl transition-all",
                viewMode === "list"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1",
        )}
      >
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center font-semibold text-lg",
                    staff.color,
                  )}
                >
                  {staff.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors text-lg">
                    {staff.name}
                  </h3>
                  <p className="text-sm text-gray-600">{staff.role}</p>
                  <p className="text-xs text-gray-500">
                    {staff.specialization}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(staff.status)}
                    {getAvailabilityBadge(staff.availability)}
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{staff.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{staff.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>متاح: {staff.nextAvailable}</span>
              </div>
            </div>

            {/* Rating & Experience */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4 border border-yellow-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-800">
                  التقييم والخبرة
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold text-yellow-700">
                    {staff.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-yellow-700">
                  {staff.experience} سنة خبرة
                </span>
                <span className="text-yellow-700">{staff.patients} مريض</span>
              </div>
            </div>

            {/* AI Performance */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-blue-800">
                  أداء الذكاء الاصطناعي
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {staff.aiScore}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-blue-700">الكفاءة</span>
                  <div className="w-full bg-blue-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${staff.aiInsights.efficiency}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-purple-700">الرضا</span>
                  <div className="w-full bg-purple-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-purple-500 h-1 rounded-full"
                      style={{
                        width: `${staff.aiInsights.patientSatisfaction * 20}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-green-700">الالتزام</span>
                  <div className="w-full bg-green-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-green-500 h-1 rounded-full"
                      style={{ width: `${staff.aiInsights.onTimeRate}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <span className="text-red-700">النجاح</span>
                  <div className="w-full bg-red-200 rounded-full h-1 mt-1">
                    <div
                      className="bg-red-500 h-1 rounded-full"
                      style={{ width: `${staff.aiInsights.successRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                التخصصات
              </h4>
              <div className="flex flex-wrap gap-1">
                {staff.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-lg"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Info */}
            <div className="bg-gray-50 rounded-2xl p-3 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">الراتب</span>
                  <p className="font-semibold text-gray-800">{staff.salary}</p>
                </div>
                <div>
                  <span className="text-gray-600">ساعات العمل</span>
                  <p className="font-semibold text-gray-800">
                    {staff.weeklyHours} ساعة/أسبوع
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">تاريخ الانضمام</span>
                  <p className="font-semibold text-gray-800">
                    {new Date(staff.joinDate).toLocaleDateString("ar-IQ")}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">النوبة</span>
                  <p className="font-semibold text-gray-800">{staff.shift}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button className="p-2 text-teal-600 hover:bg-teal-100 rounded-xl transition-all">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-xl transition-all">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Brain className="w-4 h-4 text-blue-500" />
                <span>AI مدعوم</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
