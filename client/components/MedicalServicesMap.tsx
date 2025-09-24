import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Star,
  Clock,
  Navigation,
  Stethoscope,
  Shield,
  Award,
  Users,
  Calendar,
  X,
  ExternalLink,
  CheckCircle,
  Wifi,
  Car,
  CreditCard,
  Globe,
} from "lucide-react";

interface MedicalService {
  id: number;
  name: string;
  type: string;
  address: string;
  rating: number;
  reviews: number;
  distance: string;
  image: string;
  phone: string;
  status: "available" | "busy" | "closed";
  services: string[];
  openHours: string;
  certification: boolean;
  doctor?: string;
  specialties: string[];
  amenities: string[];
  priceRange: string;
  website?: string;
  emergencyPhone?: string;
  description: string;
}

const medicalServices: MedicalService[] = [
  {
    id: 1,
    name: "مركز الرحمة للأشعة",
    type: "م��كز أشعة",
    address: "شارع الكرادة، بغد��د",
    rating: 4.8,
    reviews: 312,
    distance: "0.5 كم",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
    phone: "+964 770 123 4567",
    status: "available",
    services: ["أشعة سينية", "أشعة بانوراما", "أشعة ثلاثية الأبعاد"],
    openHours: "8:00 ص - 8:00 م",
    certification: true,
  },
  {
    id: 2,
    name: "مختبر النور الطبي",
    type: "مختبر تحاليل",
    address: "شارع المنصور، بغداد",
    rating: 4.7,
    reviews: 245,
    distance: "1.2 كم",
    image:
      "https://images.unsplash.com/photo-1583912086123-6b9e4a0f8b99?w=400&h=300&fit=crop",
    phone: "+964 750 987 6543",
    status: "busy",
    services: ["تحاليل دم", "فحوصات هرمونية", "تحاليل بكتيريا"],
    openHours: "7:00 ص - 10:00 م",
    certification: true,
  },
  {
    id: 3,
    name: "صيدلية الأمل",
    type: "صيدلية",
    address: "شارع الأعظمية، بغداد",
    rating: 4.9,
    reviews: 189,
    distance: "0.8 كم",
    image:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=300&fit=crop",
    phone: "+964 780 456 7890",
    status: "available",
    services: ["أدوية عامة", "مستحضرات طبية", "أدوية أسنان"],
    openHours: "24 ساعة",
    certification: true,
  },
  {
    id: 4,
    name: "مركز الإسعاف السريع",
    type: "مركز إسعاف",
    address: "شارع العربي، بغداد",
    rating: 4.6,
    reviews: 156,
    distance: "2.1 كم",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    phone: "+964 760 234 5678",
    status: "available",
    services: ["إسعاف طوارئ", "نقل مرضى", "رعاية فورية"],
    openHours: "24 ساعة",
    certification: true,
  },
];

