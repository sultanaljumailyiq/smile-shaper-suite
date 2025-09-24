import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  User,
  CheckCircle,
  AlertCircle,
  Plus,
  UserPlus,
  Brain,
  Stethoscope,
  ClipboardList,
  Phone,
  MapPin,
  Mail,
  Eye,
  Edit,
  Trash2,
  CalendarDays,
  Timer,
  Users,
  TrendingUp,
  Activity,
  Star,
  Badge,
  Bell,
  Settings,
  X,
  Save,
  FileText,
  MessageSquare,
  AlarmClock,
  Repeat,
  Volume2,
  Smartphone,
  Calendar as CalendarIcon,
  Info,
  Download,
  Upload,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import InteractiveCalendar from "../components/InteractiveCalendar";
import ModernMedicalCheckupModal from "../components/ModernMedicalCheckupModal";
import BookingNotifications from "@/components/BookingNotifications";

const appointments = [
  {
    id: 1,
    time: "07:00",
    patient: "د. صابر مكتافيش",
    treatment: "فحص عام",
    duration: "ساعة واحدة",
    status: "confirmed",
    avatar: "ص.م",
    color: "bg-blue-100 text-blue-700",
    phone: "07801234567",
    email: "saber@example.com",
    priority: "عادي",
    treatmentPlan: {
      stage: "الاستشارة الأولية",
      stepType: "consultation",
      description: "فحص شامل للفم والأسنان وتقييم الحالة العامة",
      progress: 25,
      nextStep: "الفحص السريري التفصيلي",
    },
  },
  {
    id: 2,
    time: "09:00",
    patient: "رفلي جنودين",
    treatment: "فحص عام",
    duration: "09:00 - 10:00",
    status: "finished",
    avatar: "ر.ج",
    color: "bg-green-100 text-green-700",
    phone: "07807654321",
    email: "refli@example.com",
    priority: "عادي",
    treatmentPlan: {
      stage: "الفحص المكتمل",
      stepType: "examination",
      description: "تم إجراء فحص شامل وتسجيل جميع النتائج",
      progress: 100,
    },
  },
  {
    id: 3,
    time: "10:00",
    patient: "سكار ناندیتا",
    treatment: "تنظيف الأسنان",
    duration: "10:00 - 11:00",
    status: "finished",
    avatar: "س.ن",
    color: "bg-purple-100 text-purple-700",
    phone: "07809876543",
    email: "sekar@example.com",
    priority: "عادي",
    treatmentPlan: {
      stage: "التنظيف المكتمل",
      stepType: "treatment",
      description: "تم تنظيف الأسنان وإزالة الجير بنجاح",
      progress: 100,
    },
  },
  {
    id: 4,
    time: "11:00",
    patient: "أحمد علي محمد",
    treatment: "حشو الأسنان",
    duration: "11:00 - 12:30",
    status: "in-progress",
    avatar: "أ.م",
    color: "bg-yellow-100 text-yellow-700",
    phone: "07801112223",
    email: "ahmed@example.com",
    priority: "عاجل",
    treatmentPlan: {
      stage: "العلاج الجاري",
      stepType: "treatment",
      description: "حشو السن رقم 24 - تم تحضير التجويف",
      progress: 60,
      nextStep: "وضع الحشوة النهائية",
    },
  },
  {
    id: 5,
    time: "14:00",
    patient: "فاطمة حسن",
    treatment: "زراعة الأسنان",
    duration: "14:00 - 16:00",
    status: "pending",
    avatar: "ف.ح",
    color: "bg-indigo-100 text-indigo-700",
    phone: "07805556667",
    email: "fatima@example.com",
    priority: "عاجل",
    treatmentPlan: {
      stage: "التحضير للزراعة",
      stepType: "examination",
      description: "تقييم العظم وأخذ القياسات للزراعة",
      progress: 30,
      nextStep: "وضع الغرسة الأولى",
    },
  },
  {
    id: 6,
    time: "16:00",
    patient: "محمد خالد",
    treatment: "تقويم الأسنان",
    duration: "16:00 - 17:00",
    status: "pending",
    avatar: "م.خ",
    color: "bg-pink-100 text-pink-700",
    phone: "07803334445",
    email: "mohammed@example.com",
    priority: "عادي",
    treatmentPlan: {
      stage: "المتابعة الشهرية",
      stepType: "follow-up",
      description: "فحص تقدم التقويم وشد الأسلاك",
      progress: 45,
      nextStep: "تعديل شد الأسلاك",
    },
  },
];

