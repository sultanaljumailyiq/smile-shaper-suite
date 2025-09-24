import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Filter,
  Star,
  Users,
  Calendar,
  Building,
  Heart,
  MessageCircle,
  Plus,
  Bell,
  User,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Eye,
  Bookmark,
  Send,
  Phone,
  Mail,
  Globe,
  Target,
  Brain,
  Settings,
  Map,
  Navigation,
  Radar,
  ZoomIn,
  ZoomOut,
  Layers,
  Route,
  X,
  ChevronDown,
  Menu,
  Home,
  Grid,
  List,
  Wifi,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import InteractiveJobsMap from "@/components/InteractiveJobsMap";
import JobsSubNav from "@/components/JobsSubNav";

// بيانات الوظائف المبسطة للعرض السريع
const initialJobListings = [
  {
    id: 1,
    title: "طبيب أسنان أول",
    company: "عيادة سمايل تك",
    location: "بغداد، العراق",
    coordinates: { lat: 33.3152, lng: 44.3661 },
    type: "دوام كامل",
    experience: "5+ سنوا��",
    salary: "5,000 - 7,000 د.ع",
    posted: "م��ذ يومين",
    applicants: 42,
    featured: true,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.8,
    distance: "2.3 كم",
  },
  {
    id: 2,
    title: "طبيب أسنان أطفال",
    company: "عيادة الأطفال السعداء",
    location: "البصرة، العراق",
    coordinates: { lat: 30.5085, lng: 47.7804 },
    type: "دوام جزئي",
    experience: "3+ سنوات",
    salary: "3,500 - 4,500 د.ع",
    posted: "منذ أسبوع",
    applicants: 28,
    featured: false,
    remote: false,
    urgent: true,
    logo: "/placeholder.svg",
    company_rating: 4.6,
    distance: "456 كم",
  },
  {
    id: 3,
    title: "أخصائي تق��يم أسنان",
    company: "شركة التق��يم الرقمي",
    location: "عن بُعد",
    coordinates: null,
    type: "عقد مؤقت",
    experience: "7+ سنوات",
    salary: "50 - 75 د.ع/ساعة",
    posted: "منذ 3 أيام",
    applicants: 67,
    featured: true,
    remote: true,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.9,
    distance: "عن بُعد",
  },
  {
    id: 4,
    title: "طبيب أسنان ��ام",
    company: "عيادة ��لنور الطبية",
    location: "أربيل، العراق",
    coordinates: { lat: 36.19, lng: 44.0092 },
    type: "دوام كامل",
    experience: "2+ سنوات",
    salary: "4,000 - 5,500 د.ع",
    posted: "منذ 5 أيام",
    applicants: 31,
    featured: false,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.5,
    distance: "387 كم",
  },
  {
    id: 5,
    title: "جراح فم وأسنان",
    company: "مستشفى الرافدين",
    location: "الموصل، العراق",
    coordinates: { lat: 36.335, lng: 43.1189 },
    type: "دوام كامل",
    experience: "8+ سنوات",
    salary: "6,000 - 8,500 د.ع",
    posted: "منذ أسبوع",
    applicants: 19,
    featured: true,
    remote: false,
    urgent: true,
    logo: "/placeholder.svg",
    company_rating: 4.7,
    distance: "420 كم",
  },
  {
    id: 6,
    title: "استشاري تجميل أسنان",
    company: "عيادة الجمال الذهبي",
    location: "بغداد، العراق",
    coordinates: { lat: 33.3152, lng: 44.3661 },
    type: "دوام جزئي",
    experience: "10+ سنوات",
    salary: "7,000 - 10,000 د.ع",
    posted: "منذ 4 أيام",
    applicants: 54,
    featured: true,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.9,
    distance: "8.2 كم",
  },
  {
    id: 7,
    title: "مساعد طبيب أسنان",
    company: "عيادة الدكتور سالم",
    location: "النجف، العراق",
    coordinates: { lat: 32.028, lng: 44.3419 },
    type: "دوام كامل",
    experience: "1-2 سنوات",
    salary: "1,500 - 2,500 د.ع",
    posted: "منذ 6 أيام",
    applicants: 15,
    featured: false,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.3,
    distance: "180 كم",
  },
  {
    id: 8,
    title: "فني مختبر أسنان",
    company: "مختبر الابتسامة",
    location: "كربلاء، العراق",
    coordinates: { lat: 32.616, lng: 44.0244 },
    type: "دوام كامل",
    experience: "3+ سنوات",
    salary: "2,500 - 3,500 د.ع",
    posted: "منذ أسبوع",
    applicants: 22,
    featured: false,
    remote: false,
    urgent: false,
    logo: "/placeholder.svg",
    company_rating: 4.4,
    distance: "100 كم",
  },
];

