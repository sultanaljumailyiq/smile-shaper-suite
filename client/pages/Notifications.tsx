import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Bell,
  Search,
  Settings,
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  Calendar,
  Package,
  Users,
  TrendingUp,
  Clock,
  MessageSquare,
  X,
  MoreHorizontal,
  Archive,
  Star,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  Zap,
  Circle,
  CheckCircle2,
  Sparkles,
  Flame,
  Shield,
  Heart,
  ThumbsUp,
  Gift,
  Crown,
  DollarSign,
  User,
  FileText,
  Download,
  Share2,
  Send,
  Mail,
  MailOpen,
  MessageCircle,
  Phone,
  Briefcase,
  Building,
  UserCheck,
  HeadphonesIcon,
  Truck,
  ClipboardList,
  Wifi,
  Reply,
  Forward,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Video,
  Mic,
  MapPin,
  Plus,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/contexts/NavigationContext";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "error" | "urgent" | "celebration";
  category:
    | "appointment"
    | "inventory"
    | "patient"
    | "financial"
    | "system"
    | "message"
    | "community"
    | "marketplace"
    | "achievement"
    | "reminder";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  actionUrl?: string;
  actionText?: string;
  avatar?: string;
  reactions?: number;
  attachments?: string[];
  tags?: string[];
}

interface Message {
  id: string;
  type: "suppliers" | "support" | "staff" | "community" | "jobs";
  senderName: string;
  senderRole?: string;
  senderAvatar?: string;
  subject: string;
  message: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  attachments?: string[];
  isOnline?: boolean;
  unreadCount?: number;
  lastMessage?: string;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "medical" | "administrative" | "maintenance" | "inventory";
  assignedTo?: string;
  tags?: string[];
  recurring?: "none" | "daily" | "weekly" | "monthly";
}

// Mock reminders data
const mockReminders: Reminder[] = [
  {
    id: "rem1",
    title: "فحص دوري للمعدات",
    description: "فحص وصيانة جهاز الأشعة السينية ��ضمان سلامة الأجهزة",
    dueDate: new Date(Date.now() + 3 * 60 * 60 * 1000), // خلال 3 ساع��ت
    completed: false,
    priority: "high",
    category: "maintenance",
    assignedTo: "فني الصيانة",
    tags: ["صيان��", "أجهزة", "��وري"],
    recurring: "weekly",
  },
  {
    id: "rem2",
    title: "��تابعة علاج المريض أحمد",
    description: "موعد متابعة لعلاج العصب وتقييم حالة السن المعالج",
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // غداً
    completed: false,
    priority: "medium",
    category: "medical",
    assignedTo: "د. سارة أحمد",
    tags: ["متابعة", "علاج عصب"],
    recurring: "none",
  },
  {
    id: "rem3",
    title: "ط��ب مواد طبية",
    description:
      "انتهت كمية مواد الحشو المركبة، يجب ط��ب شحنة جديدة قبل نفاد المخزون",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // بعد يومين
    completed: false,
    priority: "medium",
    category: "inventory",
    assignedTo: "مسؤول المخزون",
    tags: ["مخزون", "مواد طبية"],
    recurring: "monthly",
  },
  {
    id: "rem4",
    title: "تحديث ملفات المرضى",
    description:
      "مراجعة وتحديث الملفات الإلكترونية ��لمرضى وإضافة التقارير المفقودة",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // خلال أسبوع
    completed: false,
    priority: "low",
    category: "administrative",
    assignedTo: "موظف الاستقبال",
    tags: ["إداري", "ملفات"],
    recurring: "weekly",
  },
  {
    id: "rem5",
    title: "اجتماع فريق العمل الشهري",
    description: "اجتماع دوري لم��اقشة خطط العمل والتطويرات الجديدة",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // بعد 3 أيام
    completed: true,
    priority: "medium",
    category: "administrative",
    assignedTo: "إدارة العيادة",
    tags: ["اجتماع", "فريق"],
    recurring: "monthly",
  },
];

