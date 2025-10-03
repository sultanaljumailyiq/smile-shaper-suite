import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Settings, Users, Building, Package, BarChart3, Globe, MessageSquare, Stethoscope, Activity, Shield, Database, Bot, Map, ToggleLeft, ToggleRight, Save, Bell, Palette, Monitor, Smartphone, Languages, Mail, Phone, CreditCard, Lock, Key, Cloud, HardDrive, Cpu, RefreshCw, Download, Upload, FileText, Search, Filter, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
interface SystemSection {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  category: "core" | "medical" | "commercial" | "community";
}
const systemSections: SystemSection[] = [
// Core sections
{
  id: "users",
  name: "إدارة المستخدمين",
  description: "إدارة حسابات المستخدمين والصلاحيات",
  icon: Users,
  enabled: true,
  category: "core"
}, {
  id: "clinics",
  name: "إدارة العيادات",
  description: "إدارة العيادات الم��جلة والموافقات",
  icon: Building,
  enabled: true,
  category: "core"
}, {
  id: "suppliers",
  name: "إدارة الموردين",
  description: "إدارة الموردين والموافقة عليهم",
  icon: Package,
  enabled: true,
  category: "commercial"
},
// Medical sections
{
  id: "medical-services",
  name: "الخدمات الطبية",
  description: "خدمات التشخيص والاستشارات الطبية",
  icon: Stethoscope,
  enabled: true,
  category: "medical"
}, {
  id: "ai-diagnosis",
  name: "التشخيص الذكي",
  description: "نظام التشخيص بالذكاء الاصطناعي",
  icon: Bot,
  enabled: true,
  category: "medical"
},
// Commercial sections
{
  id: "marketplace",
  name: "المتجر الطبي",
  description: "متجر المعدات والمستلزمات الطبية",
  icon: Package,
  enabled: true,
  category: "commercial"
}, {
  id: "orders",
  name: "مراقبة الطلبات",
  description: "متابعة الطلبات والمدفوعات",
  icon: BarChart3,
  enabled: true,
  category: "commercial"
},
// Community sections
{
  id: "community",
  name: "المجتمع الطبي",
  description: "منتديات ونقاشات المجتمع الطبي",
  icon: MessageSquare,
  enabled: true,
  category: "community"
}, {
  id: "education",
  name: "التعليم الطبي",
  description: "الدورات والمواد التعليمية",
  icon: Globe,
  enabled: true,
  category: "community"
}, {
  id: "jobs",
  name: "الوظائف الطبية",
  description: "إعلانات الوظائف الطبية",
  icon: Users,
  enabled: true,
  category: "community"
}];
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [sections, setSections] = useState(systemSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    accentColor: "#f59e0b",
    darkMode: false,
    rtl: false
  });

  // API settings
  const [apiSettings, setApiSettings] = useState({
    openaiKey: "",
    geminiKey: "",
    googleMapsKey: "",
    paymentGateway: "stripe",
    smsProvider: "twilio",
    emailProvider: "sendgrid"
  });

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true,
    twoFactorAuth: false,
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionDays: 30
    }
  });
  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => section.id === sectionId ? {
      ...section,
      enabled: !section.enabled
    } : section));
  };
  const filteredSections = sections.filter(section => {
    const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase()) || section.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const categories = [{
    id: "all",
    name: "جميع الأقسام",
    count: sections.length
  }, {
    id: "core",
    name: "الأقسام الأساسية",
    count: sections.filter(s => s.category === "core").length
  }, {
    id: "medical",
    name: "الأقسام الطبية",
    count: sections.filter(s => s.category === "medical").length
  }, {
    id: "commercial",
    name: "الأقسام التجارية",
    count: sections.filter(s => s.category === "commercial").length
  }, {
    id: "community",
    name: "أقسام المجتمع",
    count: sections.filter(s => s.category === "community").length
  }];
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Settings className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                  إعدادات النظام
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/admin/platform-admin">
                <Button variant="default" size="sm" className="text-xs sm:text-sm">
                  إدارة المنصة
                </Button>
              </Link>
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  العودة لإدارة النظام
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 text-xs sm:text-sm">
            <TabsTrigger value="general" className="text-xs sm:text-sm">عام</TabsTrigger>
            <TabsTrigger value="sections" className="text-xs sm:text-sm">الأقسام</TabsTrigger>
            <TabsTrigger value="theme" className="text-xs sm:text-sm">المظهر</TabsTrigger>
            <TabsTrigger value="api" className="text-xs sm:text-sm">API</TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">الأمان</TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm">النظام</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-3 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              <Card className="text-sm">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    إعدادات عامة
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">الإعدادات الأساسية للمنصة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="site-name" className="text-xs sm:text-sm">اسم المنصة</Label>
                    <Input id="site-name" defaultValue="منصة الأسنان الرقمية" className="h-8 sm:h-10 text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="site-description" className="text-xs sm:text-sm">وصف المنصة</Label>
                    <Textarea id="site-description" defaultValue="منصة شاملة للخدمات الطبية وإدارة العيادات" rows={2} className="text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="contact-email" className="text-xs sm:text-sm">البريد الإلكتروني</Label>
                    <Input id="contact-email" type="email" defaultValue="info@dentalplatform.com" className="h-8 sm:h-10 text-xs sm:text-sm" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="contact-phone" className="text-xs sm:text-sm">رقم الهاتف</Label>
                    <Input id="contact-phone" defaultValue="+964 770 000 0000" className="h-8 sm:h-10 text-xs sm:text-sm" />
                  </div>
                </CardContent>
              </Card>

              <Card className="text-sm">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-lg">
                    <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
                    إعدادات اللغة والمنطقة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">اللغة الافتراضية</Label>
                    <Select defaultValue="ar">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ku">کوردی</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <Select defaultValue="asia/baghdad">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia/baghdad">
                          Asia/Baghdad
                        </SelectItem>
                        <SelectItem value="asia/riyadh">Asia/Riyadh</SelectItem>
                        <SelectItem value="asia/dubai">Asia/Dubai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة</Label>
                    <Select defaultValue="iqd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iqd">دينار عراقي (IQD)</SelectItem>
                        <SelectItem value="usd">دولار أمريكي (USD)</SelectItem>
                        <SelectItem value="eur">يورو (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button size="sm" className="text-xs sm:text-sm">
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                حفظ الإعدادات
              </Button>
            </div>
          </TabsContent>

          {/* Sections Management */}
          <TabsContent value="sections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة أقسام النظام</CardTitle>
                <CardDescription>
                  تفعيل وإيقاف الأقسام المختلفة في ال��نصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="البحث في الأقسام..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSections.map(section => {
                  const Icon = section.icon;
                  return <Card key={section.id} className={cn("transition-all duration-200", section.enabled ? "border-green-200 bg-green-50/50" : "border-gray-200 bg-gray-50/50")}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2 sm:gap-3 flex-1">
                              <div className={cn("w-6 h-6 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center", section.enabled ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400")}>
                                <Icon className="w-3 h-3 sm:w-5 sm:h-5" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900 mb-1 text-xs sm:text-sm">
                                  {section.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                                  {section.description}
                                </p>
                                <Badge variant={section.category === "core" ? "default" : section.category === "medical" ? "secondary" : section.category === "commercial" ? "outline" : "destructive"} className="text-xs">
                                  {section.category === "core" && "أساسي"}
                                  {section.category === "medical" && "طبي"}
                                  {section.category === "commercial" && "تجاري"}
                                  {section.category === "community" && "مجتمع"}
                                </Badge>
                              </div>
                            </div>
                            <Switch checked={section.enabled} onCheckedChange={() => toggleSection(section.id)} />
                          </div>
                        </CardContent>
                      </Card>;
                })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Settings */}
          <TabsContent value="theme" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    إعدادات المظهر
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">اللون الأساسي</Label>
                    <div className="flex items-center gap-2">
                      <Input id="primary-color" type="color" value={themeSettings.primaryColor} onChange={e => setThemeSettings(prev => ({
                      ...prev,
                      primaryColor: e.target.value
                    }))} className="w-16 h-10" />
                      <Input value={themeSettings.primaryColor} onChange={e => setThemeSettings(prev => ({
                      ...prev,
                      primaryColor: e.target.value
                    }))} className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">اللون الثانوي</Label>
                    <div className="flex items-center gap-2">
                      <Input id="secondary-color" type="color" value={themeSettings.secondaryColor} onChange={e => setThemeSettings(prev => ({
                      ...prev,
                      secondaryColor: e.target.value
                    }))} className="w-16 h-10" />
                      <Input value={themeSettings.secondaryColor} onChange={e => setThemeSettings(prev => ({
                      ...prev,
                      secondaryColor: e.target.value
                    }))} className="flex-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">الوضع الليلي</Label>
                      <p className="text-sm text-gray-600">
                        تفعيل المظهر الداكن
                      </p>
                    </div>
                    <Switch id="dark-mode" checked={themeSettings.darkMode} onCheckedChange={checked => setThemeSettings(prev => ({
                    ...prev,
                    darkMode: checked
                  }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="rtl-mode">الاتجاه من اليمين لليسار</Label>
                      <p className="text-sm text-gray-600">
                        تفعيل RTL للغة العربية
                      </p>
                    </div>
                    <Switch id="rtl-mode" checked={themeSettings.rtl} onCheckedChange={checked => setThemeSettings(prev => ({
                    ...prev,
                    rtl: checked
                  }))} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>معاينة المظهر</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border" style={{
                    backgroundColor: themeSettings.primaryColor + "10"
                  }}>
                      <h3 className="font-medium" style={{
                      color: themeSettings.primaryColor
                    }}>
                        عنوان بالون الأساسي
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        هذا نص تجريبي لمعاينة المظهر
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border" style={{
                    backgroundColor: themeSettings.secondaryColor + "10"
                  }}>
                      <h3 className="font-medium" style={{
                      color: themeSettings.secondaryColor
                    }}>
                        عنوان باللون الثانوي
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        معاينة اللون الثانوي في التصميم
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    إعدادات الذكاء الاصطناعي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-key">مفتاح OpenAI (ChatGPT)</Label>
                    <Input id="openai-key" type="password" placeholder="sk-..." value={apiSettings.openaiKey} onChange={e => setApiSettings(prev => ({
                    ...prev,
                    openaiKey: e.target.value
                  }))} />
                    <p className="text-xs text-gray-500">استخدم للتحليل والتشخيص الذكي</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gemini-key">مفتاح Google Gemini</Label>
                    <Input id="gemini-key" type="password" placeholder="AI..." value={apiSettings.geminiKey} onChange={e => setApiSettings(prev => ({
                    ...prev,
                    geminiKey: e.target.value
                  }))} />
                    <p className="text-xs text-gray-500">استخدم لتحليل الصور والتقارير الطبية</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">نموذج الذكاء الاصطناعي الافتراضي</Label>
                    <Select defaultValue="gemini">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini (مجاني)</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">
                          GPT-3.5 Turbo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    إعدادات الخرائط والموقع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maps-key">مفتاح Google Maps</Label>
                    <Input id="maps-key" type="password" placeholder="AIza..." value={apiSettings.googleMapsKey} onChange={e => setApiSettings(prev => ({
                    ...prev,
                    googleMapsKey: e.target.value
                  }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-location">الموقع الافتراضي</Label>
                    <Input id="default-location" defaultValue="بغداد، العراق" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    إعدادات الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-gateway">بوابة الدفع</Label>
                    <Select value={apiSettings.paymentGateway} onValueChange={value => setApiSettings(prev => ({
                    ...prev,
                    paymentGateway: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="local">بوابة محلية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    إعدادات الإشعارات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-provider">
                      مزود البريد الإلكتروني
                    </Label>
                    <Select value={apiSettings.emailProvider} onValueChange={value => setApiSettings(prev => ({
                    ...prev,
                    emailProvider: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="smtp">SMTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms-provider">مزود ا��رسائل النصية</Label>
                    <Select value={apiSettings.smsProvider} onValueChange={value => setApiSettings(prev => ({
                    ...prev,
                    smsProvider: value
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="nexmo">Nexmo</SelectItem>
                        <SelectItem value="local">مزود محلي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    إعدادات الأمان
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-verification">
                        التحقق من البريد الإلكتروني
                      </Label>
                      <p className="text-sm text-gray-600">
                        إجبار التحقق عند التسجيل
                      </p>
                    </div>
                    <Switch id="email-verification" checked={systemSettings.emailVerification} onCheckedChange={checked => setSystemSettings(prev => ({
                    ...prev,
                    emailVerification: checked
                  }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">المصادقة الثنائية</Label>
                      <p className="text-sm text-gray-600">
                        تفعيل 2FA للمديرين
                      </p>
                    </div>
                    <Switch id="two-factor" checked={systemSettings.twoFactorAuth} onCheckedChange={checked => setSystemSettings(prev => ({
                    ...prev,
                    twoFactorAuth: checked
                  }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">
                      انتهاء الجلسة (دقائق)
                    </Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">
                      محاولات تسجيل الدخول القصوى
                    </Label>
                    <Input id="max-login-attempts" type="number" defaultValue="5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    سياسة كلمات المرور
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-password-length">
                      الحد الأدنى لطول كلمة المرور
                    </Label>
                    <Input id="min-password-length" type="number" defaultValue="8" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>يجب أن تحتوي على أرقام</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>يجب أن تحتوي على أحرف كبيرة</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>يجب أن تحتوي على رموز خاصة</Label>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    إعدادات النظام
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">وضع الصيانة</Label>
                      <p className="text-sm text-gray-600">
                        إيقاف الموقع مؤقتاً للصيانة
                      </p>
                    </div>
                    <Switch id="maintenance-mode" checked={systemSettings.maintenanceMode} onCheckedChange={checked => setSystemSettings(prev => ({
                    ...prev,
                    maintenanceMode: checked
                  }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="registration-enabled">
                        السماح بالتسجيل
                      </Label>
                      <p className="text-sm text-gray-600">
                        السماح للمستخدمين الجدد بالتسجيل
                      </p>
                    </div>
                    <Switch id="registration-enabled" checked={systemSettings.registrationEnabled} onCheckedChange={checked => setSystemSettings(prev => ({
                    ...prev,
                    registrationEnabled: checked
                  }))} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5" />
                    إعدادات النسخ الاحتياطي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-backup">النسخ التلقائي</Label>
                      <p className="text-sm text-gray-600">
                        تفعيل النسخ الاحتياطي التلقائي
                      </p>
                    </div>
                    <Switch id="auto-backup" checked={systemSettings.backup.autoBackup} onCheckedChange={checked => setSystemSettings(prev => ({
                    ...prev,
                    backup: {
                      ...prev.backup,
                      autoBackup: checked
                    }
                  }))} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">تكرار النسخ</Label>
                    <Select value={systemSettings.backup.backupFrequency} onValueChange={value => setSystemSettings(prev => ({
                    ...prev,
                    backup: {
                      ...prev.backup,
                      backupFrequency: value
                    }
                  }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">كل ساعة</SelectItem>
                        <SelectItem value="daily">يومياً</SelectItem>
                        <SelectItem value="weekly">أسبوعياً</SelectItem>
                        <SelectItem value="monthly">شهرياً</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-days">مدة الاحتفاظ (أيام)</Label>
                    <Input id="retention-days" type="number" value={systemSettings.backup.retentionDays} onChange={e => setSystemSettings(prev => ({
                    ...prev,
                    backup: {
                      ...prev.backup,
                      retentionDays: parseInt(e.target.value)
                    }
                  }))} />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      نسخة احتياطية الآن
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Upload className="w-4 h-4 mr-2" />
                      استعادة النسخة
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    مراقبة الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>استخدام المعالج</span>
                      <span className="text-green-600">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{
                      width: "45%"
                    }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>استخدام الذاكرة</span>
                      <span className="text-blue-600">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{
                      width: "62%"
                    }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>مساحة التخزين</span>
                      <span className="text-orange-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{
                      width: "78%"
                    }}></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    تحديث الإحصائيات
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    السجلات والتقارير
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      سجل النظام
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      سجل الأخطاء
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      سجل الأمان
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      تقرير الأداء
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-level">مستوى السجلات</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save All Button */}
        <div className="flex justify-center pt-8">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Save className="w-5 h-5 mr-2" />
            حفظ جميع الإعدادات
          </Button>
        </div>
      </div>
    </div>;
}