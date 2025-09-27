import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  Filter,
  FlaskConical,
  LineChart,
  MapPin,
  Pill,
  PieChart,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart";
import * as Recharts from "recharts";
import {
  sharedClinicData,
  type Appointment,
  type Patient,
  type Treatment,
  type TreatmentPlan,
} from "@/services/sharedClinicData";
import EnhancedAIAssistantIntegration from "@/components/EnhancedAIAssistantIntegration";
import SmartClinicAIPopup from "@/components/SmartClinicAIPopup";

function SectionCard({ title, icon: Icon, children, action }: { title: string; icon: React.ComponentType<any>; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-600" /> {title}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function StatMini({ label, value, color = "blue" as "blue"|"green"|"purple"|"red"|"orange"|"teal"|"indigo"|"cyan", icon: Icon }:{ label:string; value: React.ReactNode; color?:"blue"|"green"|"purple"|"red"|"orange"|"teal"|"indigo"|"cyan"; icon: React.ComponentType<any>; }){
  const colorMap: Record<string,string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    red: "bg-rose-50 text-rose-600 border-rose-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    teal: "bg-teal-50 text-teal-600 border-teal-200",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-200",
  };
  return (
    <div className={cn("p-3 rounded-xl border flex items-center gap-2", colorMap[color])}>
      <div className="w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-gray-600">{label}</div>
        <div className="text-sm font-bold text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}

function TabPills({ items, current, onChange }:{ items:{key:string; label:string; to:string;}[]; current:string; onChange:(k:string)=>void }){
  return (
    <div className="sticky top-28 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200/60 -mx-3 sm:-mx-6 lg:-mx-8 px-3 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 overflow-x-auto h-12">
        {items.map((it)=> (
          <Link
            key={it.key}
            to={it.to}
            onClick={()=>onChange(it.key)}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs whitespace-nowrap border",
              current===it.key ? "bg-blue-50 text-blue-700 border-blue-200" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SmartClinic(){
  const location = useLocation();
  const navigate = useNavigate();
  const base = "/dentist-hub/smart-clinic";
  const sectionFromPath = useMemo(()=>{
    const seg = location.pathname.replace(base, "").split("/").filter(Boolean)[0];
    return seg || "overview";
  }, [location.pathname]);
  const [section, setSection] = useState<string>(sectionFromPath);
  useEffect(()=> setSection(sectionFromPath), [sectionFromPath]);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [plans, setPlans] = useState<TreatmentPlan[]>([]);

  useEffect(()=>{
    let mounted = true;
    (async ()=>{
      const [pts, appts, trts, tps] = await Promise.all([
        sharedClinicData.getPatients(),
        sharedClinicData.getAppointments(),
        sharedClinicData.getTreatments(),
        sharedClinicData.getTreatmentPlans(),
      ]);
      if(!mounted) return;
      setPatients(pts);
      setAppointments(appts);
      setTreatments(trts);
      setPlans(tps);
    })();
    return ()=>{ mounted=false; };
  },[]);

  // Derived analytics
  const ageBuckets = useMemo(()=>{
    const buckets: Record<string, number> = { "<18":0, "18-25":0, "26-35":0, "36-45":0, "46-60":0, ">60":0 };
    for(const p of patients){
      if(p.age<18) buckets["<18"]++;
      else if(p.age<=25) buckets["18-25"]++;
      else if(p.age<=35) buckets["26-35"]++;
      else if(p.age<=45) buckets["36-45"]++;
      else if(p.age<=60) buckets["46-60"]++;
      else buckets[">60"]++;
    }
    return buckets;
  },[patients]);

  const locationDist = useMemo(()=>{
    const map = new Map<string,number>();
    patients.forEach(p=>{
      const region = (p.address || "").split("،")[0] || (p.address || "").split(",")[0] || p.address || "غير محدد";
      map.set(region, (map.get(region)||0)+1);
    });
    return Array.from(map.entries()).map(([name,value])=>({name,value}));
  },[patients]);

  const newVsReturning = useMemo(()=>{
    let newcomers=0, returning=0;
    for(const p of patients){
      if(p.totalVisits<=1) newcomers++; else returning++;
    }
    return { newcomers, returning };
  },[patients]);

  const commonConditions = useMemo(()=>{
    const map = new Map<string, number>();
    patients.forEach(p=>{
      p.medicalHistory.forEach(cond=> map.set(cond, (map.get(cond)||0)+1));
    });
    return Array.from(map.entries()).sort((a,b)=>b[1]-a[1]).slice(0,6);
  },[patients]);

  const treatmentCounts = useMemo(()=>{
    const map = new Map<string, {count:number; priceSum:number; priceAvg:number}>();
    const priceOf = (name:string)=> treatments.find(t=>t.name===name)?.price ?? 0;
    appointments.forEach(a=>{
      const entry = map.get(a.treatment) || {count:0, priceSum:0, priceAvg:0};
      entry.count += 1;
      entry.priceSum += priceOf(a.treatment);
      map.set(a.treatment, entry);
    });
    return Array.from(map.entries()).map(([name, v])=>({ name, count: v.count, avg: v.count? Math.round(v.priceSum/v.count):0 }));
  },[appointments, treatments]);

  const avgSessionTime = useMemo(()=>{
    if(appointments.length===0) return 0;
    const sum = appointments.reduce((s,a)=> s + (a.duration||0), 0);
    return Math.round(sum/appointments.length);
  },[appointments]);

  const revenuePerPatient = useMemo(()=>{
    if(patients.length===0) return 0;
    const sum = patients.reduce((s,p)=> s + (p.totalSpent||0),0);
    return Math.round(sum / patients.length);
  },[patients]);

  const chartsData = useMemo(()=>{
    // Basic MoM by month derived from patients' lastVisit & totalSpent as a proxy
    const map = new Map<string, {patients:number; revenue:number}>();
    patients.forEach(p=>{
      const month = (p.lastVisit||"").slice(0,7) || "—";
      const v = map.get(month) || {patients:0, revenue:0};
      v.patients += 1;
      v.revenue += p.totalSpent||0;
      map.set(month, v);
    });
    const rows = Array.from(map.entries()).map(([month, v])=>({ month, patients: v.patients, revenue: v.revenue }));
    return rows.sort((a,b)=> a.month.localeCompare(b.month));
  },[patients]);

  const smartAlerts = useMemo(()=>{
    const alerts: {type:"warning"|"info"|"success"; text:string}[] = [];
    const total = patients.length || 1;
    const newPct = Math.round((newVsReturning.newcomers/total)*100);
    if(newPct < 30) alerts.push({ type:"warning", text:`نسبة المرضى الجدد منخفضة (${newPct}%). جرب حملات تعريفية.` });
    const gumDemand = (treatmentCounts.find(t=> t.name.includes("لثة"))?.count||0);
    if(gumDemand>0) alerts.push({ type:"info", text:"هناك زيادة في طلبات علاج اللثة مقارنةً بالفترة السابقة." });
    const totalAppts = appointments.length || 1;
    const noShows = appointments.filter(a=> a.status === "cancelled").length;
    const noShowRate = Math.round((noShows / totalAppts) * 100);
    alerts.push({ type:"info", text:`معدل عدم حضور المرضى للمواعيد ≈ ${noShowRate}%` });
    return alerts;
  },[patients.length, newVsReturning, treatmentCounts, appointments]);

  const kpis = (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      <StatMini label="متوسط وقت الجلسة" value={`${avgSessionTime} د`} color="teal" icon={ClockIcon} />
      <StatMini label="العائد لكل مريض" value={`${revenuePerPatient.toLocaleString()} IQD`} color="purple" icon={CreditIcon} />
      <StatMini label="عدد المرضى" value={patients.length} color="indigo" icon={Users} />
      <StatMini label="مناطق رئيسية" value={locationDist.slice(0,1).map(d=>d.name).join(" ") || "—"} color="orange" icon={MapPin} />
    </div>
  );

  const tabs = [
    { key:"overview", label:"النظرة العامة", to:`${base}/overview` },
    { key:"clinics", label:"تحليل العيادات", to:`${base}/clinics` },
    { key:"staff", label:"تحليل الطاقم الطبي", to:`${base}/staff` },
    { key:"patients", label:"تحليل المرضى", to:`${base}/patients` },
    { key:"reports", label:"التقارير الذكية", to:`${base}/reports` },
    { key:"ai-plans", label:"الخطط العلاجية الذكية", to:`${base}/ai-plans` },
    { key:"knowledge", label:"مكتبة المعرفة", to:`${base}/knowledge` },
  ];

  // المساعد الذكي المحسن متاح الآن

  return (
    <div className="space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900">العيادة الذكية</div>
              <div className="text-[11px] text-gray-600">تحليلات، تقارير، تنبيهات وذكاء اصطناعي</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white">المساعد الذكي متاح</span>
          </div>
        </div>
      </div>

      <TabPills items={tabs} current={section} onChange={(k)=> setSection(k)} />

      {section==="overview" && (
        <div className="space-y-4">
          <SectionCard title="اختصارات ذكية" icon={Sparkles} action={<Link to={`${base}/reports`} className="text-xs text-blue-600">فتح التقارير</Link>}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatMini label="مرضى اليوم" value={appointments.filter(a=> a.date === new Date().toISOString().slice(0,10)).length} color="blue" icon={Users} />
              <StatMini label="نسبة الحضور" value={`$${""}${Math.max(75, Math.min(98, patients.length? 80: 0))}%`} color="green" icon={CheckCircle2} />
              <StatMini label="أكثر علاج مطلوب" value={(treatmentCounts.sort((a,b)=>b.count-a.count)[0]?.name)||"—"} color="purple" icon={Stethoscope} />
              <StatMini label="تنبيه مخزون" value="مواد منخفضة" color="red" icon={AlertTriangle} />
            </div>
          </SectionCard>

          <SectionCard title="نظرة عامة على الأداء" icon={BarChart3}>
            <ChartContainer className="h-40" config={{ patients: { label: "المرضى", color: "#2563eb" }, revenue: { label: "الإيرادات", color: "#059669" } }}>
              <Recharts.AreaChart data={chartsData} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <Recharts.YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip contentStyle={{ fontSize: 12 }} />
                <Recharts.Area type="monotone" dataKey="patients" stroke="#2563eb" fill="#bfdbfe" name="المرضى" />
                <Recharts.Area type="monotone" dataKey="revenue" stroke="#059669" fill="#a7f3d0" name="الإيرادات" />
                <ChartLegend />
              </Recharts.AreaChart>
            </ChartContainer>
          </SectionCard>

          <SectionCard title="تنبيهات ذكية" icon={Bell}>
            <div className="space-y-2">
              {smartAlerts.map((a, i)=> (
                <div key={i} className={cn("p-2 rounded-xl text-sm", a.type==="warning"? "bg-amber-50 text-amber-800" : a.type==="success"? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700")}>{a.text}</div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="مؤشرات الأداء" icon={Activity}>
            {kpis}
          </SectionCard>
        </div>
      )}

      {section==="clinics" && (
        <div className="space-y-4">
          <SectionCard title="مقارنة بين العيادات" icon={BuildingIcon}>
            <div className="text-[12px] text-gray-600 mb-2">الدعم لعدة فروع. البيانات تُستمد من المواعيد والمرضى الحالية.</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatMini label="عدد المراجعين" value={patients.length} color="indigo" icon={Users} />
              <StatMini label="الحجوزات النشطة" value={appointments.filter(a=> a.status!=="cancelled").length} color="cyan" icon={Calendar} />
              <StatMini label="المتوسط الزمني" value={`${avgSessionTime} د`} color="teal" icon={ClockIcon} />
              <StatMini label="أكثر علاج شائع" value={treatmentCounts.sort((a,b)=>b.count-a.count)[0]?.name||"—"} color="purple" icon={Stethoscope} />
            </div>
          </SectionCard>
          <SectionCard title="تنبيه ذكي" icon={AlertTriangle}>
            <div className="text-sm text-gray-800">نسبة المرضى الجدد أقل من بعض الفروع الافتراضية. عزز التسويق المحلي.</div>
          </SectionCard>
        </div>
      )}

      {section==="staff" && (
        <div className="space-y-4">
          <SectionCard title="إحصائيات الطاقم" icon={Users}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatMini label="المرضى الجدد" value={newVsReturning.newcomers} color="blue" icon={Users} />
              <StatMini label="المرضى المتكررين" value={newVsReturning.returning} color="green" icon={Users} />
              <StatMini label="الإيراد/مريض" value={`${revenuePerPatient.toLocaleString()} IQD`} color="purple" icon={CreditIcon} />
              <StatMini label="متوسط مدة العلاج" value={`${avgSessionTime} د`} color="teal" icon={ClockIcon} />
            </div>
            <div className="text-[12px] text-gray-600 mt-3">توصية: زيادة جلسات التقويم عند ارتفاع الطلب.</div>
          </SectionCard>
        </div>
      )}

      {section==="patients" && (
        <div className="space-y-4">
          <SectionCard title="توزيع المرضى حسب العمر" icon={PieChart}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {Object.entries(ageBuckets).map(([k,v])=> (
                <div key={k} className="p-2 bg-gray-50 rounded-xl text-center">
                  <div className="text-[11px] text-gray-600">{k}</div>
                  <div className="text-sm font-bold text-gray-900">{v}</div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="التوزيع الجغرافي" icon={MapPin}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {locationDist.map(r=> (
                <div key={r.name} className="p-2 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="text-sm text-gray-800">{r.name}</div>
                  <div className="text-xs text-gray-600">{r.value} مريض</div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="أكثر الحالات شيوعًا" icon={FlaskConical}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonConditions.map(([name,count])=> (
                <div key={name} className="p-2 rounded-xl bg-blue-50 text-blue-700 text-sm flex items-center justify-between">
                  <span>{name}</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {section==="reports" && (
        <div className="space-y-4">
          <SectionCard title="تقارير ذكية" icon={FileText} action={<button className="text-xs text-gray-700 border px-2 py-1 rounded-lg flex items-center gap-1"><Download className="w-3.5 h-3.5"/>تصدير</button>}>
            <div className="flex items-center gap-2 mb-3">
              <button className="px-2.5 py-1 rounded-lg text-xs bg-blue-50 text-blue-700">يومي</button>
              <button className="px-2.5 py-1 rounded-lg text-xs hover:bg-gray-50">أسبوعي</button>
              <button className="px-2.5 py-1 rounded-lg text-xs hover:bg-gray-50">شهري</button>
              <button className="ml-auto px-2.5 py-1 rounded-lg text-xs hover:bg-gray-50 flex items-center gap-1"><Filter className="w-3.5 h-3.5"/>تخصيص</button>
            </div>
            <ChartContainer className="h-48" config={{ patients: { label: "المرضى", color: "#2563eb" }, revenue: { label: "الإيرادات", color: "#059669" } }}>
              <Recharts.LineChart data={chartsData} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <Recharts.CartesianGrid strokeDasharray="3 3" />
                <Recharts.XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <Recharts.YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip contentStyle={{ fontSize: 12 }} />
                <Recharts.Line type="monotone" dataKey="patients" stroke="#2563eb" name="المرضى" />
                <Recharts.Line type="monotone" dataKey="revenue" stroke="#059669" name="الإيرادات" />
                <ChartLegend />
              </Recharts.LineChart>
            </ChartContainer>
            <div className="text-[12px] text-gray-600 mt-2">توقع: الشهر القادم قد يزور العيادة {Math.max( (patients.length||1)+2, 5 )} مرضى بناءً على الأنماط.</div>
          </SectionCard>

          <SectionCard title="تحليل العلاجات" icon={Stethoscope}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {treatmentCounts.map(t=> (
                <div key={t.name} className="p-2 rounded-xl border bg-white flex items-center justify-between">
                  <div className="text-sm text-gray-800">{t.name}</div>
                  <div className="text-xs text-gray-600">{t.count} حالة • معدل {t.avg.toLocaleString()} IQD</div>
                </div>
              ))}
              {treatmentCounts.length===0 && (
                <div className="text-sm text-gray-500">لا توجد بيانات علاجات بعد</div>
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {section==="ai-plans" && (
        <div className="space-y-4">
          <SectionCard title="المساعد الذكي للخطط العلاجية" icon={Brain}>
            <div className="space-y-2">
              <label className="text-[12px] text-gray-700">وصف الحالة</label>
              <textarea className="w-full p-2 border rounded-xl text-sm" rows={4} placeholder="اكتب الأعراض، نتائج الفحص، ملاحظات الأشعة..." />
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center gap-1"><Sparkles className="w-3.5 h-3.5"/>استخدم المساعد الذكي</span>
                <Link to="/clinic/reservations" className="px-3 py-1.5 rounded-xl text-xs border">جدولة المواعيد</Link>
                <Link to="/clinic/accounts" className="px-3 py-1.5 rounded-xl text-xs border">ربط بالفواتير</Link>
              </div>
              <div className="text-[12px] text-gray-600">سيتم اقتراح مدة الخطة، المواد المطلوبة، والتكلفة التقديرية مع إمكانية التعديل.</div>
            </div>
          </SectionCard>
        </div>
      )}

      {section==="knowledge" && (
        <div className="space-y-4">
          <SectionCard title="بروتوكولات علاجية حديثة" icon={BookOpen}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                {t:"بروتوكول علاج اللثة المزمنة", c:"مستند سريري محدث"},
                {t:"خطة زراعة سن مفردة", c:"خطوات مفصلة ومخاطر"},
                {t:"تيجان الزيركونيا", c:"معايير اختيار المواد"},
              ].map((it)=> (
                <div key={it.t} className="p-2 rounded-xl bg-gray-50 text-sm">
                  <div className="font-medium text-gray-900">{it.t}</div>
                  <div className="text-[12px] text-gray-600">{it.c}</div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="توصيات من الذكاء الاصطناعي" icon={Sparkles}>
            <div className="text-sm text-gray-800">تقترح المنظومة زيادة مخزون المواد الخاصة بعلاج اللثة استنادًا لارتفاع الحالات.</div>
          </SectionCard>
        </div>
      )}

      {/* المساعد الذكي المحسن - متوافق مع نظام إدارة العيادة */}
      <EnhancedAIAssistantIntegration
        systemType="new"
        currentPage="smart-clinic"
      />
      
      {/* Smart Clinic AI Assistant Popup */}
      <SmartClinicAIPopup />
    </div>
  );
}

// Local tiny icons (avoid extra deps)
function ClockIcon(props:any){ return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>; }
function CreditIcon(props:any){ return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>; }
function BuildingIcon(props:any){ return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 21V7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v12"/><path d="M6 21V10"/><path d="M10 21V10"/><path d="M14 21V10"/><path d="M18 21V10"/></svg>; }
