import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Plus, Edit, Trash2, Settings, Users, Calendar, MapPin, Phone, Mail, Globe, Copy, Check, ArrowLeft, UserPlus, Stethoscope, Clock, Star, DollarSign, FileText, BarChart3, Shield, Key, Wifi, Camera, Save, X, Search, Filter, MoreVertical, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/contexts/NavigationContext";
import { ChevronDown, ChevronUp } from "lucide-react";
interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  bookingUrl: string;
  logo?: string;
  description: string;
  specialties: string[];
  workingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  doctors: Doctor[];
  isActive: boolean;
  rating: number;
  totalAppointments: number;
  monthlyRevenue: number;
  createdAt: string;
}
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  avatar?: string;
  experience: number;
  rating: number;
  isActive: boolean;
  workingDays: string[];
  consultationFee: number;
  bio: string;
}

// Mock data
const mockClinics: Clinic[] = [{
  id: "1",
  name: "عيادة الابتسامة الذهبية",
  address: "شارع الكرادة، بغداد، العراق",
  phone: "+964 770 123 4567",
  email: "info@goldsmile.iq",
  website: "https://goldsmile.iq",
  bookingUrl: "https://book.goldsmile.iq/appointments",
  description: "عيادة متخصصة في طب الأسنان التجميلي والعلاجي",
  specialties: ["تقويم الأسنان", "زراعة الأسنان", "تجميل الأسنان", "علاج الجذور"],
  workingHours: {
    sunday: {
      open: "09:00",
      close: "17:00",
      isOpen: true
    },
    monday: {
      open: "09:00",
      close: "17:00",
      isOpen: true
    },
    tuesday: {
      open: "09:00",
      close: "17:00",
      isOpen: true
    },
    wednesday: {
      open: "09:00",
      close: "17:00",
      isOpen: true
    },
    thursday: {
      open: "09:00",
      close: "17:00",
      isOpen: true
    },
    friday: {
      open: "10:00",
      close: "14:00",
      isOpen: true
    },
    saturday: {
      open: "09:00",
      close: "17:00",
      isOpen: false
    }
  },
  doctors: [{
    id: "1",
    name: "د. أحمد محمد علي",
    specialty: "تقويم الأسنان",
    email: "dr.ahmed@goldsmile.iq",
    phone: "+964 770 111 2222",
    experience: 10,
    rating: 4.8,
    isActive: true,
    workingDays: ["sunday", "monday", "tuesday", "wednesday", "thursday"],
    consultationFee: 50000,
    bio: "أخصائي تقويم الأسنان مع خبرة 10 سنوات في العلاج والتجميل"
  }, {
    id: "2",
    name: "د. فاطمة حسن",
    specialty: "طب أسنان الأطفال",
    email: "dr.fatima@goldsmile.iq",
    phone: "+964 770 333 4444",
    experience: 8,
    rating: 4.9,
    isActive: true,
    workingDays: ["sunday", "tuesday", "thursday", "friday"],
    consultationFee: 40000,
    bio: "طبيبة أسنان متخصص�� في علا�� الأطفال وطب الأسنان الوقائي"
  }],
  isActive: true,
  rating: 4.8,
  totalAppointments: 1250,
  monthlyRevenue: 15000000,
  createdAt: "2023-01-15"
}, {
  id: "2",
  name: "مركز الأسنان المتقدم",
  address: "حي الجادرية، بغداد، العراق",
  phone: "+964 770 555 6666",
  email: "contact@advanceddental.iq",
  bookingUrl: "https://appointments.advanceddental.iq",
  description: "مركز طبي متكامل لجميع خدمات طب الأسنان",
  specialties: ["جراحة الفم", "زراعة الأسنان", "تركيبات الأسنان"],
  workingHours: {
    sunday: {
      open: "08:00",
      close: "18:00",
      isOpen: true
    },
    monday: {
      open: "08:00",
      close: "18:00",
      isOpen: true
    },
    tuesday: {
      open: "08:00",
      close: "18:00",
      isOpen: true
    },
    wednesday: {
      open: "08:00",
      close: "18:00",
      isOpen: true
    },
    thursday: {
      open: "08:00",
      close: "18:00",
      isOpen: true
    },
    friday: {
      open: "09:00",
      close: "13:00",
      isOpen: true
    },
    saturday: {
      open: "08:00",
      close: "18:00",
      isOpen: false
    }
  },
  doctors: [{
    id: "3",
    name: "د. محمد الجبوري",
    specialty: "جراحة الفم والوجه والفكين",
    email: "dr.mohammed@advanceddental.iq",
    phone: "+964 770 777 8888",
    experience: 15,
    rating: 4.9,
    isActive: true,
    workingDays: ["sunday", "monday", "wednesday", "thursday"],
    consultationFee: 75000,
    bio: "جراح فم ووجه وفكين مع خبرة واسعة في العمليات المعقدة"
  }],
  isActive: true,
  rating: 4.7,
  totalAppointments: 890,
  monthlyRevenue: 12000000,
  createdAt: "2023-03-10"
}];
const mockMedicalStaff = [{
  id: "1",
  name: "د. سارة الكعبي",
  specialty: "طب الأسنان العام",
  isAssigned: false
}, {
  id: "2",
  name: "د. علي الحسني",
  specialty: "تقويم الأسنان",
  isAssigned: false
}, {
  id: "3",
  name: "د. ليلى محمود",
  specialty: "جراحة الفم",
  isAssigned: false
}, {
  id: "4",
  name: "د. حسام العبيدي",
  specialty: "زراعة الأسنان",
  isAssigned: false
}];
export default function AdvancedClinicManagement() {
  const {
    goBack
  } = useNavigation();
  const [clinics, setClinics] = useState<Clinic[]>(mockClinics);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showAddClinic, setShowAddClinic] = useState(false);
  const [showEditClinic, setShowEditClinic] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  const updateClinicField = <K extends keyof Clinic,>(id: string, field: K, value: Clinic[K]) => {
    setClinics(prev => prev.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  };
  const copyBookingUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };
  const getDayName = (day: string) => {
    const days = {
      sunday: "الأحد",
      monday: "الاثنين",
      tuesday: "الثلاثاء",
      wednesday: "الأربعاء",
      thursday: "الخميس",
      friday: "الجمعة",
      saturday: "السبت"
    };
    return days[day] || day;
  };
  const filteredClinics = clinics.filter(clinic => clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) || clinic.address.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="p-3 lg:p-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex-1 max-w-md">
                
              </div>

              <button onClick={() => setShowAddClinic(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg">
                <Plus className="w-5 h-5" />
                إضافة عيادة جديدة
              </button>
            </div>
          </div>

          {/* Stats Overview - Mobile Optimized */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
            <div className="bg-white rounded-xl p-3 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    إجمالي العيادات
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">
                    {clinics.length}
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-indigo-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <Building2 className="w-4 h-4 lg:w-6 lg:h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    إجمالي الأطباء
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">
                    {clinics.reduce((acc, clinic) => acc + clinic.doctors.length, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-green-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    المواعيد الشهرية
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">
                    {clinics.reduce((acc, clinic) => acc + clinic.totalAppointments, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-blue-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <Calendar className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 lg:p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs lg:text-sm">
                    الإيرادات الشهرية
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-gray-900">
                    {(clinics.reduce((acc, clinic) => acc + clinic.monthlyRevenue, 0) / 1000000).toFixed(1)}
                    M د.ع
                  </p>
                </div>
                <div className="w-8 h-8 lg:w-12 lg:h-12 bg-emerald-100 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <DollarSign className="w-4 h-4 lg:w-6 lg:h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Clinics Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {filteredClinics.map(clinic => <div key={clinic.id} className="bg-white rounded-2xl lg:rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Clinic Header - Compact */}
                <div className="p-4 lg:p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl lg:rounded-2xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-gray-900 line-clamp-1">
                          {clinic.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs lg:text-sm text-gray-600">
                            {clinic.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 lg:gap-2">
                      <div className={cn("w-2 h-2 lg:w-3 lg:h-3 rounded-full", clinic.isActive ? "bg-green-500" : "bg-red-500")} />
                      <span className={cn("text-xs font-medium", clinic.isActive ? "text-green-600" : "text-red-600")}>
                        {clinic.isActive ? "نشطة" : "معطلة"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs lg:text-sm mb-3 line-clamp-2">
                    {clinic.description}
                  </p>

                  {/* Horizontal Info Layout for Mobile */}
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-1 lg:gap-2 text-xs lg:text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      <span className="truncate">{clinic.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      <span className="truncate">{clinic.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                      <span className="truncate">{clinic.email}</span>
                    </div>
                  </div>
                </div>

                <div className="px-4 lg:px-6 py-2 flex items-center justify-end border-b border-gray-100">
                  <button onClick={() => toggleExpanded(clinic.id)} className="text-xs lg:text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                    {expandedIds.has(clinic.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    تفاصيل
                  </button>
                </div>

                <div className={expandedIds.has(clinic.id) ? "block" : "hidden"}>
                {/* Booking URL - Compact */}
                <div className="px-4 lg:px-6 py-3 lg:py-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        رابط الحجز
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {clinic.bookingUrl}
                      </p>
                    </div>
                    <button onClick={() => copyBookingUrl(clinic.bookingUrl)} className="flex items-center gap-1 px-2 lg:px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ml-2">
                      {copiedUrl === clinic.bookingUrl ? <Check className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" /> : <Copy className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />}
                      <span className="text-xs hidden lg:inline">
                        {copiedUrl === clinic.bookingUrl ? "تم النسخ" : "نسخ"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Doctors - Compact */}
                <div className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm lg:text-base font-semibold text-gray-900">
                      الكادر الطبي ({clinic.doctors.length})
                    </h4>
                    <button onClick={() => {
                    setSelectedClinic(clinic);
                    setShowAddDoctor(true);
                  }} className="text-indigo-600 hover:text-indigo-700 text-xs lg:text-sm font-medium">
                      إضافة
                    </button>
                  </div>

                  {/* Horizontal Doctors Layout for Mobile */}
                  <div className="flex gap-2 lg:flex-col lg:space-y-3 lg:gap-0 overflow-x-auto pb-2 lg:pb-0">
                    {clinic.doctors.slice(0, 3).map(doctor => <div key={doctor.id} className="flex lg:flex-row items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gray-50 rounded-lg lg:rounded-xl min-w-[160px] lg:min-w-0">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-3 h-3 lg:w-4 lg:h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-xs lg:text-sm truncate">
                            {doctor.name}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {doctor.specialty}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">
                              {doctor.rating}
                            </span>
                          </div>
                        </div>
                      </div>)}
                  </div>

                  {clinic.doctors.length > 3 && <p className="text-xs text-gray-500 text-center mt-2 lg:mt-3">
                      +{clinic.doctors.length - 3} أطباء آخرين
                    </p>}
                </div>

                {/* Inline Edit - Compact */}
                <div className="px-4 lg:px-6 py-4 border-t border-gray-100">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">تعديل المعلومات</h5>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <input value={clinic.name} onChange={e => updateClinicField(clinic.id, "name", e.target.value)} placeholder="اسم العيادة" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input value={clinic.address} onChange={e => updateClinicField(clinic.id, "address", e.target.value)} placeholder="العنوان" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input value={clinic.phone} onChange={e => updateClinicField(clinic.id, "phone", e.target.value)} placeholder="الهاتف" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input value={clinic.email} onChange={e => updateClinicField(clinic.id, "email", e.target.value)} placeholder="البريد الإلكتروني" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input value={clinic.website || ""} onChange={e => updateClinicField(clinic.id, "website", e.target.value)} placeholder="الموقع الإلكتروني" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <input value={clinic.bookingUrl} onChange={e => updateClinicField(clinic.id, "bookingUrl", e.target.value)} placeholder="رابط الحجز" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                    <textarea value={clinic.description} onChange={e => updateClinicField(clinic.id, "description", e.target.value)} placeholder="الوصف" className="lg:col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm min-h-[80px]" />
                  </div>
                </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0">
                  <div className="flex gap-2">
                    <button onClick={() => {
                  setSelectedClinic(clinic);
                  setShowEditClinic(true);
                }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">إدارة</span>
                    </button>

                    <Link to="/clinic" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-medium">إدارة التقارير</span>
                    </Link>

                    <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Empty State */}
          {filteredClinics.length === 0 && <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                لا توجد عيادات
              </h3>
              <p className="text-gray-600 mb-6">
                ابدأ بإضافة عيادة جديدة لإدارة خدماتك الطبية
              </p>
              <button onClick={() => setShowAddClinic(true)} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors mx-auto">
                <Plus className="w-5 h-5" />
                إضافة عيادة جديدة
              </button>
            </div>}
        </div>
      </div>

      {/* Modals would go here - Add Clinic, Edit Clinic, Add Doctor */}

    </div>;
}