import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Brain,
  Stethoscope,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Eye,
  Activity,
  Zap,
  Shield,
  Target,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Award,
  Users,
  Timer,
  BarChart3,
  Heart,
  Scissors,
  Wrench,
  Microscope,
  Pill,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  BookOpen,
  Settings,
  CheckCircle,
  Play,
  Pause,
  ArrowRight,
  Download,
  Upload,
  Camera,
  Video,
  MessageSquare,
  AlertTriangle,
  Bookmark,
  Share2,
  Printer,
  Save,
  RefreshCw,
  X,
  ChevronDown,
  ChevronRight,
  Info,
  MapPin,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  User,
  Badge,
} from "lucide-react";
import { cn } from "@/lib/utils";

const treatments = [
  {
    id: 1,
    name: "علاج جذور الأسنان",
    arabicName: "Root Canal Treatment",
    category: "علاج الجذور",
    duration: "90 دقيقة",
    price: "800-1200 د.ع",
    aiSuccess: 94,
    difficulty: "متقدم",
    equipment: ["ميكروسكوب طبي", "آلة حفر دقيقة", "أجهزة تصوير"],
    description: "علاج الجذور بمساعدة الذكاء الاصطناعي مع التحليل اللحظي",
    steps: 8,
    popularity: 85,
    lastUpdate: "2024-01-15",
    provider: "Dr. Sarah Johnson",
    status: "نشط",
    completionRate: 92,
    patientSatisfaction: 4.8,
    complications: 2,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "زراعة الأسنان",
    arabicName: "Dental Implants",
    category: "الجراحة",
    duration: "120 دقيقة",
    price: "1500-2500 د.ع",
    aiSuccess: 89,
    difficulty: "خبير",
    equipment: ["مثقاب جراحي", "غرسات التيتانيوم", "أجهزة تصوير ثلاثي"],
    description: "زراعة الأسنان بتقنية التوجيه الجراحي المدعوم بالذكاء الاصطناعي",
    steps: 12,
    popularity: 78,
    lastUpdate: "2024-01-10",
    provider: "Dr. Michael Chen",
    status: "نشط",
    completionRate: 87,
    patientSatisfaction: 4.9,
    complications: 1,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "تقويم الأسنان الذكي",
    arabicName: "Smart Orthodontics",
    category: "التقويم",
    duration: "45 دقيقة",
    price: "2000-4000 د.ع",
    aiSuccess: 96,
    difficulty: "متوسط",
    equipment: ["أقواس ذكية", "أسلاك تقويم", "ماسح ثلاثي الأبعاد"],
    description: "تقويم الأسنان بمراقبة ذكية وتعديل تلقائي للضغط",
    steps: 6,
    popularity: 92,
    lastUpdate: "2024-01-18",
    provider: "Dr. Lisa Rodriguez",
    status: "نشط",
    completionRate: 95,
    patientSatisfaction: 4.7,
    complications: 1,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "تبييض الأسنان بالليزر",
    arabicName: "Laser Teeth Whitening",
    category: "التجميل",
    duration: "60 دقيقة",
    price: "300-600 د.ع",
    aiSuccess: 98,
    difficulty: "مبتدئ",
    equipment: ["جهاز ليزر طبي", "مواد تبييض", "واقيات اللثة"],
    description: "تبييض فوري وآمن بتقنية الليزر المتطورة",
    steps: 4,
    popularity: 88,
    lastUpdate: "2024-01-20",
    provider: "Dr. Amanda White",
    status: "نشط",
    completionRate: 98,
    patientSatisfaction: 4.6,
    complications: 0,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=200&fit=crop"
  },
  {
    id: 5,
    name: "جراحة الفكين",
    arabicName: "Jaw Surgery",
    category: "الجراحة",
    duration: "180 دقيقة",
    price: "3000-5000 د.ع",
    aiSuccess: 91,
    difficulty: "خبير",
    equipment: ["معدات جراحية متقدمة", "أجهزة تصوير", "مواد زراعة"],
    description: "جراحة تصحيحية للفكين بمساعدة التصوير ثلاثي الأبعاد",
    steps: 15,
    popularity: 65,
    lastUpdate: "2024-01-12",
    provider: "Dr. Robert Kim",
    status: "نشط",
    completionRate: 89,
    patientSatisfaction: 4.9,
    complications: 3,
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=300&h=200&fit=crop"
  },
  {
    id: 6,
    name: "علاج اللثة المتقدم",
    arabicName: "Advanced Periodontal Treatment",
    category: "علاج اللثة",
    duration: "75 دقيقة",
    price: "500-900 د.ع",
    aiSuccess: 93,
    difficulty: "متقدم",
    equipment: ["أدوات جراحة اللثة", "ليزر طبي", "مواد تجديد"],
    description: "علاج شامل لأمراض اللثة مع تجديد الأنسجة",
    steps: 10,
    popularity: 72,
    lastUpdate: "2024-01-16",
    provider: "Dr. Jennifer Park",
    status: "نشط",
    completionRate: 90,
    patientSatisfaction: 4.5,
    complications: 2,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop"
  }
];