export default function MedicalServicesMap() {
  const [selectedService, setSelectedService] = useState<MedicalService | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [centeredService, setCenteredService] = useState<MedicalService | null>(null);
  const [showCenteredCard, setShowCenteredCard] = useState(false);

  const filteredServices = medicalServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.services.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesType = filterType === "all" || service.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleMarkerClick = (service: MedicalService, index: number) => {
    setSelectedService(service);
    setCenteredService(service);
    setShowCenteredCard(true);

    // إخفاء البطاقة السفلية لإظهار البطاقة المركزية فقط
    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };

  // دالة لإعادة تعيين الخريطة
  const resetMapPosition = () => {
    setShowCenteredCard(false);
    setCenteredService(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-400";
      case "busy":
        return "bg-yellow-400";
      case "closed":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "متاح";
      case "busy":
        return "مشغول";
      case "closed":
        return "مغلق";
      default:
        return "غير معروف";
    }
  };

  const serviceTypes = [
    { value: "all", label: "جميع الخدمات" },
    { value: "مركز أشعة", label: "مراكز الأشعة" },
    { value: "مختبر تحاليل", label: "المختبرات" },
    { value: "صيدلية", label: "الصيدليات" },
    { value: "مركز إسعاف", label: "مراكز الإسعاف" },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-blue-600" />
          الخدمات الطبية القريبة منك
        </h2>
        <p className="text-gray-600">
          اعثر على أقرب المختبرات ومراكز الأشعة وال��يدليات المعتمدة
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="ابحث عن خدمة طبية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {serviceTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Services List */}
        <div className="lg:col-span-1 space-y-4 max-h-96 overflow-y-auto">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`p-4 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition-all ${
                selectedService?.id === service.id
                  ? "border-blue-500 bg-blue-50"
                  : "hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 ${getStatusColor(service.status)} rounded-full`}
                      />
                      <span className="text-xs text-gray-600">
                        {getStatusText(service.status)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mb-1">{service.type}</p>
                  <p className="text-xs text-gray-600 mb-2 truncate">
                    {service.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-700">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {service.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
            {/* Map Status Indicator */}
            {centeredService && (
              <div className="absolute top-4 left-4 z-40 bg-red-100 border border-red-300 text-red-800 px-3 py-2 rounded-lg shadow-md flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{centeredService.name}</span>
              </div>
            )}
            {/* Map Background */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${"https://cdn.builder.io/api/v1/image/assets%2F38bc499df3b84d0eb31a6baa33de2495%2F0c6f79cdd86c4c8aab90efb7a1ce3db8?format=webp&width=800"})`,
                backgroundSize: "cover",
              }}
            >
              {/* Service Markers */}
              {filteredServices.map((service, index) => {
                const isCentered = centeredService?.id === service.id;
                const isSelected = selectedService?.id === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => handleMarkerClick(service, index)}
                    className={`absolute w-10 h-10 rounded-full border-2 border-white shadow-lg transition-all duration-700 hover:scale-110 ${
                      isCentered
                        ? "bg-red-600 z-50 scale-150 animate-pulse"
                        : isSelected
                        ? "bg-blue-600 z-20 scale-110"
                        : "bg-green-500 z-10"
                    }`}
                    style={{
                      left: isCentered ? "50%" : `${25 + index * 20}%`,
                      top: isCentered ? "50%" : `${35 + (index % 2) * 15}%`,
                      transform: isCentered ? "translate(-50%, -50%)" : "none",
                    }}
                  >
                    <Stethoscope className={`${isCentered ? "w-6 h-6" : "w-4 h-4"} text-white mx-auto transition-all duration-500`} />
                  </button>
                );
              })}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button
                  onClick={resetMapPosition}
                  className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  title="إعادة تعيين الخريطة"
                >
                  <Navigation className="w-5 h-5 text-gray-700" />
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Bottom Service Info Card */}
              {selectedService && !showCenteredCard && (
                <div className="absolute bottom-4 bg-white rounded-xl shadow-xl p-4" style={{ left: '318px', right: '16px', width: '401px' }}>
                  <div className="flex items-start gap-3">
                    <img
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {selectedService.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          {selectedService.certification && (
                            <Shield className="w-4 h-4 text-green-600" />
                          )}
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">
                            {selectedService.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {selectedService.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">
                            {selectedService.openHours}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedService.address} • {selectedService.distance}
                      </p>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          احجز موعداً
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Centered Service Info Card - Above Marker */}
              {showCenteredCard && centeredService && (
                <div
                  className="absolute bg-white rounded-xl shadow-2xl p-4 border-2 border-red-500 z-[60] transition-all duration-700 transform animate-in slide-in-from-top-4"
                  style={{
                    left: "50%",
                    top: "30%",
                    transform: "translate(-50%, -100%)",
                    width: "350px",
                    maxWidth: "95vw"
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={resetMapPosition}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>

                  {/* Arrow pointing to marker */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-red-500"></div>
                  </div>

                  {/* Connecting line to marker */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-0.5 h-8 bg-red-500 mx-auto"></div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img
                      src={centeredService.image}
                      alt={centeredService.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {centeredService.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          {centeredService.certification && (
                            <Shield className="w-4 h-4 text-green-600" />
                          )}
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">
                            {centeredService.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                          {centeredService.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600">
                            {centeredService.openHours}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {centeredService.address} • {centeredService.distance}
                      </p>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                          احجز موعداً
                        </button>
                        <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Stethoscope className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-bold text-blue-600">
            {medicalServices.length}
          </div>
          <div className="text-xs text-gray-600">خدمة طبية</div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-lg font-bold text-green-600">100%</div>
          <div className="text-xs text-gray-600">معتمدة</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Award className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="text-lg font-bold text-yellow-600">4.8</div>
          <div className="text-xs text-gray-600">متوسط التقييم</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg font-bold text-purple-600">5K+</div>
          <div className="text-xs text-gray-600">عميل راضي</div>
        </div>
      </div>
    </section>
  );
}
