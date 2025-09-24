import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Heart,
  Bell,
  User,
  Stethoscope,
  Brain,
  Navigation,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import UnifiedInteractiveMap from "@/components/UnifiedInteractiveMap";
import AIConsultations from "@/components/AIConsultations";
import ArticlesSection from "@/components/ArticlesSection";
import DynamicPromoCard from "@/components/DynamicPromoCard";
import FloatingPromoBar from "@/components/FloatingPromoBar";
import FeatureShowcase from "@/components/FeatureShowcase";

export default function PatientMarketplace() {
  const { language, t } = useI18n();
  const [activeSection, setActiveSection] = useState("nearby");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className="min-h-screen bg-gray-50 with-floating-nav"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {language === "ar" ? "الخدمات الطبية" : "Medical Services"}
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    language === "ar"
                      ? "البحث عن خدمات طبية..."
                      : "Search medical services..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {language === "ar" ? "تسجيل الدخول" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dynamic Promotional Card */}
        <DynamicPromoCard />

        {/* Section Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-0">
            <button
              onClick={() => setActiveSection("nearby")}
              className={cn(
                "p-3 transition-all duration-300",
                activeSection === "nearby"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                language === "ar" ? "text-right" : "text-left",
              )}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <Stethoscope className="w-4 h-4" />
                <div>
                  <h3 className="text-sm font-bold mb-1">
                    {language === "ar" ? "الخدمات القريبة" : "Nearby Services"}
                  </h3>
                  <p className="text-xs opacity-90">
                    {language === "ar" ? "عيادات ومختبرات" : "Clinics & labs"}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("diagnosis")}
              className={cn(
                "p-3 transition-all duration-300",
                activeSection === "diagnosis"
                  ? "bg-green-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                language === "ar" ? "text-right" : "text-left",
              )}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <Brain className="w-4 h-4" />
                <div>
                  <h3 className="text-sm font-bold mb-1">
                    {language === "ar" ? "التشخيص الذكي" : "Smart Diagnosis"}
                  </h3>
                  <p className="text-xs opacity-90">
                    {language === "ar"
                      ? "استشارات ذكية"
                      : "Smart consultations"}
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveSection("articles")}
              className={cn(
                "p-3 transition-all duration-300",
                activeSection === "articles"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                language === "ar" ? "text-right" : "text-left",
              )}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <BookOpen className="w-4 h-4" />
                <div>
                  <h3 className="text-sm font-bold mb-1">
                    {language === "ar"
                      ? "المقالات وال��صائح"
                      : "Articles & Tips"}
                  </h3>
                  <p className="text-xs opacity-90">
                    {language === "ar" ? "نصائح طبية" : "Medical tips"}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Section Content */}
        <div className="transition-all duration-500">
          {activeSection === "nearby" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "ar"
                    ? "الخدمات القريبة منك"
                    : "Nearby Medical Services"}
                </h2>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "اكتشف العيادات والمختبرات والصيد��يات القريبة منك على الخريطة التفاعلية"
                    : "Discover nearby clinics, labs, and pharmacies on the interactive map"}
                </p>
              </div>
              <UnifiedInteractiveMap
                title="اعثر على الخدمات الطبية القريبة منك"
                description="اكتشف العيادات والمختبرات والصيدليات القريبة منك على الخريطة التفاعلية"
              />
            </div>
          )}

          {activeSection === "diagnosis" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "ar"
                    ? "خدمات التشخيص الذكي"
                    : "Smart Diagnosis Services"}
                </h2>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "احصل على استشارات طبية ذكية وتحليل الأعراض باستخدام الذكاء الاصطناعي"
                    : "Get smart medical consultations and symptom analysis using artificial intelligence"}
                </p>
              </div>
              <AIConsultations />
            </div>
          )}

          {activeSection === "articles" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "ar"
                    ? "المقالات والنصائح الطبية"
                    : "Medical Articles & Tips"}
                </h2>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "اقرأ أحدث المقالات ��النصائح الطبية من أ��ب��ء متخصصين لتحسين صحتك"
                    : "Read the latest medical articles and tips from specialist doctors to improve your health"}
                </p>
              </div>
              <ArticlesSection />

              {/* رابط لعرض جميع المقالات */}
              <div className="mt-8 text-center">
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>عرض جميع المقالات</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Statistics Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "ar" ? "إحصائيات المنصة" : "Platform Statistics"}
            </h2>
            <p className="text-gray-600">
              {language === "ar"
                ? "نفخر بخدمة آلاف المرضى يومياً"
                : "Proud to serve thousands of patients daily"}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">
                {language === "ar"
                  ? "عيادة ومركز طبي"
                  : "Clinics & Medical Centers"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                1000+
              </div>
              <p className="text-gray-600">
                {language === "ar" ? "طب��ب متخصص" : "Specialist Doctors"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                10k+
              </div>
              <p className="text-gray-600">
                {language === "ar" ? "استشارة ذكية" : "Smart Consultations"}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                50k+
              </div>
              <p className="text-gray-600">
                {language === "ar" ? "م��يض راضٍ" : "Satisfied Patients"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {language === "ar"
              ? "انضم إلى آلاف المرضى السعداء"
              : "Join Thousands of Happy Patients"}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {language === "ar"
              ? "احصل على خدمات طبية متميزة واستشارات ذكية"
              : "Get excellent medical services and smart consultations"}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              {language === "ar" ? "انضم مجاناً" : "Join Free"}
            </Link>
            <Link
              to="/community"
              className="border border-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:border-gray-500 transition-colors"
            >
              {language === "ar" ? "اعرف المزيد" : "Learn More"}
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Promotional Bar */}
      <FloatingPromoBar />


      {/* Bottom padding for mobile with safe area support */}
      {useIsMobile() && <div className="h-20 pb-safe-bottom"></div>}
    </div>
  );
}