// أقسام التوظيف مع قسم جديد لإضافة وظي��ة
const jobSections = [
  { id: "overview", label: "نظرة عامة", icon: Home },
  { id: "browse", label: "تصفح الوظائف", icon: Search },
  { id: "add-job", label: "إضاف�� وظيفة جديدة", icon: Plus },
  { id: "my-jobs", label: "طلباتي", icon: Briefcase },
];


export default function JobsNew() {
  const { language } = useI18n();
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("overview");
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [mapMode, setMapMode] = useState<'jobs' | 'dentists'>('jobs');
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [profileDoctor, setProfileDoctor] = useState<any>(null);

  // مزامنة التبويب مع الهاش في الرابط
  useEffect(() => {
    const h = location.hash?.replace('#','');
    if (!h) {
      setActiveSection('overview');
    } else if (['overview','browse','add-job','my-jobs'].includes(h)) {
      setActiveSection(h);
    }
  }, [location.hash]);

  // التحويل لتغيير الهاش عند تغيير القسم داخلياً
  const setSection = (id: string) => {
    setActiveSection(id);
    if (location.pathname !== '/jobs') navigate('/jobs#' + id);
    else navigate('#' + id);
  };

  // mutable jobs state
  const [jobs, setJobs] = useState(initialJobListings);

  // add job form mode and fields
  const [addJobMode, setAddJobMode] = useState<'need-dentist' | 'post-job'>('need-dentist');
  const [formTitle, setFormTitle] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formSalary, setFormSalary] = useState('');
  const [formType, setFormType] = useState('��وام كامل');
  const [formSpecialty, setFormSpecialty] = useState('');
  const [formNumberNeeded, setFormNumberNeeded] = useState<number>(1);
  const [formContactName, setFormContactName] = useState('');
  const [formContactPhone, setFormContactPhone] = useState('');

  // quick filters derived from jobs
  const quickFilters = [
    { id: 'all', label: 'الكل', count: jobs.length },
    { id: 'featured', label: 'مميزة', count: jobs.filter((job) => job.featured).length },
    { id: 'urgent', label: 'عاجلة', count: jobs.filter((job) => job.urgent).length },
    { id: 'remote', label: 'عن بُعد', count: jobs.filter((job) => job.remote).length },
    { id: 'fulltime', label: 'دوام كامل', count: jobs.filter((job) => job.type === 'دوام كامل').length },
  ];

  // فلترة ��لوظائف
  const filteredJobs = jobs
    .filter((job) => {
      if (activeFilter === "featured") return job.featured;
      if (activeFilter === "urgent") return job.urgent;
      if (activeFilter === "remote") return job.remote;
      if (activeFilter === "fulltime") return job.type === "دوام كامل";
      return true;
    })
    .filter(
      (job) =>
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  // بطاقة وظيفة جديدة بتصميم حديث
  const ModernJobCard = ({ job }: { job: any }) => (
    <div
      className={cn(
        "bg-gradient-to-br from-white to-blue-50 rounded-2xl border shadow-sm transition-all duration-200 cursor-pointer hover:shadow-lg p-4 flex flex-col gap-2",
        job.featured && "ring-2 ring-purple-300",
        selectedJob?.id === job.id && "ring-2 ring-blue-500 bg-blue-100/30",
      )}
      onClick={() => {
        setSelectedJob(job);
        setShowJobDetails(true);
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <img
          src={job.logo}
          alt={job.company}
          className="w-12 h-12 rounded-xl object-cover border"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-blue-900 line-clamp-2 leading-tight">
            {job.title}
          </h3>
          <p className="text-xs text-gray-500 truncate">{job.company}</p>
        </div>
        {job.featured && (
          <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-bold">
            مميزة
          </span>
        )}
        {job.urgent && (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
            عاجلة
          </span>
        )}
        {job.remote && (
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-bold">
            عن بُعد
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-700">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          {job.salary}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {job.posted}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" />
          {job.company_rating}
        </span>
      </div>
    </div>
  );

  // بيانات أطباء متاحين للعرض الأفقي
  const availableDoctors = [
    { id: 101, name: "د. أحمد الرحمة", specialty: "زراعة الأسنان", location: "بغداد", image: "https://images.unsplash.com/photo-1608571423837-1cbd4b9ae7f3?w=200&h=200&fit=crop" },
    { id: 102, name: "د. سارة النور", specialty: "تقويم الأسنان", location: "بغداد", image: "https://images.unsplash.com/photo-1606811841689-23dfdd58e3b4?w=200&h=200&fit=crop" },
    { id: 103, name: "د. محمد الخالدي", specialty: "جراحة الفم", location: "أربيل", image: "https://images.unsplash.com/photo-1629904853694-12b2810a58f3?w=200&h=200&fit=crop" },
    { id: 104, name: "د. فاطمة حسن", specialty: "طب أسنان الأطفال", location: "البصرة", image: "https://images.unsplash.com/photo-1553514029-1318c9127859?w=200&h=200&fit=crop" },
    { id: 105, name: "د. ليث العابد", specialty: "التجميل والترميم", location: "السليمانية", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop" },
    { id: 106, name: "د. زينب علي", specialty: "علاج اللثة", location: "النجف", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop" },
  ];

  const cityCoords: Record<string, { lat: number; lng: number }> = {
    "بغداد": { lat: 33.3152, lng: 44.3661 },
    "البصرة": { lat: 30.5085, lng: 47.7804 },
    "أربيل": { lat: 36.19, lng: 44.0092 },
    "الموصل": { lat: 36.335, lng: 43.1189 },
    "السليمانية": { lat: 35.565, lng: 45.4297 },
    "النجف": { lat: 32.028, lng: 44.3419 },
  };

  const getCoordinates = (loc: string) => {
    const key = Object.keys(cityCoords).find((k) => loc.includes(k));
    return key ? cityCoords[key] : null;
  };

  const dentistJobs = availableDoctors.map((d) => ({
    id: d.id,
    title: `${d.specialty} — متاح للعمل`,
    company: d.name,
    location: d.location,
    coordinates: getCoordinates(d.location),
    district: "",
    nearbyLandmarks: [],
    type: "طبيب متاح",
    experience: "",
    salary: "يتم الاتفاق",
    description: `طبيب ${d.specialty} جاهز للعمل ��ورًا`,
    requirements: [],
    benefits: [],
    posted: "اليوم",
    applicants: 0,
    featured: false,
    urgent: false,
    remote: false,
    logo: d.image,
    company_rating: 4.7,
    company_size: "1",
    distance: "",
    commute_time: "",
    phone: "",
  }));

  // صفحة النظرة العامة
  const OverviewSection = () => (
    <div className="space-y-4">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-extrabold text-blue-700">
            {jobs.length}
          </div>
          <div className="text-xs text-blue-700">وظائف متاحة</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-extrabold text-green-700">
            {jobs.filter((job) => job.featured).length}
          </div>
          <div className="text-xs text-green-700">و��ائف مميزة</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-extrabold text-purple-700">
            {jobs.filter((job) => job.remote).length}
          </div>
          <div className="text-xs text-purple-700">عمل عن بُعد</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center shadow">
          <div className="text-2xl font-extrabold text-orange-700">
            {jobs.filter((job) => job.urgent).length}
          </div>
          <div className="text-xs text-orange-700">وظائف عاجلة</div>
        </div>
      </div>

      {/* خريطة تفاعلية */}
      {showMap && (
        <div className="bg-white rounded-xl border shadow">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Map className="w-4 h-4" />
                خريطة العيادات والوظائف
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMapMode('jobs')}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border", mapMode === 'jobs' ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 hover:bg-gray-50")}
                  title="عرض الوظائف على الخريطة"
                >
                  الوظائف المتاحة
                </button>
                <button
                  onClick={() => setMapMode('dentists')}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-semibold border", mapMode === 'dentists' ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-gray-700 hover:bg-gray-50")}
                  title="عرض الأطباء المتاحين على الخريطة"
                >
                  الأطباء المتوفرون
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className="text-gray-400 hover:text-gray-600"
                  title="إغلاق الخريطة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <InteractiveJobsMap
              jobs={mapMode === 'jobs' ? jobs : dentistJobs as any}
              selectedJob={selectedJob}
              onJobSelect={(job) => setSelectedJob(job)}
              onShowJobDetails={setShowJobDetails}
              onJobApply={(jobId) => {
                const job = (mapMode === 'jobs' ? jobs : (dentistJobs as any)).find((j: any) => j.id === jobId);
                if (job) {
                  setSelectedJob(job);
                  setShowJobDetails(true);
                }
              }}
            />
          </div>
        </div>
      )}

      {/* أحدث الوظائف - أفقي */}
      <div className="bg-white rounded-xl border shadow">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">أحدث الوظائف</h2>
          <button
            onClick={() => setSection("browse")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            title="عرض جميع الوظائف"
          >
            عرض الكل
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="p-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory">
            {jobs.slice(0, 20).map((job) => (
              <div key={job.id} className="min-w-[280px] max-w-[280px] snap-start">
                <ModernJobCard job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* الأطباء المتاحون - أفقي */}
      <div className="bg-white rounded-xl border shadow">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">الأطباء المتاحون</h2>
          <Link
            to="/jobs/dentists"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
            title="تصفح جميع الأطباء"
          >
            تصفح الأطباء
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="p-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory">
            {availableDoctors.map((doc) => (
              <div key={doc.id} className="min-w-[260px] max-w-[260px] snap-start">
                <div className="rounded-xl border shadow-sm overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                  <div className="p-3 flex items-center gap-3 bg-white/70">
                    <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }} />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-900 truncate">{doc.name}</div>
                      <div className="text-xs text-gray-600 truncate">{doc.specialty} • {doc.location}</div>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <button onClick={() => { setProfileDoctor(doc); setShowDoctorProfile(true); }} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold">الملف</button>
                    <button onClick={() => { setMessageDoctor(doc); setShowMessage(true); }} className="px-3 py-1.5 bg-white text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">مراسلة</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // صفحة تصفح الوظائف
  const BrowseJobsSection = () => (
    <div className="space-y-4">
      {/* البحث والفلاتر */}
      <div className="bg-white rounded-lg border p-3">
        <div className="space-y-3">
          {/* شريط البحث */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن وظيفة أو شركة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              title="البحث عن وظيفة أو شركة"
            />
          </div>

          {/* فلاتر أفقية */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    activeFilter === filter.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                  title={filter.label}
                >
                  {filter.label}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded-full text-xs",
                      activeFilter === filter.id
                        ? "bg-white/20 text-white"
                        : "bg-white text-gray-600",
                    )}
                  >
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400",
                )}
                title="عرض في وضع ��لشبكة"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded transition-colors",
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400",
                )}
                title="عرض في وضع القائمة"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* النتائج */}
      <div className="bg-white rounded-lg border p-3">
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredJobs.length}
            </span>{" "}
            وظيفة متاحة
          </p>
        </div>

        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
              : "space-y-3",
          )}
        >
          {filteredJobs.map((job) => (
            <ModernJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );

  const AddJobSection = () => {
    const handleAddJobSubmit = (e: any) => {
      e.preventDefault();

      const newJob: any = {
        id: Date.now(),
        title: formTitle || (addJobMode === 'need-dentist' ? `طلب طبيب: ${formSpecialty || 'عام'}` : 'وظيفة جديدة'),
        company: formCompany || (addJobMode === 'need-dentist' ? 'طلب طبيب' : 'غير محدد'),
        location: formLocation || '',
        coordinates: null,
        type: formType,
        experience: '',
        salary: formSalary || '',
        posted: 'الآن',
        applicants: 0,
        featured: false,
        remote: false,
        urgent: false,
        logo: '/placeholder.svg',
        company_rating: 0,
        distance: '',
        mode: addJobMode,
        specialty: formSpecialty,
        number_needed: formNumberNeeded,
        contact: { name: formContactName, phone: formContactPhone },
      };

      setJobs((prev) => [newJob, ...prev]);
      setActiveSection('overview');
      setSelectedJob(newJob);
      setShowJobDetails(true);

      // reset form
      setFormTitle('');
      setFormCompany('');
      setFormLocation('');
      setFormSalary('');
      setFormType('دوام كامل');
      setFormSpecialty('');
      setFormNumberNeeded(1);
      setFormContactName('');
      setFormContactPhone('');
    };

    return (
      <div className="bg-white rounded-xl border shadow p-6 max-w-lg mx-auto mt-8">
        <h2 className="text-xl font-bold text-blue-700 mb-4">إضافة وظيفة جديدة</h2>

        {/* mode selector at top */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">هل تبحث عن طبيب أم تنشر وظيفة؟</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAddJobMode('need-dentist')}
              className={cn(
                'flex-1 px-3 py-2 rounded-lg font-medium text-sm',
                addJobMode === 'need-dentist' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700',
              )}
            >
              أحتاج طبيب
            </button>
            <button
              type="button"
              onClick={() => setAddJobMode('post-job')}
              className={cn(
                'flex-1 px-3 py-2 rounded-lg font-medium text-sm',
                addJobMode === 'post-job' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-700',
              )}
            >
              أنش�� وظيفة
            </button>
          </div>
        </div>

        <form onSubmit={handleAddJobSubmit}>
          {addJobMode === 'post-job' ? (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">المسمى الوظيفي</label>
                <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" placeholder="مثال: طبيب أسن��ن عام" title="المسمى الوظيفي" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم العيادة/المستشفى</label>
                <input value={formCompany} onChange={(e) => setFormCompany(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" placeholder="مثال: عيادة الابتسامة" title="اسم العيادة/المستشفى" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
                <input value={formLocation} onChange={(e) => setFormLocation(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" placeholder="مثال: بغداد، العراق" title="ا��موقع" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">الراتب</label>
                <input value={formSalary} onChange={(e) => setFormSalary(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" placeholder="مثال: 4000 - 6000 د.ع" title="الراتب" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع الوظيف��</label>
                <select value={formType} onChange={(e) => setFormType(e.target.value)} className="w-full border rounded-lg px-3 py-2" title="نوع الوظيفة">
                  <option>دوام كامل</option>
                  <option>دوام جزئي</option>
                  <option>عن بُعد</option>
                  <option>عقد مؤقت</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">التخصص المطلوب</label>
                <input value={formSpecialty} onChange={(e) => setFormSpecialty(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" placeholder="مثال: طبيب أسنان عام / تقويم" />
              </div>
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد الأطباء المطلوب</label>
                  <input value={String(formNumberNeeded)} onChange={(e) => setFormNumberNeeded(Number(e.target.value || 1))} type="number" min={1} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع العقد</label>
                  <select className="w-full border rounded-lg px-3 py-2" onChange={() => {}}>
                    <option>دوام كامل</option>
                    <option>دوام جزئي</option>
                    <option>عقد مؤقت</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم جهة التواصل</label>
                <input value={formContactName} onChange={(e) => setFormContactName(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">هاتف/واتساب للتواصل</label>
                <input value={formContactPhone} onChange={(e) => setFormContactPhone(e.target.value)} type="text" className="w-full border rounded-lg px-3 py-2" />
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold mt-4" title="إضافة الوظ��فة">
            {addJobMode === 'post-job' ? 'إضافة الوظيفة' : 'طلب طبيب'}
          </button>
        </form>
      </div>
    );
  };

  // عرض المحتوى حسب القسم
  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "browse":
        return <BrowseJobsSection />;
      case "add-job":
        return <AddJobSection />;
      default:
        return (
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              قيد التطوير
            </h3>
            <p className="text-gray-600">
              هذا القسم قيد التطوير وسيكون متاحاً قريباً
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* شريط علوي ثابت */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">
                  منصة التوظيف
                </h1>
                <p className="text-xs text-gray-500">وظائف طب الأسنان</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                title="بحث"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                title="الإشعارات"
              >
                <Bell className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                title="الملف الشخصي"
              >
                <User className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <JobsSubNav />

          {/* محتوى القسم */}
          {renderContent()}
        </div>
      </div>


      {/* تفاصيل الوظيفة */}
  {showJobDetails && selectedJob && (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4 lg:items-center">
      <div className="bg-white rounded-t-3xl lg:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-3xl lg:rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <img
                src={selectedJob.logo}
                alt={selectedJob.company}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {selectedJob.title}
                </h2>
                <p className="text-gray-700">{selectedJob.company}</p>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedJob.type}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowJobDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="إغلاق تفاصيل الوظيفة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {selectedJob.mode === 'need-dentist' ? (
            <>
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="text-base font-semibold text-yellow-900 mb-2">تفاصيل طلب الطبيب</h3>
                <p className="text-sm text-gray-700">التخصص المطلوب: {selectedJob.specialty || 'عام'}</p>
                <p className="text-sm text-gray-700">عدد المطلوبين: {selectedJob.number_needed || 1}</p>
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-900">مع��ومات التواصل</h4>
                  <p className="text-sm text-gray-700">{selectedJob.contact?.name || ''} — {selectedJob.contact?.phone || ''}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a href={`tel:${selectedJob.contact?.phone || ''}`} className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  اتصل الآن
                </a>
                <button className="px-4 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">حفظ</button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">الراتب</span>
                  </div>
                  <p className="text-base font-bold text-blue-900">{selectedJob.salary}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">المتقدمون</span>
                  </div>
                  <p className="text-base font-bold text-green-900">{selectedJob.applicants} شخص</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2" title="تقدم للوظيفة">
                  <ArrowRight className="w-4 h-4" />
                  تقدم للوظيفة
                </button>

                <button className="px-4 py-3 border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors" title="إضافة للمفضلة">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )}

  {/* نافذة ملف الطبيب */}
  {showDoctorProfile && profileDoctor && (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">ملف {profileDoctor.name}</h3>
          <button onClick={() => setShowDoctorProfile(false)} className="p-2 hover:bg-gray-100 rounded-lg">×</button>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <img src={profileDoctor.image} alt={profileDoctor.name} className="w-14 h-14 rounded-lg object-cover" />
            <div>
              <div className="font-bold text-gray-900">{profileDoctor.name}</div>
              <div className="text-sm text-gray-600">{profileDoctor.specialty} • {profileDoctor.location}</div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button onClick={() => setShowDoctorProfile(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-sm">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  )}
    </div>
  );
}