const categories = [
  { id: "all", name: "جميع العلاجات", count: treatments.length, color: "gray" },
  { id: "root-canal", name: "علاج الجذور", count: 1, color: "blue" },
  { id: "surgery", name: "الجراحة", count: 2, color: "red" },
  { id: "orthodontics", name: "التقويم", count: 1, color: "green" },
  { id: "cosmetic", name: "التجميل", count: 1, color: "purple" },
  { id: "periodontal", name: "علاج اللثة", count: 1, color: "orange" },
];

const difficultyLevels = {
  "مبتدئ": { color: "green", percentage: 25 },
  "متوسط": { color: "blue", percentage: 50 },
  "متقدم": { color: "orange", percentage: 75 },
  "خبير": { color: "red", percentage: 100 }
};

const Treatments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || treatment.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTreatments = [...filteredTreatments].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.popularity - a.popularity;
      case "success":
        return b.aiSuccess - a.aiSuccess;
      case "price":
        return parseInt(a.price.split("-")[0]) - parseInt(b.price.split("-")[0]);
      case "duration":
        return parseInt(a.duration) - parseInt(b.duration);
      default:
        return 0;
    }
  });

  const openTreatmentDetail = (treatment: any) => {
    setSelectedTreatment(treatment);
    setIsDetailModalOpen(true);
  };

  const TreatmentCard = ({ treatment }: { treatment: any }) => (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group">
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold text-white",
            treatment.status === "نشط" ? "bg-green-500" : "bg-red-500"
          )}>
            {treatment.status}
          </span>
        </div>

        {/* AI Success Score */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span className="text-sm font-bold">{treatment.aiSuccess}%</span>
        </div>

        {/* Difficulty Level */}
        <div className="absolute bottom-4 right-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold text-white",
            difficultyLevels[treatment.difficulty as keyof typeof difficultyLevels].color === "green" && "bg-green-500",
            difficultyLevels[treatment.difficulty as keyof typeof difficultyLevels].color === "blue" && "bg-blue-500",
            difficultyLevels[treatment.difficulty as keyof typeof difficultyLevels].color === "orange" && "bg-orange-500",
            difficultyLevels[treatment.difficulty as keyof typeof difficultyLevels].color === "red" && "bg-red-500"
          )}>
            {treatment.difficulty}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {treatment.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{treatment.arabicName}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                {treatment.category}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{treatment.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-gray-900">{treatment.duration}</span>
            </div>
            <p className="text-xs text-gray-600">المدة</p>
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-gray-900">{treatment.price}</span>
            </div>
            <p className="text-xs text-gray-600">السعر</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">معدل النجاح</span>
            <span className="font-bold text-green-600">{treatment.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${treatment.completionRate}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">رضا المرضى</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-bold text-gray-900">{treatment.patientSatisfaction}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => openTreatmentDetail(treatment)}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all font-medium flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            عرض التفاصيل
          </button>
          <button className="p-3 border border-gray-300 rounded-xl hover:border-gray-400 transition-all">
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-3 border border-gray-300 rounded-xl hover:border-gray-400 transition-all">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const TreatmentDetailModal = () => {
    if (!selectedTreatment || !isDetailModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={selectedTreatment.image}
              alt={selectedTreatment.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{selectedTreatment.name}</h2>
              <p className="text-white/90 text-lg mb-4">{selectedTreatment.description}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Brain className="w-5 h-5" />
                  <span className="font-bold">{selectedTreatment.aiSuccess}% نجاح AI</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5" />
                  <span className="font-bold">{selectedTreatment.patientSatisfaction} تقييم</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <Users className="w-5 h-5" />
                  <span className="font-bold">{selectedTreatment.popularity}% شعبية</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-96">
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Treatment Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات العلاج</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">المدة</p>
                      <p className="font-bold text-gray-900">{selectedTreatment.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">السعر</p>
                      <p className="font-bold text-gray-900">{selectedTreatment.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">عدد الخطوات</p>
                      <p className="font-bold text-gray-900">{selectedTreatment.steps} خطوة</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">مستوى الصعوبة</p>
                      <p className="font-bold text-gray-900">{selectedTreatment.difficulty}</p>
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">المعدات المطلوبة</h3>
                  <div className="grid gap-3">
                    {selectedTreatment.equipment.map((item: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">الأداء والإحصائيات</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">معدل الإكمال</span>
                        <span className="font-bold text-green-600">{selectedTreatment.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full"
                          style={{ width: `${selectedTreatment.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">المضاعفات</span>
                        <span className="font-bold text-red-600">{selectedTreatment.complications}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-red-500 h-3 rounded-full"
                          style={{ width: `${selectedTreatment.complications * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Provider Info */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">مقدم العلاج</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedTreatment.provider}</p>
                      <p className="text-sm text-gray-600">طبيب متخصص</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200">
                      <Phone className="w-4 h-4" />
                      اتصال
                    </button>
                    <button className="w-full flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200">
                      <Mail className="w-4 h-4" />
                      مراسلة
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                      <Calendar className="w-4 h-4" />
                      جدولة علاج
                    </button>
                    <button className="w-full flex items-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                      <Copy className="w-4 h-4" />
                      نسخ البروتوكول
                    </button>
                    <button className="w-full flex items-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                      <Download className="w-4 h-4" />
                      تصدير التفاصيل
                    </button>
                    <button className="w-full flex items-center gap-2 p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
                      <BookOpen className="w-4 h-4" />
                      دليل العلاج
                    </button>
                  </div>
                </div>

                {/* Last Update */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">آخر تحديث</span>
                  </div>
                  <p className="text-sm text-purple-700">{selectedTreatment.lastUpdate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">إدارة العلاجات</h1>
              <p className="text-blue-100 text-lg mb-4">نظام ذكي لإدارة البروتوكولات والعلاجات الطبية</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Activity className="w-5 h-5" />
                  <span className="font-medium">{treatments.length} علاج نشط</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">تقنية AI متقدمة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">4.8 تقييم متوسط</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-medium hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                إضافة علاج
              </button>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-all flex items-center gap-2">
                <Upload className="w-5 h-5" />
                استيراد بروتوكولات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن العلاجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="popularity">الأكثر شعبية</option>
              <option value="success">الأعلى نجاحاً</option>
              <option value="price">السعر</option>
              <option value="duration">المدة</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                )}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-xl transition-all",
                  viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Export */}
            <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all">
              <Download className="w-4 h-4" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "إجمالي العلاجات", value: treatments.length, change: "+2", icon: Activity, color: "blue" },
          { title: "متوسط النجاح", value: `${Math.round(treatments.reduce((acc, t) => acc + t.aiSuccess, 0) / treatments.length)}%`, change: "+3%", icon: TrendingUp, color: "green" },
          { title: "متوسط الرضا", value: `${(treatments.reduce((acc, t) => acc + t.patientSatisfaction, 0) / treatments.length).toFixed(1)}`, change: "+0.2", icon: Star, color: "yellow" },
          { title: "العلاجات النشطة", value: treatments.filter(t => t.status === "نشط").length, change: "0", icon: CheckCircle, color: "purple" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full bg-${stat.color}-100 text-${stat.color}-700`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Treatments Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedTreatments.map((treatment) => (
            <TreatmentCard key={treatment.id} treatment={treatment} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {sortedTreatments.map((treatment, index) => (
              <div key={treatment.id} className="p-6 hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-6">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{treatment.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {treatment.category}
                      </span>
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full",
                        treatment.status === "نشط" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {treatment.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{treatment.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {treatment.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {treatment.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        {treatment.aiSuccess}% نجاح
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {treatment.patientSatisfaction}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openTreatmentDetail(treatment)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Treatment Detail Modal */}
      <TreatmentDetailModal />
    </div>
  );
};

export default Treatments;