// Mock notifications data - Enhanced
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    category: "appointment",
    title: "موعد عاجل خلال 5 دقائق!",
    message: "لديك موعد مع د. أحمد العراقي - جراحة زراعة أسنان",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    starred: true,
    priority: "urgent",
    actionUrl: "/appointments/123",
    actionText: "انضم الآن",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    reactions: 3,
    tags: ["عاجل", "زراعة"],
  },
  {
    id: "2",
    type: "celebration",
    category: "achievement",
    title: "��� تهانينا! وصلت لـ 1000 متابع",
    message: "حسابك في مجتمع أطباء الأسنان ح��ق إنجازاً رائعاً",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    starred: false,
    priority: "medium",
    actionUrl: "/profile",
    actionText: "��رض الملف",
    reactions: 25,
    tags: ["إنجاز", "مجتمع"],
  },
  {
    id: "3",
    type: "error",
    category: "inventory",
    title: "نفاد المخزون - تحذير حرج",
    message: "انتهت كمية مادة التخدير الموضعي (Lidocaine) تماماً",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    starred: true,
    priority: "high",
    actionUrl: "/inventory/reorder",
    actionText: "اطلب الآن",
    tags: ["مخزون", "حرج"],
  },
];

// Mock messages data
const mockMessages: Message[] = [
  {
    id: "msg1",
    type: "suppliers",
    senderName: "شركة المعدات الطبية المتقدمة",
    senderRole: "مدير المبيعات",
    senderAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    subject: "عرض خاص على أجهزة التعقيم",
    message: "لدينا عرض ��صري على أجهزة التعقيم الألمانية بخصم 25% لمدة محدودة",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    starred: false,
    priority: "medium",
    attachments: ["catalog.pdf", "price-list.xlsx"],
    isOnline: true,
    unreadCount: 3,
    lastMessage: "شكراً لاهتمامكم، يمكن��ا ترتيب موعد للعرض التوضيحي",
  },
  {
    id: "msg2",
    type: "support",
    senderName: "فريق الدعم الف��ي",
    senderRole: "أخصائي دعم أول",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
    subject: "حل مشكلة الاتصال بقاعدة البيانات",
    message:
      "تم حل مشكلة انقطاع الاتصال بقاعد�� البيانات، النظام يعمل بكامل ��فاءته الآن",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
    starred: true,
    priority: "high",
    isOnline: true,
    unreadCount: 0,
    lastMessage: "إذا واجهت أي مشا��ل أخرى، لا تترد في الاتصال ب��ا",
  },
  {
    id: "msg3",
    type: "staff",
    senderName: "د. سارة أحمد",
    senderRole: "طبيبة أسنان - قسم التجميل",
    senderAvatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
    subject: "تقرير حالات اليوم",
    message:
      "تم الانتهاء من جميع حالات اليوم بنجاح، 8 حالات تجميل و 12 حالة علاج",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    starred: false,
    priority: "medium",
    isOnline: false,
    unreadCount: 2,
    lastMessage: "أحتاج لمناقشة حالة المريض أحمد محمد غداً",
  },
  {
    id: "msg4",
    type: "community",
    senderName: "د. محمد العراقي",
    senderRole: "أخصائي جراحة الفم والفكين",
    senderAvatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
    subject: "استشارة في حالة معقدة",
    message:
      "أحتاج رأيكم في حالة زراعة أسنان معقدة، هل يمكن ترتيب مكالمة فيديو؟",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
    starred: true,
    priority: "high",
    isOnline: true,
    unreadCount: 5,
    lastMessage: "شاركت صور الأشعة في المجموعة الخاصة",
  },
  {
    id: "msg5",
    type: "jobs",
    senderName: "مركز الأسنان الذهبي",
    senderRole: "مدير الموارد البشرية",
    senderAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    subject: "دعوة لمقابلة عمل",
    message:
      "نود دعوتك لمقابلة عمل لوظيفة طبيب أسنان عا��، يوم الأحد القادم الساعة 10 صباحاً",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    starred: false,
    priority: "high",
    isOnline: false,
    unreadCount: 0,
    lastMessage: "يرجى تأكيد الحضور والاطلاع على الوثائق المطلوبة",
  },
];

