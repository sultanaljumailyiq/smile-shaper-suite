import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  User,
  FileText,
  Eye,
  Edit,
  Star,
  Building2,
  Truck,
  CreditCard,
  Timer,
  Target,
  Activity,
  TrendingUp,
  Award,
  Settings,
  Download,
  Printer,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  sharedClinicData,
  Laboratory,
  LabOrder,
  TreatmentPlan,
} from "@/services/sharedClinicData";

const ClinicOldLab: React.FC = () => {
  const navigate = useNavigate();
  const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLab, setSelectedLab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [orders, labs, plans] = await Promise.all([
        sharedClinicData.getLabOrders(),
        sharedClinicData.getLaboratories(),
        sharedClinicData.getTreatmentPlans(),
      ]);
      setLabOrders(orders);
      setLaboratories(labs);
      setTreatmentPlans(plans);
    } catch (error) {
      console.error("Failed to load lab data:", error);
    }
  };

  // Filter orders based on search, status, and lab
  const filteredOrders = labOrders.filter((order) => {
    const matchesSearch =
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.laboratoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesLab =
      selectedLab === "all" || order.laboratoryId === selectedLab;

    return matchesSearch && matchesStatus && matchesLab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ordered":
        return "bg-blue-100 text-blue-800";
      case "in_progress":
        return "bg-orange-100 text-orange-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      case "installed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ordered":
        return "مطلوب";
      case "in_progress":
        return "قيد التحضير";
      case "ready":
        return "جاهز";
      case "delivered":
        return "مستلم";
      case "installed":
        return "مركب";
      case "cancelled":
        return "ملغي";
      default:
        return "غير محدد";
    }
  };

  const getOrderTypeText = (type: string) => {
    switch (type) {
      case "prosthetics":
        return "أطقم أسنان";
      case "crown":
        return "تيجان";
      case "bridge":
        return "جسور";
      case "implant":
        return "زراعة";
      case "orthodontics":
        return "تقويم";
      default:
        return "أخرى";
    }
  };

  const isOverdue = (order: LabOrder) => {
    const expectedDate = new Date(order.expectedDeliveryDate);
    const today = new Date();
    return (
      expectedDate < today &&
      (order.status === "ordered" || order.status === "in_progress")
    );
  };

  // Statistics
  const stats = {
    total: labOrders.length,
    pending: labOrders.filter(
      (o) => o.status === "ordered" || o.status === "in_progress",
    ).length,
    ready: labOrders.filter((o) => o.status === "ready").length,
    overdue: labOrders.filter((o) => isOverdue(o)).length,
    thisMonth: labOrders.filter(
      (o) => new Date(o.orderDate).getMonth() === new Date().getMonth(),
    ).length,
    totalCost: labOrders.reduce((sum, o) => sum + o.cost, 0),
    unpaid: labOrders.filter((o) => !o.isPaid).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/clinic_old"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  إدارة المختبر
                </h1>
                <p className="text-gray-600">
                  إدارة شاملة لطلبات المختبر والتركيبات
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                تصدير
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                طباعة
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                طلب جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-gray-600">إجمالي الطلبات</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
                <p className="text-gray-600">قيد التحضير</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.ready}
                </p>
                <p className="text-gray-600">جاهز</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.overdue}
                </p>
                <p className="text-gray-600">متأخر</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.thisMonth}
                </p>
                <p className="text-gray-600">هذا الشهر</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="mr-4">
                <p className="text-lg font-bold text-gray-900">
                  {(stats.totalCost / 1000000).toFixed(1)}M
                </p>
                <p className="text-gray-600">إجمالي التكلفة</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.unpaid}
                </p>
                <p className="text-gray-600">غير مدفوع</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث ف�� الطلبات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="ordered">مطلوب</option>
                <option value="in_progress">قيد التحضير</option>
                <option value="ready">جاهز</option>
                <option value="delivered">مستلم</option>
              </select>

              <select
                value={selectedLab}
                onChange={(e) => setSelectedLab(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">��م��ع المختبرات</option>
                {laboratories.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name}
                  </option>
                ))}
              </select>

              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-r-lg",
                    viewMode === "table"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  جدول
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-l-lg border-r border-gray-300",
                    viewMode === "cards"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-500 hover:text-gray-700",
                  )}
                >
                  بطاقات
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Orders Table/Cards */}
        {viewMode === "table" ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المريض
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نوع الطلب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المختبر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ التسليم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التكلفة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الدفع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      إجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className={cn(
                        "hover:bg-gray-50",
                        isOverdue(order) && "bg-red-50",
                      )}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm font-medium text-gray-900">
                              {order.patientName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getOrderTypeText(order.orderType)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.laboratoryName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                        {isOverdue(order) && (
                          <Badge className="bg-red-100 text-red-800 mr-2">
                            متأخر
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(
                          order.expectedDeliveryDate,
                        ).toLocaleDateString("ar-IQ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.cost.toLocaleString()} د.ع
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={
                            order.isPaid
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {order.isPaid ? "مدفوع" : "غير مدفوع"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Link
                            to={`/clinic_old/patient/${order.patientId}`}
                            className="inline-flex"
                          >
                            <Button size="sm" variant="outline">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={cn(
                  "bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow",
                  isOverdue(order)
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200",
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {order.patientName}
                    </h3>
                    <p className="text-gray-600">
                      {getOrderTypeText(order.orderType)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    {isOverdue(order) && (
                      <Badge className="bg-red-100 text-red-800">متأخر</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-4 h-4" />
                    {order.laboratoryName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    التسليم:{" "}
                    {new Date(order.expectedDeliveryDate).toLocaleDateString(
                      "ar-IQ",
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    {order.cost.toLocaleString()} د.ع
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4" />
                    <span
                      className={
                        order.isPaid ? "text-green-600" : "text-red-600"
                      }
                    >
                      {order.isPaid ? "مدفوع" : "غير مدفوع"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    تعديل
                  </Button>
                  <Link
                    to={`/clinic_old/patient/${order.patientId}`}
                    className="flex-1"
                  >
                    <Button size="sm" variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      خطة العلاج
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              لا توجد طلبات
            </h3>
            <p className="text-gray-600 mb-4">
              لا توجد طلبات مختبر مطابقة للبحث
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              إضافة طلب جديد
            </Button>
          </div>
        )}

        {/* Laboratory Partners */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              المختبرات الشريكة
            </h2>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              إضافة مختبر
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laboratories.map((lab) => (
              <div
                key={lab.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {lab.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < Math.floor(lab.qualityRating)
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300",
                          )}
                        />
                      ))}
                      <span className="text-sm text-gray-600 mr-2">
                        {lab.qualityRating}
                      </span>
                    </div>
                  </div>
                  <Badge variant={lab.isActive ? "default" : "secondary"}>
                    {lab.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {lab.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {lab.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {lab.workingHours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    {lab.averageDeliveryTime} أيام توصيل
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    اتصال
                  </Button>
                  <Button size="sm" className="flex-1">
                    طلب جديد
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicOldLab;
