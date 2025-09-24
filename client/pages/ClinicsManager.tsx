import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Link as LinkIcon,
  Users,
  Calendar,
  BarChart3,
  ClipboardList,
  Star,
  Shield,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ClinicService } from "@/services/clinicService";
import { sharedClinicData } from "@/services/sharedClinicData";
import ClinicsManagerSubNav from "@/components/ClinicsManagerSubNav";
import { useSearchParams } from "react-router-dom";
import ClinicsStaffManager from "@/components/ClinicsStaffManager";

interface Clinic {
  id: string;
  clinicId?: string;
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  rating?: number;
  totalReviews?: number;
  verified?: boolean;
  city?: string;
  bookingLink?: string;
  staffCount?: number;
  upcomingAppointments?: number;
  location?: { latitude: number; longitude: number };
}

const legacyClinics: Clinic[] = [
  {
    id: "1",
    clinicId: "legacy-1",
    name: "عيادة الابتسامة الذهبية",
    address: "شارع الكرادة، بغداد، العراق",
    phone: "+964 770 123 4567",
    rating: 4.8,
    totalReviews: 1250,
    verified: true,
    city: "بغداد",
    bookingLink: "https://book.goldsmile.iq/appointments",
    staffCount: 8,
    upcomingAppointments: 34,
  },
  {
    id: "2",
    clinicId: "legacy-2",
    name: "مركز الأسنان ا��متقدم",
    address: "حي الجادرية، بغداد، العراق",
    phone: "+964 770 555 6666",
    rating: 4.7,
    totalReviews: 890,
    verified: true,
    city: "بغداد",
    bookingLink: "https://appointments.advanceddental.iq",
    staffCount: 12,
    upcomingAppointments: 21,
  },
];