const Reservations = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<"grid" | "list">("grid");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isAdvancedSchedulingOpen, setIsAdvancedSchedulingOpen] =
    useState(false);
  const [isRemindersModalOpen, setIsRemindersModalOpen] = useState(false);
  const [activeReminderTab, setActiveReminderTab] = useState("personal"); // personal, staff, patients
  const [newPatientData, setNewPatientData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
    address: "",
    medicalHistory: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <CheckCircle className="w-3 h-3" />
            مؤكد
          </span>
        );
      case "finished":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            مكتمل
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Timer className="w-3 h-3" />
            جاري
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <Clock className="w-3 h-3" />
            في الانتظار
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "عاجل":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3" />
            عاجل
          </span>
        );
      case "عادي":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700">
            <Badge className="w-3 h-3" />
            عادي
          </span>
        );
      default:
        return null;
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || appointment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const todayStats = {
    total: appointments.length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    finished: appointments.filter((a) => a.status === "finished").length,
    pending: appointments.filter((a) => a.status === "pending").length,
    inProgress: appointments.filter((a) => a.status === "in-progress").length,
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">إدارة الحجوزات</h1>
              <p className="text-indigo-100 text-lg mb-4">
                {new Date().toLocaleDateString("ar-IQ", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-indigo-100">
                لديك {todayStats.total} موعد اليوم، {todayStats.confirmed} مؤكد
                و {todayStats.pending} في الانتظار
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                عرض التقويم
              </button>
              <button
                onClick={() => {
                  setSelectedPatient({
                    name: "مريض جديد",
                    id: "NEW_" + Date.now(),
                    avatar: "م.ج",
                    age: 30,
                    phone: "+964 770 123 4567",
                    email: "newpatient@example.com",
                  });
                  setIsMedicalModalOpen(true);
                }}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                حجز جديد
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Bento Style */}
      <div className="grid grid-cols-12 gap-4">
        {/* Today's Overview */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              نظرة عامة على اليوم
            </h3>
            <CalendarDays className="w-6 h-6 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {todayStats.confirmed}
              </p>
              <p className="text-sm font-medium text-blue-700">مؤكدة</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-3xl border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">
                {todayStats.finished}
              </p>
              <p className="text-sm font-medium text-green-700">مكتملة</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-3xl border border-yellow-100">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-3xl font-bold text-yellow-600 mb-2">
                {todayStats.inProgress}
              </p>
              <p className="text-sm font-medium text-yellow-700">جارية</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-3xl font-bold text-gray-600 mb-2">
                {todayStats.pending}
              </p>
              <p className="text-sm font-medium text-gray-700">معلقة</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                تقدم اليوم
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((todayStats.finished / todayStats.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${(todayStats.finished / todayStats.total) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Minimized Booking Requests under Today's Progress */}
          <div className="mt-6">
            <BookingNotifications
              compact
              hideHeader
              maxItems={5}
              onNotificationAction={(id, action) => {
                console.log("notification action", id, action);
              }}
              onEditAppointment={(n: any) => {
                const initials = n.patient
                  ? n.patient
                      .split(" ")
                      .map((p: string) => p.trim()[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join(".")
                  : "م.ر";
                setSelectedPatient({
                  name: n.patient || "مريض",
                  id: n.id,
                  avatar: initials,
                  age: 30,
                  phone: n.phone || "",
                  email: "patient@example.com",
                });
                setIsMedicalModalOpen(true);
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            إجراءات سريعة
          </h3>
          <div className="space-y-4">
            <button
              onClick={() => {
                setSelectedPatient({
                  name: "مريض جديد",
                  id: "NEW_" + Date.now(),
                  avatar: "م.ج",
                  age: 30,
                  phone: "+964 770 123 4567",
                  email: "newpatient@example.com",
                });
                setIsMedicalModalOpen(true);
              }}
              className="w-full flex items-center gap-4 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="font-medium text-blue-800">حجز جديد</p>
                <p className="text-sm text-blue-600">إضافة موعد جديد</p>
              </div>
            </button>

            <button
              onClick={() => setIsNewPatientModalOpen(true)}
              className="w-full flex items-center gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-all group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="font-medium text-green-800">مريض جديد</p>
                <p className="text-sm text-green-600">تسجيل مريض جديد</p>
              </div>
            </button>

            <button
              onClick={() => setIsAdvancedSchedulingOpen(true)}
              className="w-full flex items-center gap-4 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="font-medium text-purple-800">جدولة متقدمة</p>
                <p className="text-sm text-purple-600">إدارة الجدول الزمني</p>
              </div>
            </button>

            <button
              onClick={() => setIsRemindersModalOpen(true)}
              className="w-full flex items-center gap-4 p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-all group"
            >
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <p className="font-medium text-orange-800">التذكيرات</p>
                <p className="text-sm text-orange-600">إدارة التنبيهات</p>
              </div>
            </button>
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
                placeholder="ال��حث عن مريض أو علاج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="confirmed">مؤكد</option>
              <option value="pending">في الانتظار</option>
              <option value="in-progress">جاري</option>
              <option value="finished">مكتمل</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView("grid")}
              className={cn(
                "p-3 rounded-2xl transition-all",
                selectedView === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedView("list")}
              className={cn(
                "p-3 rounded-2xl transition-all",
                selectedView === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <ClipboardList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group overflow-hidden"
          >
            {/* Header with gradient background */}
            <div className="relative p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-b border-gray-100">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full -translate-y-10 translate-x-10 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full translate-y-8 -translate-x-8 opacity-30"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shadow border border-white/50 backdrop-blur-sm",
                        appointment.color,
                      )}
                    >
                      {appointment.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                        {appointment.patient}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-gray-500" />
                        <p className="text-sm font-medium text-gray-600">
                          {appointment.treatment}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {getPriorityBadge(appointment.priority)}
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/60 rounded-xl transition-all backdrop-blur-sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Time Display */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-indigo-700 text-sm">
                      {appointment.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/50">
                    <Timer className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-700 text-sm">
                      {appointment.duration}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-start">
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-4">
              <div className="hidden">
                <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-all">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      رقم ا��هاتف
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {appointment.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-all">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      البريد الإلكتروني
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {appointment.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCalendarOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  <Eye className="w-4 h-4" />
                  عرض
                </button>
                <button
                  onClick={() => {
                    setSelectedPatient({
                      name: appointment.patient,
                      id: appointment.id.toString(),
                      avatar: appointment.avatar,
                      age: 35,
                      phone: appointment.phone,
                      email: appointment.email,
                    });
                    setIsMedicalModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  <Edit className="w-4 h-4" />
                  تعديل
                </button>
                <button className="p-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
          </div>
        ))}
      </div>

      {/* Interactive Calendar */}
      <InteractiveCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        appointments={appointments.map(apt => ({
          ...apt,
          status: ["pending", "confirmed", "finished", "in-progress"].includes(apt.status) 
            ? apt.status as "pending" | "confirmed" | "finished" | "in-progress"
            : "pending",
          treatmentPlan: {
            ...apt.treatmentPlan,
            stepType: ["consultation", "examination", "treatment", "follow-up"].includes(apt.treatmentPlan.stepType)
              ? apt.treatmentPlan.stepType as "consultation" | "examination" | "treatment" | "follow-up"
              : "consultation"
          }
        }))}
      />

      {/* Modern Medical Checkup Modal */}
      <ModernMedicalCheckupModal
        isOpen={isMedicalModalOpen}
        onClose={() => {
          setIsMedicalModalOpen(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
      />

      {/* New Patient Registration Modal */}
      {isNewPatientModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-3xl text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">تسجيل مريض جديد</h2>
                  <p className="text-green-100">
                    إضافة بيانات مريض جديد إلى النظا��
                  </p>
                </div>
                <button
                  onClick={() => setIsNewPatientModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    المعلومات الشخصية
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الأول
                      </label>
                      <input
                        type="text"
                        value={newPatientData.firstName}
                        onChange={(e) =>
                          setNewPatientData({
                            ...newPatientData,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="أدخل الاسم الأول"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        اسم العائلة
                      </label>
                      <input
                        type="text"
                        value={newPatientData.lastName}
                        onChange={(e) =>
                          setNewPatientData({
                            ...newPatientData,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="أدخل اسم العائلة"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={newPatientData.phone}
                      onChange={(e) =>
                        setNewPatientData({
                          ...newPatientData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="07801234567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={newPatientData.email}
                      onChange={(e) =>
                        setNewPatientData({
                          ...newPatientData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تاريخ الميلاد
                      </label>
                      <input
                        type="date"
                        value={newPatientData.birthDate}
                        onChange={(e) =>
                          setNewPatientData({
                            ...newPatientData,
                            birthDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ا��جنس
                      </label>
                      <select
                        value={newPatientData.gender}
                        onChange={(e) =>
                          setNewPatientData({
                            ...newPatientData,
                            gender: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">اختر الجنس</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان
                    </label>
                    <input
                      type="text"
                      value={newPatientData.address}
                      onChange={(e) =>
                        setNewPatientData({
                          ...newPatientData,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="العنوان كاملاً"
                    />
                  </div>
                </div>

                {/* Medical Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-green-600" />
                    المعلومات الطبية
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      التاريخ المرضي
                    </label>
                    <textarea
                      value={newPatientData.medicalHistory}
                      onChange={(e) =>
                        setNewPatientData({
                          ...newPatientData,
                          medicalHistory: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder="أمراض سابقة، عمليات، حساسية، أدوية..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        جهة اتصال طوارئ
                      </label>
                      <input
                        type="text"
                        value={newPatientData.emergencyContact}
                        onChange={(e) =>
                          setNewPatientData({
                            ...newPatientData,
                            emergencyContact: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="اسم الشخص المسؤول"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الطوارئ
                      </label>
                      <input
                        type="tel"
                        value={newPatientData.emergencyPhone}
                        onChange={(e) =>
                          setNewPatientData({
                            ...newPatientData,
                            emergencyPhone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="07801234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ملاحظات إضافية
                    </label>
                    <textarea
                      value={newPatientData.notes}
                      onChange={(e) =>
                        setNewPatientData({
                          ...newPatientData,
                          notes: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder="ملاحظات خاصة بالمريض..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Here you would typically save the patient data
                    console.log("Patient data:", newPatientData);
                    setIsNewPatientModalOpen(false);
                    setNewPatientData({
                      firstName: "",
                      lastName: "",
                      phone: "",
                      email: "",
                      birthDate: "",
                      gender: "",
                      address: "",
                      medicalHistory: "",
                      emergencyContact: "",
                      emergencyPhone: "",
                      notes: "",
                    });
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  حفظ المريض
                </button>
                <button
                  onClick={() => setIsNewPatientModalOpen(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-600 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Scheduling Modal */}
      {isAdvancedSchedulingOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-t-3xl text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">الجدولة المتقدمة</h2>
                  <p className="text-purple-100">
                    إدارة المواعيد والجدول الزمني للعيادة
                  </p>
                </div>
                <button
                  onClick={() => setIsAdvancedSchedulingOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Scheduling Options */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    جدولة سريع��
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    إنشاء مواعيد جديدة بسرعة
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all">
                    بدء الجدولة
                  </button>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Repeat className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    المواعيد المتكررة
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    جدولة مواعيد دورية
                  </p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition-all">
                    إعداد تكرار
                  </button>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    إعدادات الجدول
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    تخصيص أوقات العمل
                  </p>
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition-all">
                    إدارة الإعدادات
                  </button>
                </div>
              </div>

              {/* Time Slots Management */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  إدارة الفترات الزمنية
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {[
                    "الأحد",
                    "الاثنين",
                    "الثلاثاء",
                    "الأربعاء",
                    "الخميس",
                    "الجمعة",
                    "السبت",
                  ].map((day, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl border border-gray-200"
                    >
                      <h4 className="font-semibold text-gray-900 mb-3 text-center">
                        {day}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>الفترة الصباحية</span>
                          <span className="text-green-600">8:00 - 12:00</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>الفترة المسائية</span>
                          <span className="text-blue-600">14:00 - 18:00</span>
                        </div>
                        <button className="w-full text-xs text-purple-600 hover:text-purple-800 transition-all">
                          تعديل الأوقات
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Templates */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  قوالب المواعيد
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      فحص عام
                    </h4>
                    <p className="text-sm text-blue-700 mb-2">30 دقيقة</p>
                    <p className="text-xs text-blue-600">
                      فحص روتيني شامل للأسنان
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-900 mb-2">
                      تنظيف الأسنان
                    </h4>
                    <p className="text-sm text-green-700 mb-2">45 دقيقة</p>
                    <p className="text-xs text-green-600">
                      تنظيف وتلميع الأسنان
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      ��راعة الأسنان
                    </h4>
                    <p className="text-sm text-purple-700 mb-2">120 دقيقة</p>
                    <p className="text-xs text-purple-600">عملية زراعة كاملة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminders Management Modal */}
      {isRemindersModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          dir="rtl"
        >
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-t-3xl text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">إدارة التذكيرات</h2>
                  <p className="text-orange-100">
                    تنظيم وإرسال التنبيهات للمرضى والطاقم الطبي
                  </p>
                </div>
                <button
                  onClick={() => setIsRemindersModalOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Reminder Types */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl border border-blue-200">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    رسائل نصية
                  </h3>
                  <p className="text-xs text-blue-700">تذكيرات عبر SMS</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl border border-green-200">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    مكالمات هاتفية
                  </h3>
                  <p className="text-xs text-green-700">تذكيرات صوتية</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-900 mb-1">
                    بريد إلكتروني
                  </h3>
                  <p className="text-xs text-purple-700">تذك��رات م��صلة</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl border border-orange-200">
                  <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center mb-3">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-orange-900 mb-1">
                    إشعارات التطبيق
                  </h3>
                  <p className="text-xs text-orange-700">تنبيهات فورية</p>
                </div>
              </div>

              {/* Active Reminders */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlarmClock className="w-5 h-5 text-orange-600" />
                  التذكيرات النشطة
                </h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          تذكير موعد - د. صابر مكت��فيش
                        </h4>
                        <p className="text-sm text-gray-600">
                          موعد غداً الساعة 9:00 صباحاً
                        </p>
                        <p className="text-xs text-blue-600">
                          سيتم الإرسال قبل 24 ساعة
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        مجدول
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          متابعة العلاج - فاطمة حسن
                        </h4>
                        <p className="text-sm text-gray-600">
                          تذكير بجلسة المتابعة الأسبوع القادم
                        </p>
                        <p className="text-xs text-green-600">
                          سيتم الإرسال يوم الأحد
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        معلق
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          رسالة ترحيب - محمد خالد
                        </h4>
                        <p className="text-sm text-gray-600">
                          رسالة شكر وتعليمات ما بعد العلاج
                        </p>
                        <p className="text-xs text-purple-600">
                          تم الإرسال بنجاح
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        مرسل
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reminder Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-orange-600" />
                    إعدادات التذكيرات
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">
                          تذكيرات المواعيد
                        </p>
                        <p className="text-sm text-gray-600">
                          قبل 24 ساعة من الموعد
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">
                          تذكيرات المتابعة
                        </p>
                        <p className="text-sm text-gray-600">
                          أسبوع بعد انتهاء العلاج
                        </p>
                      </div>
                      <button className="w-12 h-6 bg-gray-300 rounded-full flex items-center justify-start px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">
                          تذكيرات الأدوية
                        </p>
                        <p className="text-sm text-gray-600">حسب جدول الدواء</p>
                      </div>
                      <button className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-orange-600" />
                    إنشاء تذكير جديد
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نوع التذكير
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>موعد قادم</option>
                        <option>متابعة علاج</option>
                        <option>تذكير دواء</option>
                        <option>فحص دوري</option>
                        <option>رسالة شخصية</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المريض
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option>د. صابر مكتافيش</option>
                        <option>رفلي جنودين</option>
                        <option>فاطمة حسن</option>
                        <option>محمد خالد</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        وقت الإرسال
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        نص التذكير
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        placeholder="اكتب نص التذكير هنا..."
                      />
                    </div>

                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-all flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" />
                      إنشاء التذكير
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
