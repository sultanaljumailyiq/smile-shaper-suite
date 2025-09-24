import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  Heart,
  Thermometer,
  Activity,
  FileText,
  Download,
  Share2,
  Star,
  User,
  Calendar,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  duration: string;
}

interface DiagnosisStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

const commonSymptoms = [
  { id: "toothache", name: "ألم في الأسنان", category: "pain" },
  { id: "gum-bleeding", name: "نزيف اللثة", category: "gums" },
  { id: "sensitivity", name: "حساسية الأسنان", category: "sensitivity" },
  { id: "bad-breath", name: "رائحة الفم", category: "breath" },
  { id: "swelling", name: "تورم في اللثة", category: "gums" },
  { id: "dry-mouth", name: "جفاف الفم", category: "mouth" },
  { id: "jaw-pain", name: "ألم في الفك", category: "jaw" },
  { id: "loose-tooth", name: "أسنان متخلخلة", category: "teeth" },
];

export default function AIDiagnosis() {
  const { language } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<Record<string, string>>({});
  const [duration, setDuration] = useState<Record<string, string>>({});
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);

  const steps: DiagnosisStep[] = [
    {
      id: 1,
      title: "اختيار الأعراض",
      description: "حدد الأعراض التي تشعر بها",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: 2,
      title: "تفاصيل الأعر��ض",
      description: "وصف شدة ومدة الأعراض",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
    {
      id: 3,
      title: "معلومات إضافية",
      description: "أضف أي تفاصيل أخرى مهمة",
      completed: currentStep > 3,
      active: currentStep === 3,
    },
    {
      id: 4,
      title: "التحليل والنتائج",
      description: "مراجعة التشخيص المبدئي",
      completed: false,
      active: currentStep === 4,
    },
  ];

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setCurrentStep(4);
    
    // محاكاة تحليل الذكاء الاصطناعي
    setTimeout(() => {
      setDiagnosisResult({
        condition: "التهاب اللثة المتوسط",
        confidence: 87,
        severity: "متوسط",
        recommendations: [
          "استخدام غسول الفم المطهر مرتين يومياً",
          "تنظيف الأسنان بفرشاة ناعمة",
          "استخدام خيط ا��أسنان يومياً",
          "تجنب الأطعمة السكرية والحمضية",
          "مراجعة طبيب الأسنان خلال أسبوع",
        ],
        urgency: "متوسط",
        followUp: "أسبوع واحد",
        relatedConditions: [
          { name: "تسوس الأسنان", probability: 23 },
          { name: "التهاب دواعم السن", probability: 15 },
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const downloadReport = () => {
    // منطق تحميل التقرير
    console.log("تحميل التقرير الطبي");
  };

  const shareReport = () => {
    // منطق مشاركة التقرير
    if (navigator.share) {
      navigator.share({
        title: "تقرير التشخيص الذكي",
        text: "تقرير التشخيص الطبي الذكي",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/marketplace"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>العودة للخدمات الطبية</span>
              </Link>
              
              <div className="w-px h-6 bg-gray-300"></div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  التشخيص بالذكاء الاصطناعي
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                دقة 95%
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-4 sm:mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold",
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.active
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="h-px bg-gray-200 w-16 sm:w-24 mx-4 mt-[-20px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ما هي الأعراض التي تشعر بها؟
                </h2>
                <p className="text-gray-600">
                  اختر جميع الأعراض المطابقة لحالتك الحالية
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomToggle(symptom.id)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-right",
                      selectedSymptoms.includes(symptom.id)
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedSymptoms.includes(symptom.id)
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300"
                      )}
                    >
                      {selectedSymptoms.includes(symptom.id) && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{symptom.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={selectedSymptoms.length === 0}
                  className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  صف شدة ومدة الأعراض
                </h2>
                <p className="text-gray-600">
                  هذه المعلومات تساعدنا في تقديم تشخيص أكثر دقة
                </p>
              </div>

              <div className="space-y-6">
                {selectedSymptoms.map((symptomId) => {
                  const symptom = commonSymptoms.find(s => s.id === symptomId);
                  return (
                    <div key={symptomId} className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {symptom?.name}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            شدة الألم/الأعراض
                          </label>
                          <div className="space-y-2">
                            {["خفيف", "متوسط", "شديد"].map((level) => (
                              <button
                                key={level}
                                onClick={() => setSeverity(prev => ({ ...prev, [symptomId]: level }))}
                                className={cn(
                                  "w-full p-3 rounded-lg border-2 transition-colors text-right",
                                  severity[symptomId] === level
                                    ? "border-purple-500 bg-purple-50"
                                    : "border-gray-200 hover:border-gray-300"
                                )}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            مدة الأعراض
                          </label>
                          <div className="space-y-2">
                            {["أقل من يوم", "1-3 أيام", "أسبوع", "أكثر من أسبوع"].map((period) => (
                              <button
                                key={period}
                                onClick={() => setDuration(prev => ({ ...prev, [symptomId]: period }))}
                                className={cn(
                                  "w-full p-3 rounded-lg border-2 transition-colors text-right",
                                  duration[symptomId] === period
                                    ? "border-purple-500 bg-purple-50"
                                    : "border-gray-200 hover:border-gray-300"
                                )}
                              >
                                {period}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto bg-gray-200 text-gray-700 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  التالي
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  معلومات إضافية
                </h2>
                <p className="text-gray-600">
                  أضف أي تفاصيل أخرى قد تساعد في التشخيص
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف إضافي للأعراض أو الظروف المر��فقة
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="مثال: الألم يزداد عند شرب المشروبات الباردة، أو يحدث فقط في المساء..."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      التاريخ الطبي
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-blue-800">مشاكل سابقة في الأسنان</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-blue-800">أمراض مزمنة (سكري، ضغط)</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-blue-800">تناول أدوية حالياً</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">
                      العادات اليومية
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-green-800">تنظيف الأسنان يومياً</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-green-800">استخدام خيط الأسنان</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-green-800">التدخين</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={handleAnalyze}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  تحليل النتائج
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              {isAnalyzing ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    جاري تحليل الأعراض...
                  </h2>
                  <p className="text-gray-600">
                    يقوم الذكاء الاصطناعي بتحليل المعلومات وإعداد التشخيص
                  </p>
                  <div className="mt-8">
                    <div className="bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{width: "75%"}}></div>
                    </div>
                  </div>
                </div>
              ) : diagnosisResult && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      تم إكمال التحليل
                    </h2>
                    <p className="text-gray-600">
                      إليك النتائج والتوصيات بناءً على الأعر��ض المذكورة
                    </p>
                  </div>

                  {/* التشخيص الأساسي */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          التشخيص المحتمل
                        </h3>
                        <p className="text-gray-600">بناءً على تحليل الذكاء الاصطناعي</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {diagnosisResult.confidence}%
                        </div>
                        <p className="text-gray-600">دقة التشخيص</p>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900 mb-2">
                          {diagnosisResult.condition}
                        </div>
                        <p className="text-gray-600">الحالة المحتملة</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600 mb-2">
                          {diagnosisResult.severity}
                        </div>
                        <p className="text-gray-600">مستوى الحالة</p>
                      </div>
                    </div>
                  </div>

                  {/* التوصيات */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                      التوصيات العلاجية
                    </h3>
                    <div className="space-y-4">
                      {diagnosisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* مستوى الطوارئ */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        مستوى الإلحاح
                      </h3>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-700 mb-2">
                          {diagnosisResult.urgency}
                        </div>
                        <p className="text-yellow-600">
                          يُنصح بمراجعة الطبيب خلال {diagnosisResult.followUp}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        احتمالات أخرى
                      </h3>
                      <div className="space-y-3">
                        {diagnosisResult.relatedConditions.map((condition: any, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700">{condition.name}</span>
                            <span className="text-sm font-medium text-gray-500">
                              {condition.probability}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={downloadReport}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      تحميل التقرير الطبي
                    </button>
                    <button
                      onClick={shareReport}
                      className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-5 h-5" />
                      مشاركة النتائج
                    </button>
                    <Link
                      to="/marketplace"
                      className="flex-1 border border-purple-600 text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                    >
                      البحث عن طبيب
                    </Link>
                  </div>

                  {/* إخلاء مسؤولية */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-2">تنبيه هام</h4>
                        <p className="text-amber-700 text-sm">
                          هذا التشخيص مبدئي فقط ولا يغني عن استشارة طبيب مختص. 
                          يُرجى مراجعة طبيب الأسنان للحصول على تشخيص دقيق وخطة علاج مناسبة.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