export default function ClinicsManager() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [defaultSystem, setDefaultSystem] = useState<"new" | "old">("new");
  const [params] = useSearchParams();
  const activeTab =
    (params.get("tab") as
      | "overview"
      | "list"
      | "staff"
      | "appointments"
      | "reports") || "overview";
  const [stats, setStats] = useState<{
    patients: number;
    appointments: number;
    totalRevenue: number;
  }>({ patients: 0, appointments: 0, totalRevenue: 0 });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const cfg = await sharedClinicData
          .getSystemConfig()
          .catch(() => null as any);
        if (mounted && cfg?.defaultClinicSystem)
          setDefaultSystem(cfg.defaultClinicSystem);
      } catch {}
      try {
        const [patients, appointments, financial] = await Promise.all([
          sharedClinicData.getPatients(),
          sharedClinicData.getAppointments(),
          sharedClinicData.getFinancialRecords(),
        ]);
        if (mounted) {
          const totalRevenue = financial
            .filter((r: any) => r.type === "income")
            .reduce((s: any, r: any) => s + r.amount, 0);
          setStats({
            patients: patients.length,
            appointments: appointments.length,
            totalRevenue,
          });
        }
      } catch {}
      try {
        const userData = localStorage.getItem("user_data");
        const user = userData ? JSON.parse(userData) : null;
        const list = user?.id
          ? await ClinicService.getDoctorClinics(user.id)
          : await ClinicService.getAllClinics();
        if (mounted) {
          const finalList =
            Array.isArray(list) && list.length > 0
              ? (list as any)
              : legacyClinics;
          setClinics(finalList);
          try {
            const minimal = finalList.map((c: any) => ({
              id: c.id,
              name: c.name || `عيادة ${c.id}`,
            }));
            localStorage.setItem("clinics_cache", JSON.stringify(minimal));
          } catch {}
          const stored = localStorage.getItem("active_clinic_id");
          setSelectedClinicId(
            stored && finalList.find((c: any) => c.id === stored)
              ? stored
              : finalList[0]?.id || null,
          );
        }
      } catch (e) {
        console.error(e);
        if (mounted) {
          setClinics(legacyClinics);
          const stored = localStorage.getItem("active_clinic_id");
          setSelectedClinicId(
            stored && legacyClinics.find((c: any) => c.id === stored)
              ? stored
              : legacyClinics[0]?.id || null,
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const createClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creating) return;
    try {
      setCreating(true);
      const userData = localStorage.getItem("user_data");
      const user = userData ? JSON.parse(userData) : null;
      const latitude = parseFloat(form.latitude || "0");
      const longitude = parseFloat(form.longitude || "0");
      const payload: any = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: `${form.address}${form.city ? `، ${form.city}` : ""}`.trim(),
        latitude,
        longitude,
        ownerId: user?.id || "anonymous",
        bookingLink: "",
      };
      const created = await ClinicService.createClinic(payload);
      setClinics((prev) => [created as any, ...prev]);
      setForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      console.error("Failed to create clinic", err);
      alert("تعذر إنشاء العيادة. يرجى المحاولة لاحقاً.");
    } finally {
      setCreating(false);
    }
  };

  const openClinicSystem = (mode: "new" | "old") => {
    if (mode === "new") navigate("/clinic");
    else navigate("/clinic_old");
  };

  const bookingPathFor = (c: Clinic) => {
    if (c?.clinicId) return `/booking/${c.clinicId}`;
    return "/booking/unknown";
  };

  const getClinicPath = (segment: string) =>
    defaultSystem === "new"
      ? segment === "dashboard"
        ? "/clinic"
        : `/clinic/${segment}`
      : segment === "dashboard"
        ? "/clinic_old"
        : `/clinic_old/${segment}`;

  const totals = useMemo(() => {
    const verified = clinics.filter((c) => c.verified).length;
    const staff = clinics.reduce((sum, c) => sum + (c.staffCount || 0), 0);
    const upcoming = clinics.reduce(
      (sum, c) => sum + (c.upcomingAppointments || 0),
      0,
    );
    return { clinics: clinics.length, verified, staff, upcoming };
  }, [clinics]);

  const copyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  إدارة العيادات
                </h1>
                <p className="text-xs text-gray-600">
                  النظام يدعم تعدد العيادات لكل مستخدم مع طاقم خاص لكل عيادة
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {clinics.length > 0 && (
                <div className="hidden md:flex items-center gap-2 mr-2">
                  <label className="text-xs text-gray-500">
                    العيادة الحالية
                  </label>
                  <select
                    value={selectedClinicId || ""}
                    onChange={(e) =>
                      setSelectedClinicId(e.target.value || null)
                    }
                    className="px-2 py-1 rounded-lg border text-sm"
                    title="تبديل العيادة"
                  >
                    {clinics.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name || `عيادة ${c.id}`}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (selectedClinicId) {
                        localStorage.setItem(
                          "active_clinic_id",
                          selectedClinicId,
                        );
                        const chosen = clinics.find(
                          (c) => c.id === selectedClinicId,
                        );
                        if (chosen?.name)
                          localStorage.setItem(
                            "active_clinic_name",
                            chosen.name,
                          );
                      }
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    حفظ الاختيار
                  </button>
                </div>
              )}
              <button
                onClick={() => openClinicSystem(defaultSystem)}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm"
              >
                فتح النظام {defaultSystem === "new" ? "الحديث" : "القديم"}
              </button>
              <button
                onClick={() =>
                  openClinicSystem(defaultSystem === "new" ? "old" : "new")
                }
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm"
              >
                التبديل إلى {defaultSystem === "new" ? "القديم" : "ا��حديث"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ClinicsManagerSubNav />

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 bg-white rounded-2xl border">
                <div className="text-xs text-gray-500">عدد العيادات</div>
                <div className="text-2xl font-bold text-gray-900">
                  {totals.clinics}
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border">
                <div className="text-xs text-gray-500">العيادات الموثقة</div>
                <div className="text-2xl font-bold text-emerald-600">
                  {totals.verified}
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border">
                <div className="text-xs text-gray-500">إجمالي الطاقم</div>
                <div className="text-2xl font-bold text-blue-600">
                  {totals.staff}
                </div>
              </div>
              <div className="p-4 bg-white rounded-2xl border">
                <div className="text-xs text-gray-500">مواعيد قادمة</div>
                <div className="text-2xl font-bold text-purple-600">
                  {totals.upcoming}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  تقارير سريعة
                </h3>
                <Link to="/clinic/reports" className="text-blue-600 text-sm">
                  كل التقارير
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link
                  to={getClinicPath("reports")}
                  className="p-4 rounded-xl border hover:bg-gray-50"
                >
                  تق��ير المواعيد
                </Link>
                <Link
                  to={getClinicPath("reports")}
                  className="p-4 rounded-xl border hover:bg-gray-50"
                >
                  تقرير المرضى
                </Link>
                <Link
                  to={getClinicPath("reports")}
                  className="p-4 rounded-xl border hover:bg-gray-50"
                >
                  تقرير الإيرادات
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "list" && (
          <>
            {/* Create Clinic */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-600" /> إضافة عيادة جديدة
                </h2>
              </div>
              <form
                onSubmit={createClinic}
                className="grid grid-cols-1 md:grid-cols-6 gap-3"
              >
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="اسم العيادة"
                  className="md:col-span-2 border rounded-xl px-3 py-2"
                />
                <input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="رقم الهاتف"
                  className="border rounded-xl px-3 py-2"
                />
                <input
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="المدينة"
                  className="border rounded-xl px-3 py-2"
                />
                <input
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  placeholder="العنوان"
                  className="md:col-span-2 border rounded-xl px-3 py-2"
                />
                <input
                  value={form.latitude}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, latitude: e.target.value }))
                  }
                  placeholder="Latitude"
                  className="border rounded-xl px-3 py-2"
                />
                <input
                  value={form.longitude}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, longitude: e.target.value }))
                  }
                  placeholder="Longitude"
                  className="border rounded-xl px-3 py-2"
                />
                <button
                  disabled={creating || !form.name.trim()}
                  className={cn(
                    "md:col-span-2 px-4 py-2 rounded-xl text-white",
                    creating
                      ? "bg-gray-400"
                      : "bg-purple-600 hover:bg-purple-700",
                  )}
                >
                  {creating ? "جارٍ الإنشاء..." : "إنشاء العيادة"}
                </button>
              </form>
            </div>

            {/* Clinics List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-gray-600">جارٍ التحميل...</div>
              ) : clinics.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">
                  لا توجد عيادات بعد. ابدأ بإضافة عيادتك الأولى.
                </div>
              ) : (
                clinics.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-gray-900">
                              {c.name || "عيادة بدون اسم"}
                            </h3>
                            {c.verified && (
                              <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                                <Shield className="w-3 h-3" /> موثقة
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1">
                            {c.address && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {c.address}
                              </span>
                            )}
                            {c.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {c.phone}
                              </span>
                            )}
                            {typeof c.rating === "number" && (
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500" />
                                {c.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" /> الطاقم:{" "}
                              {c.staffCount ?? 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> مواعيد قادمة:{" "}
                              {c.upcomingAppointments ?? 0}
                            </span>
                            {c.clinicId && (
                              <button
                                onClick={() => copyId(c.clinicId!)}
                                className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                                title="نسخ المعرف"
                              >
                                {copiedId === c.clinicId ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>المعرف: {c.clinicId}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={bookingPathFor(c)}
                          className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm flex items-center gap-2"
                        >
                          <LinkIcon className="w-4 h-4" /> رابط الحجز
                        </Link>
                        <Link
                          to={`/clinic/reports?clinic=${encodeURIComponent(c.id)}`}
                          className="px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-sm flex items-center gap-2"
                        >
                          <BarChart3 className="w-4 h-4" /> التقارير
                        </Link>
                        <button
                          onClick={() => openClinicSystem("new")}
                          className="px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm"
                        >
                          فتح الواجهة الحديثة
                        </button>
                        <button
                          onClick={() => openClinicSystem("old")}
                          className="px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-xl text-sm"
                        >
                          فتح الواجهة القديمة
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <ClipboardList className="w-4 h-4" /> ملخص سريع
                        </span>
                        <span className="font-bold text-gray-900">
                          {(c.upcomingAppointments ?? 0) + (c.staffCount ?? 0)}
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-sm">
                        <span className="text-gray-600">المرضى</span>
                        <span className="font-bold text-gray-900">
                          {stats.patients}
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-sm">
                        <span className="text-gray-600">المواعيد</span>
                        <span className="font-bold text-gray-900">
                          {stats.appointments}
                        </span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-sm">
                        <span className="text-gray-600">الإيرادات</span>
                        <span className="font-bold text-gray-900">
                          {stats.totalRevenue.toLocaleString("ar-IQ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "staff" && (
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              إدارة الطاقم
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              إضافة أعضاء الطاقم ل��ل عيادة، تفعيل/إيقاف، وإدارة كلمات المرور
              المؤقتة.
            </p>
            {clinics.length === 0 ? (
              <div className="text-sm text-gray-600">
                لا توجد عيادات. أضف عيادة أولاً من تبويب "عياداتي".
              </div>
            ) : (
              <ClinicsStaffManager clinics={clinics} />
            )}
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              ملخص الحجوزات
            </h3>
            <div className="space-y-3">
              {clinics.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl border"
                >
                  <div className="text-sm text-gray-800">
                    {c.name || "عيادة"} • القادمة: {c.upcomingAppointments ?? 0}
                  </div>
                  <Link
                    to={getClinicPath("reservations")}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                  >
                    عرض الحجوزات
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">التقارير</h3>
            <div className="space-y-3">
              {clinics.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl border"
                >
                  <div className="text-sm text-gray-800">
                    {c.name || "عيادة"}
                  </div>
                  <Link
                    to={`/clinic/reports?clinic=${encodeURIComponent(c.id)}`}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm"
                  >
                    تقارير العيادة
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "staff" && (
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              إدارة الصلاحيات
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              حدد الأقسام المسموح الوصول إليها. يتم الحفظ محلياً ويمكن تغييره
              لاحقاً.
            </p>
            <PermissionsEditor />
          </div>
        )}
      </div>
    </div>
  );
}

function loadPermissions(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem("clinic_permissions");
    return raw
      ? JSON.parse(raw)
      : { "*": ["clinic:*", "favorites:read", "offers:read", "rewards:read"] };
  } catch {
    return {
      "*": ["clinic:*", "favorites:read", "offers:read", "rewards:read"],
    };
  }
}

function savePermissions(p: Record<string, string[]>) {
  localStorage.setItem("clinic_permissions", JSON.stringify(p));
}

function PermissionsEditor() {
  const [perms, setPerms] =
    useState<Record<string, string[]>>(loadPermissions());
  const key = "*";
  const options = [
    { id: "clinic", label: "إدارة العيادة" },
    { id: "favorites", label: "المفضلة" },
    { id: "offers", label: "العروض" },
    { id: "rewards", label: "المكافآت" },
  ];
  const has = (res: string) =>
    (perms[key] || []).includes(`${res}:*`) ||
    (perms[key] || []).includes(`${res}:read`);
  const toggle = (res: string) => {
    const current = new Set(perms[key] || []);
    if (has(res)) {
      current.delete(`${res}:*`);
      current.delete(`${res}:read`);
    } else {
      current.add(`${res}:*`);
    }
    const next = { ...perms, [key]: Array.from(current) };
    setPerms(next);
    savePermissions(next);
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {options.map((opt) => (
        <label
          key={opt.id}
          className={cn(
            "flex items-center gap-2 p-3 border rounded-xl cursor-pointer",
            has(opt.id)
              ? "bg-blue-50 border-blue-200"
              : "bg-gray-50 border-gray-200",
          )}
        >
          <input
            type="checkbox"
            checked={has(opt.id)}
            onChange={() => toggle(opt.id)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-800">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