export default function Notifications() {
  const { state: navState, goBack, isComingFromSection } = useNavigation();
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [activeTab, setActiveTab] = useState<
    "notifications" | "messages" | "reminders"
  >(
    isComingFromSection("community")
      ? "messages"
      : isComingFromSection("clinic-admin")
        ? "reminders"
        : "notifications",
  );
  const [filter, setFilter] = useState<"all" | "unread" | "starred" | "urgent">(
    "all",
  );
  const [messageFilter, setMessageFilter] = useState<
    "all" | "suppliers" | "support" | "staff" | "community" | "jobs"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"card" | "compact">("card");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [isModalExpanded, setIsModalExpanded] = useState(false);
  const [newMessageData, setNewMessageData] = useState({
    recipient: "",
    subject: "",
    message: "",
    attachments: [] as File[],
    type: "staff" as Message["type"],
  });
  const [searchUsers, setSearchUsers] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const starredCount = notifications.filter((n) => n.starred).length;
  const urgentCount = notifications.filter(
    (n) => n.priority === "urgent" && !n.read,
  ).length;

  // Messages stats
  const unreadMessagesCount = messages.filter((m) => !m.read).length;
  const starredMessagesCount = messages.filter((m) => m.starred).length;
  const totalMessages = messages.length;

  // Reminders stats
  const pendingRemindersCount = reminders.filter((r) => !r.completed).length;
  const completedRemindersCount = reminders.filter((r) => r.completed).length;
  const totalReminders = reminders.length;

  const categories = [
    { id: "all", label: "ال��ل", icon: Bell, count: notifications.length },
    {
      id: "appointment",
      label: "المواعيد",
      icon: Calendar,
      count: notifications.filter((n) => n.category === "appointment").length,
    },
    {
      id: "financial",
      label: "المالية",
      icon: DollarSign,
      count: notifications.filter((n) => n.category === "financial").length,
    },
    {
      id: "community",
      label: "المجتمع",
      icon: Users,
      count: notifications.filter((n) => n.category === "community").length,
    },
    {
      id: "achievement",
      label: "الإنجازات",
      icon: Crown,
      count: notifications.filter((n) => n.category === "achievement").length,
    },
    {
      id: "marketplace",
      label: "السوق",
      icon: Package,
      count: notifications.filter((n) => n.category === "marketplace").length,
    },
  ];

  const messageCategories = [
    {
      id: "all",
      label: "جميع الرسائل",
      icon: Mail,
      count: messages.length,
      color: "blue",
    },
    {
      id: "suppliers",
      label: "المو��دين",
      icon: Truck,
      count: messages.filter((m) => m.type === "suppliers").length,
      color: "green",
    },
    {
      id: "support",
      label: "الدعم الفني",
      icon: HeadphonesIcon,
      count: messages.filter((m) => m.type === "support").length,
      color: "purple",
    },
    {
      id: "staff",
      label: "موظفي العيادة",
      icon: UserCheck,
      count: messages.filter((m) => m.type === "staff").length,
      color: "orange",
    },
    {
      id: "community",
      label: "منصة التواص��",
      icon: Users,
      count: messages.filter((m) => m.type === "community").length,
      color: "indigo",
    },
    {
      id: "jobs",
      label: "منص�� التوظيف",
      icon: Briefcase,
      count: messages.filter((m) => m.type === "jobs").length,
      color: "teal",
    },
  ];

  const reminderCategories = [
    {
      id: "all",
      label: "جميع التذكيرات",
      icon: Clock,
      count: reminders.length,
      color: "yellow",
    },
    {
      id: "medical",
      label: "طبية",
      icon: Stethoscope,
      count: reminders.filter((r) => r.category === "medical").length,
      color: "red",
    },
    {
      id: "administrative",
      label: "إدارية",
      icon: ClipboardList,
      count: reminders.filter((r) => r.category === "administrative").length,
      color: "blue",
    },
    {
      id: "maintenance",
      label: "صيانة",
      icon: Settings,
      count: reminders.filter((r) => r.category === "maintenance").length,
      color: "orange",
    },
    {
      id: "inventory",
      label: "مخزون",
      icon: Package,
      count: reminders.filter((r) => r.category === "inventory").length,
      color: "green",
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread" && notification.read) return false;
    if (filter === "starred" && !notification.starred) return false;
    if (filter === "urgent" && notification.priority !== "urgent") return false;
    if (
      selectedCategory !== "all" &&
      notification.category !== selectedCategory
    )
      return false;
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const filteredMessages = messages.filter((message) => {
    if (messageFilter !== "all" && message.type !== messageFilter) return false;
    if (filter === "unread" && message.read) return false;
    if (filter === "starred" && !message.starred) return false;
    if (filter === "urgent" && message.priority !== "urgent") return false;
    if (
      searchQuery &&
      !message.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !message.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !message.senderName.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const [reminderFilter, setReminderFilter] = useState<string>("all");
  const filteredReminders = reminders.filter((reminder) => {
    if (reminderFilter !== "all" && reminder.category !== reminderFilter)
      return false;
    if (filter === "unread" && reminder.completed) return false;
    if (
      searchQuery &&
      !reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !reminder.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const markAsRead = (id: string) => {
    if (activeTab === "notifications") {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } else if (activeTab === "messages") {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
      );
    }
  };

  const toggleStar = (id: string) => {
    if (activeTab === "notifications") {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)),
      );
    } else if (activeTab === "messages") {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)),
      );
    }
  };

  const toggleReminderComplete = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)),
    );
  };

  const markAllAsRead = () => {
    if (activeTab === "notifications") {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } else if (activeTab === "messages") {
      setMessages((prev) => prev.map((m) => ({ ...m, read: true })));
    } else if (activeTab === "reminders") {
      setReminders((prev) => prev.map((r) => ({ ...r, completed: true })));
    }
  };

  const removeNotification = (id: string) => {
    if (activeTab === "notifications") {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } else if (activeTab === "messages") {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } else if (activeTab === "reminders") {
      setReminders((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const openMessageDetail = (message: Message) => {
    setSelectedMessage(message);
    setShowMessageDetail(true);
    markAsRead(message.id);
  };

  // Mock users for search
  const mockUsers = [
    {
      id: "1",
      name: "د. أحمد ال����اقي",
      role: "طبيب أسنان",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop&crop=face",
      online: true,
    },
    {
      id: "2",
      name: "د. سارة محمد",
      role: "أخصائية تجميل",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face",
      online: false,
    },
    {
      id: "3",
      name: "م. علي حسن",
      role: "فني أشعة",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      online: true,
    },
    {
      id: "4",
      name: "أ. فاطمة أحمد",
      role: "مديرة العيادة",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
      online: true,
    },
    {
      id: "5",
      name: "شركة المعدات الطبية",
      role: "مورد",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      online: false,
    },
  ];

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.role.toLowerCase().includes(searchUsers.toLowerCase()),
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setNewMessageData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index: number) => {
    setNewMessageData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const sendMessage = () => {
    if (
      !newMessageData.recipient ||
      !newMessageData.subject ||
      !newMessageData.message
    ) {
      return;
    }

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      type: newMessageData.type,
      senderName: "أنت",
      subject: newMessageData.subject,
      message: newMessageData.message,
      timestamp: new Date(),
      read: true,
      starred: false,
      priority: "medium",
      attachments: newMessageData.attachments.map((file) => file.name),
      isOnline: true,
      unreadCount: 0,
      lastMessage: newMessageData.message,
    };

    setMessages((prev) => [newMessage, ...prev]);
    setShowNewMessage(false);
    setNewMessageData({
      recipient: "",
      subject: "",
      message: "",
      attachments: [],
      type: "staff",
    });
    setSelectedUsers([]);
  };

  const getIcon = (category: Notification["category"]) => {
    switch (category) {
      case "appointment":
        return Calendar;
      case "inventory":
        return Package;
      case "patient":
        return Users;
      case "financial":
        return DollarSign;
      case "message":
        return MessageSquare;
      case "community":
        return Users;
      case "marketplace":
        return Package;
      case "achievement":
        return Crown;
      case "reminder":
        return Clock;
      default:
        return Info;
    }
  };

  const getMessageIcon = (type: Message["type"]) => {
    switch (type) {
      case "suppliers":
        return Truck;
      case "support":
        return HeadphonesIcon;
      case "staff":
        return UserCheck;
      case "community":
        return Users;
      case "jobs":
        return Briefcase;
      default:
        return Mail;
    }
  };

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "urgent":
        return <Zap className="w-4 h-4 text-orange-500 animate-pulse" />;
      case "celebration":
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (
    priority: Notification["priority"] | Message["priority"],
  ) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500 bg-red-50";
      case "high":
        return "border-l-orange-500 bg-orange-50";
      case "medium":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-300 bg-white";
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} د`;
    if (hours < 24) return `منذ ${hours} س`;
    return `منذ ${days} يوم`;
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105"
                title={`العودة إلى ${
                  navState.previousSection === "marketplace"
                    ? "المتجر"
                    : navState.previousSection === "community"
                      ? "المجتمع"
                      : navState.previousSection === "jobs"
                        ? "الوظائف"
                        : navState.previousSection === "clinic-admin"
                          ? "إدارة العيادة"
                          : "الصفحة السابقة"
                }`}
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    {activeTab === "notifications" ? (
                      <Bell className="w-5 h-5 text-white" />
                    ) : activeTab === "messages" ? (
                      <Mail className="w-5 h-5 text-white" />
                    ) : (
                      <Clock className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {((activeTab === "notifications" && urgentCount > 0) ||
                    (activeTab === "messages" && unreadMessagesCount > 0) ||
                    (activeTab === "reminders" &&
                      pendingRemindersCount > 0)) && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {activeTab === "notifications"
                          ? urgentCount
                          : activeTab === "messages"
                            ? unreadMessagesCount
                            : pendingRemindersCount}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {activeTab === "notifications"
                      ? "الإشعارات"
                      : activeTab === "messages"
                        ? "الرسائل"
                        : "التذكيرات"}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {activeTab === "notifications"
                      ? unreadCount > 0
                        ? `${unreadCount} إشعار غير مقروء`
                        : "جميع الإشعارات مقروءة"
                      : activeTab === "messages"
                        ? unreadMessagesCount > 0
                          ? `${unreadMessagesCount} رسالة غير مقروءة`
                          : "جميع الرسائل مقروءة"
                        : pendingRemindersCount > 0
                          ? `${pendingRemindersCount} ��ذكير معلق`
                          : "جميع التذكيرات مكتملة"}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={cn(
                    "flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200",
                    activeTab === "notifications"
                      ? "bg-white shadow-sm text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  <Bell className="w-4 h-4" />
                  <span>الإشعارات</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("messages")}
                  className={cn(
                    "flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200",
                    activeTab === "messages"
                      ? "bg-white shadow-sm text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  <Mail className="w-4 h-4" />
                  <span>الرسائل</span>
                  {unreadMessagesCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                      {unreadMessagesCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("reminders")}
                  className={cn(
                    "flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200",
                    activeTab === "reminders"
                      ? "bg-white shadow-sm text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  <Clock className="w-4 h-4" />
                  <span>التذكيرات</span>
                  {pendingRemindersCount > 0 && (
                    <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                      {pendingRemindersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("card")}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    viewMode === "card"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600",
                  )}
                >
                  <Circle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    viewMode === "compact"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-600",
                  )}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {activeTab === "messages" && (
                <button
                  onClick={() => setShowNewMessage(true)}
                  className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={() => setShowNotificationsModal(true)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={
                      activeTab === "notifications"
                        ? "ابحث في الإشعارات..."
                        : "ابحث في الرسائل..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  فلاتر سريعة
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      id: "all",
                      label:
                        activeTab === "notifications"
                          ? "جميع الإشعارات"
                          : "جميع الر��ائل",
                      count:
                        activeTab === "notifications"
                          ? notifications.length
                          : totalMessages,
                      color: "blue",
                    },
                    {
                      id: "unread",
                      label: "غير مقروءة",
                      count:
                        activeTab === "notifications"
                          ? unreadCount
                          : unreadMessagesCount,
                      color: "red",
                    },
                    {
                      id: "starred",
                      label: "المميزة",
                      count:
                        activeTab === "notifications"
                          ? starredCount
                          : starredMessagesCount,
                      color: "yellow",
                    },
                    {
                      id: "urgent",
                      label: "العاجلة",
                      count:
                        activeTab === "notifications"
                          ? urgentCount
                          : messages.filter((m) => m.priority === "urgent")
                              .length,
                      color: "orange",
                    },
                  ].map((filterOption) => (
                    <button
                      key={filterOption.id}
                      onClick={() => setFilter(filterOption.id as any)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                        filter === filterOption.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                          : "hover:bg-gray-50 text-gray-700",
                      )}
                    >
                      <span className="font-medium">{filterOption.label}</span>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-bold",
                          filter === filterOption.id
                            ? "bg-white/20"
                            : `bg-${filterOption.color}-100 text-${filterOption.color}-700`,
                        )}
                      >
                        {filterOption.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {activeTab === "notifications" ? "الفئات" : "أقسام الرسائل"}
                </h3>
                <div className="space-y-1">
                  {(activeTab === "notifications"
                    ? categories
                    : messageCategories
                  ).map((category) => {
                    const Icon = category.icon;
                    const isSelected =
                      activeTab === "notifications"
                        ? selectedCategory === category.id
                        : messageFilter === category.id;

                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          if (activeTab === "notifications") {
                            setSelectedCategory(category.id);
                          } else {
                            setMessageFilter(category.id as any);
                          }
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                          isSelected
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 text-gray-700",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium flex-1 text-right">
                          {category.label}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-bold",
                            isSelected
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600",
                          )}
                        >
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 space-y-3">
                <button
                  onClick={markAllAsRead}
                  disabled={
                    (activeTab === "notifications"
                      ? unreadCount
                      : unreadMessagesCount) === 0
                  }
                  className="w-full flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">تعيين الكل كمقروء</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
                  <Archive className="w-5 h-5" />
                  <span className="font-medium">أرشفة المقروءة</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {activeTab === "notifications" ? (
                <>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Bell className="w-8 h-8" />
                      <div>
                        <p className="text-blue-100 text-sm">
                          إجمالي الإشعارات
                        </p>
                        <p className="text-2xl font-bold">
                          {notifications.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <EyeOff className="w-8 h-8" />
                      <div>
                        <p className="text-red-100 text-sm">غير مقروءة</p>
                        <p className="text-2xl font-bold">{unreadCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8" />
                      <div>
                        <p className="text-yellow-100 text-sm">مميزة</p>
                        <p className="text-2xl font-bold">{starredCount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Zap className="w-8 h-8 animate-pulse" />
                      <div>
                        <p className="text-orange-100 text-sm">عاجلة</p>
                        <p className="text-2xl font-bold">{urgentCount}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Mail className="w-8 h-8" />
                      <div>
                        <p className="text-purple-100 text-sm">
                          إجمالي الرسائل
                        </p>
                        <p className="text-2xl font-bold">{totalMessages}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <MailOpen className="w-8 h-8" />
                      <div>
                        <p className="text-red-100 text-sm">غير مقروءة</p>
                        <p className="text-2xl font-bold">
                          {unreadMessagesCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8" />
                      <div>
                        <p className="text-yellow-100 text-sm">م��يزة</p>
                        <p className="text-2xl font-bold">
                          {starredMessagesCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-8 h-8" />
                      <div>
                        <p className="text-green-100 text-sm">متصل الآن</p>
                        <p className="text-2xl font-bold">
                          {messages.filter((m) => m.isOnline).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Content List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {activeTab === "notifications" ? (
                // Notifications List
                filteredNotifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      لا توجد إشعارا��
                    </h3>
                    <p className="text-gray-500">
                      لم ي��م العثور على إشعارات تطابق الفلاتر المحددة
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredNotifications.map((notification) => {
                      const Icon = getIcon(notification.category);
                      return (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-6 transition-all duration-200 hover:bg-gray-50 cursor-pointer border-r-4",
                            getPriorityColor(notification.priority),
                            !notification.read && "bg-blue-50/50",
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-4">
                            {notification.avatar ? (
                              <img
                                src={notification.avatar}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                              />
                            ) : (
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-full flex items-center justify-center",
                                  notification.type === "success" &&
                                    "bg-green-100 text-green-600",
                                  notification.type === "warning" &&
                                    "bg-yellow-100 text-yellow-600",
                                  notification.type === "error" &&
                                    "bg-red-100 text-red-600",
                                  notification.type === "urgent" &&
                                    "bg-orange-100 text-orange-600",
                                  notification.type === "celebration" &&
                                    "bg-purple-100 text-purple-600",
                                  notification.type === "info" &&
                                    "bg-blue-100 text-blue-600",
                                )}
                              >
                                <Icon className="w-6 h-6" />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3
                                  className={cn(
                                    "text-lg font-semibold",
                                    notification.read
                                      ? "text-gray-700"
                                      : "text-gray-900",
                                  )}
                                >
                                  {notification.title}
                                </h3>
                                {getTypeIcon(notification.type)}
                                {notification.priority === "urgent" && (
                                  <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                    <Flame className="w-3 h-3 animate-pulse" />
                                    عاجل
                                  </div>
                                )}
                                {!notification.read && (
                                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                )}
                              </div>

                              <p
                                className={cn(
                                  "text-base mb-3",
                                  notification.read
                                    ? "text-gray-600"
                                    : "text-gray-700",
                                )}
                              >
                                {notification.message}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {formatTime(notification.timestamp)}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {notification.actionUrl && (
                                    <Link
                                      to={notification.actionUrl}
                                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {notification.actionText}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(notification.id);
                                }}
                                className={cn(
                                  "p-2 rounded-lg transition-colors",
                                  notification.starred
                                    ? "text-yellow-500 hover:text-yellow-600 bg-yellow-50"
                                    : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50",
                                )}
                              >
                                <Star
                                  className={cn(
                                    "w-5 h-5",
                                    notification.starred && "fill-current",
                                  )}
                                />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              ) : // Messages List
              filteredMessages.length === 0 ? (
                <div className="p-12 text-center">
                  <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    لا توجد رسائل
                  </h3>
                  <p className="text-gray-500">
                    لم يتم العثور على ��سائل تطابق ��لفلاتر المحددة
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredMessages.map((message) => {
                    const Icon = getMessageIcon(message.type);
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "p-6 transition-all duration-200 hover:bg-gray-50 cursor-pointer border-r-4",
                          getPriorityColor(message.priority),
                          !message.read && "bg-blue-50/50",
                        )}
                        onClick={() => openMessageDetail(message)}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            {message.senderAvatar ? (
                              <img
                                src={message.senderAvatar}
                                alt=""
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                              />
                            ) : (
                              <div
                                className={cn(
                                  "w-12 h-12 rounded-full flex items-center justify-center",
                                  message.type === "suppliers" &&
                                    "bg-green-100 text-green-600",
                                  message.type === "support" &&
                                    "bg-purple-100 text-purple-600",
                                  message.type === "staff" &&
                                    "bg-orange-100 text-orange-600",
                                  message.type === "community" &&
                                    "bg-indigo-100 text-indigo-600",
                                  message.type === "jobs" &&
                                    "bg-teal-100 text-teal-600",
                                )}
                              >
                                <Icon className="w-6 h-6" />
                              </div>
                            )}
                            {message.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={cn(
                                  "font-semibold",
                                  message.read
                                    ? "text-gray-700"
                                    : "text-gray-900",
                                )}
                              >
                                {message.senderName}
                              </h3>
                              {message.senderRole && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {message.senderRole}
                                </span>
                              )}
                              {!message.read && (
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                              )}
                            </div>

                            <h4
                              className={cn(
                                "text-sm font-medium mb-1",
                                message.read
                                  ? "text-gray-600"
                                  : "text-gray-800",
                              )}
                            >
                              {message.subject}
                            </h4>

                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {message.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(message.timestamp)}
                                </span>
                                {message.attachments && (
                                  <span className="flex items-center gap-1">
                                    <Paperclip className="w-3 h-3" />
                                    {message.attachments.length}
                                  </span>
                                )}
                                {message.unreadCount &&
                                  message.unreadCount > 0 && (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                      {message.unreadCount} رسالة جديدة
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(message.id);
                              }}
                              className={cn(
                                "p-2 rounded-lg transition-colors",
                                message.starred
                                  ? "text-yellow-500 hover:text-yellow-600 bg-yellow-50"
                                  : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50",
                              )}
                            >
                              <Star
                                className={cn(
                                  "w-5 h-5",
                                  message.starred && "fill-current",
                                )}
                              />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(message.id);
                              }}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Detail Modal */}
      {showMessageDetail && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      selectedMessage.senderAvatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedMessage.senderName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedMessage.senderRole}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMessageDetail(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedMessage.subject}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {selectedMessage.message}
              </p>

              {selectedMessage.attachments && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">المرفقات</h4>
                  <div className="space-y-2">
                    {selectedMessage.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {attachment}
                        </span>
                        <button className="mr-auto text-blue-600 hover:text-blue-700">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Reply className="w-4 h-4" />
                  رد
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Forward className="w-4 h-4" />
                  إعادة توجيه
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={cn(
              "bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
              isModalExpanded
                ? "w-[90vw] h-[90vh]"
                : "max-w-2xl w-full max-h-[80vh]",
            )}
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">الإشعارات</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount} غير مقروء
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsModalExpanded(!isModalExpanded)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                    title={isModalExpanded ? "تصغير" : "تكبير"}
                  >
                    {isModalExpanded ? (
                      <RotateCcw className="w-5 h-5 text-gray-600" />
                    ) : (
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowNotificationsModal(false)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  تعيين الكل كمقر��ء
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  أرشفة الم��روءة
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    لا توجد إشعارات
                  </h3>
                  <p className="text-gray-500">جميع الإشعارات مقروءة</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => {
                    const Icon = getIcon(notification.category);
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 rounded-xl border transition-all duration-200 hover:shadow-sm cursor-pointer",
                          notification.read
                            ? "bg-gray-50 border-gray-200"
                            : "bg-blue-50 border-blue-200",
                          notification.priority === "urgent" &&
                            "ring-2 ring-red-200",
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                              notification.type === "success" &&
                                "bg-green-100 text-green-600",
                              notification.type === "warning" &&
                                "bg-yellow-100 text-yellow-600",
                              notification.type === "error" &&
                                "bg-red-100 text-red-600",
                              notification.type === "urgent" &&
                                "bg-orange-100 text-orange-600",
                              notification.type === "celebration" &&
                                "bg-purple-100 text-purple-600",
                              notification.type === "info" &&
                                "bg-blue-100 text-blue-600",
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4
                                className={cn(
                                  "font-medium",
                                  notification.read
                                    ? "text-gray-700"
                                    : "text-gray-900",
                                )}
                              >
                                {notification.title}
                              </h4>
                              {getTypeIcon(notification.type)}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatTime(notification.timestamp)}
                              </span>
                              {notification.actionUrl && (
                                <Link
                                  to={notification.actionUrl}
                                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                  onClick={() =>
                                    setShowNotificationsModal(false)
                                  }
                                >
                                  {notification.actionText}
                                </Link>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(notification.id);
                            }}
                            className={cn(
                              "p-1 rounded-lg transition-colors",
                              notification.starred
                                ? "text-yellow-500"
                                : "text-gray-400 hover:text-yellow-500",
                            )}
                          >
                            <Star
                              className={cn(
                                "w-4 h-4",
                                notification.starred && "fill-current",
                              )}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    رسالة جديدة
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Message Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    نوع الرسالة
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {messageCategories.slice(1).map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() =>
                            setNewMessageData((prev) => ({
                              ...prev,
                              type: category.id as Message["type"],
                            }))
                          }
                          className={cn(
                            "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                            newMessageData.type === category.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 text-gray-600",
                          )}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-medium">
                            {category.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recipients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    المرسل إليه
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowUserSearch(true)}
                      className="w-full p-3 border border-gray-300 rounded-xl text-right hover:border-blue-500 transition-colors flex items-center justify-between"
                    >
                      <span className="text-gray-500">
                        {selectedUsers.length > 0
                          ? `تم اختيار ${selectedUsers.length} مستخدم`
                          : "اختر المستخدمين..."}
                      </span>
                      <Search className="w-5 h-5 text-gray-400" />
                    </button>

                    {selectedUsers.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedUsers.map((user, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm"
                          >
                            <img
                              src={user.avatar}
                              alt=""
                              className="w-5 h-5 rounded-full"
                            />
                            <span>{user.name}</span>
                            <button
                              onClick={() =>
                                setSelectedUsers((prev) =>
                                  prev.filter((_, i) => i !== index),
                                )
                              }
                              className="hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    الموضوع
                  </label>
                  <input
                    type="text"
                    value={newMessageData.subject}
                    onChange={(e) =>
                      setNewMessageData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    placeholder="أدخل موضوع الرسالة..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    الرسالة
                  </label>
                  <textarea
                    value={newMessageData.message}
                    onChange={(e) =>
                      setNewMessageData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="اكتب رسالتك هنا..."
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-right"
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ال��رفقات
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">إرفاق ملفات</span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                        />
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 cursor-pointer transition-colors">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">إرفاق صور</span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>

                    {newMessageData.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          الملفات المرفقة
                        </h4>
                        <div className="space-y-2">
                          {newMessageData.attachments.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                            >
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700 flex-1">
                                {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </span>
                              <button
                                onClick={() => removeAttachment(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={sendMessage}
                  disabled={
                    !newMessageData.recipient ||
                    !newMessageData.subject ||
                    !newMessageData.message
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Search Modal */}
      {showUserSearch && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  البحث عن مستخدمين
                </h3>
                <button
                  onClick={() => setShowUserSearch(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mt-4 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                  placeholder="ابحث عن اسم المستخدم ��و المنصب..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      if (!selectedUsers.find((u) => u.id === user.id)) {
                        setSelectedUsers((prev) => [...prev, user]);
                        setNewMessageData((prev) => ({
                          ...prev,
                          recipient: user.name,
                        }));
                      }
                      setShowUserSearch(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-right"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {user.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                    {selectedUsers.find((u) => u.id === user.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
