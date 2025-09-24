import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Award,
  Users,
  Brain,
  Filter,
  Star,
  ThumbsUp,
  Eye,
  User,
  Calendar,
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  UserPlus,
  Search,
  Bell,
  MoreHorizontal,
  Verified,
  Globe,
  Smile,
  Repeat2,
  Zap,
  Settings,
  Home,
  Menu,
  X,
  Send,
  Camera,
  Mic,
  MapPin,
  Briefcase,
  GraduationCap,
  PlayCircle,
  Download,
  FileVideo,
  Headphones,
  BookmarkPlus,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/contexts/BookmarksContext";

// أنواع المحتوى
type ContentType =
  | "discussion"
  | "course"
  | "webinar"
  | "article"
  | "case-study"
  | "research";

interface Post {
  id: number;
  type: ContentType;
  title: string;
  excerpt: string;
  content?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
    specialization?: string;
  };
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  image?: string;
  video?: string;
  tags: string[];
  category: string;
  difficulty?: "مبتدئ" | "متوسط" | "متقدم";
  duration?: string;
  price?: number;
  rating?: number;
  enrolled?: number;
}

// بيانات وهمية للمنشورات والدورات
const posts: Post[] = [
  {
    id: 1,
    type: "course",
    title: "دورة ز��اعة الأسنان المتقدمة",
    excerpt:
      "دورة شاملة تغطي أحدث تقنيات زراعة الأسنان باستخدام التكنولوجيا ثلاثية الأبعاد",
    author: {
      name: "د. أحمد المهندس",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      role: "استشاري زراعة الأسنان",
      verified: true,
      specialization: "جراحة الفم والفكين",
    },
    timestamp: "منذ يومين",
    likes: 245,
    comments: 67,
    shares: 23,
    views: 1240,
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=300&fit=crop",
    tags: ["زراعة الأسنان", "جراحة", "تكنولوجيا"],
    category: "جراحة",
    difficulty: "متقدم",
    duration: "8 ساعات",
    price: 299,
    rating: 4.8,
    enrolled: 156,
  },
  {
    id: 2,
    type: "discussion",
    title: "مناقشة: أفضل الطرق لعلاج حساسية الأسنان",
    excerpt:
      "ما هي تجاربكم مع علاج حساسية الأسنان؟ وما أفضل المواد المستخدمة في العلاج؟",
    author: {
      name: "د. فاطمة الزهراء",
      avatar:
        "https://images.unsplash.com/photo-1594824720259-6c73a635c9b9?w=100&h=100&fit=crop&crop=face",
      role: "طبيبة أسنان عامة",
      verified: true,
    },
    timestamp: "منذ 4 ساعات",
    likes: 89,
    comments: 34,
    shares: 12,
    tags: ["حساسية الأسنان", "علاج", "مناقشة"],
    category: "علاج الأسنان",
  },
  {
    id: 3,
    type: "webinar",
    title: "ندوة مباشرة: مستقبل طب الأسنان الرقمي",
    excerpt:
      "ندوة تفاعلية حول التطورات الحديثة في طب الأسنان الرقمي والذكاء الاصطناعي",
    author: {
      name: "د. محمد السعيد",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      role: "أستاذ طب الأسنان",
      verified: true,
      specialization: "تكنولوجيا طبية",
    },
    timestamp: "غداً الساعة 8 مساءً",
    likes: 156,
    comments: 23,
    shares: 45,
    views: 890,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop",
    tags: ["طب رقمي", "ذكاء اصطناعي", "ندوة مباشرة"],
    category: "تكنولوجيا",
    duration: "90 دقيقة",
  },
  {
    id: 4,
    type: "article",
    title: "بحث: تأثير التدخين على صحة اللثة",
    excerpt:
      "دراسة شاملة حول العلاقة بين التدخين وأمراض اللثة مع التوصيات العلاجية",
    author: {
      name: "د. عائشة النور",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      role: "أخصائية أمراض اللثة",
      verified: true,
    },
    timestamp: "منذ أسبوع",
    likes: 267,
    comments: 89,
    shares: 78,
    views: 2340,
    tags: ["أمراض اللثة", "التدخين", "بحث علمي"],
    category: "أمراض اللثة",
  },
  {
    id: 5,
    type: "case-study",
    title: "حالة: إعادة تأهيل شامل للفم",
    excerpt:
      "عرض حالة مريض خضع لإعادة تأهيل شامل للفم باستخدام زراعة وتركيبات متقدمة",
    author: {
      name: "د. يوسف الطيب",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      role: "استشاري تركيبات",
      verified: true,
    },
    timestamp: "منذ 3 أيام",
    likes: 134,
    comments: 45,
    shares: 19,
    views: 756,
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=300&fit=crop",
    tags: ["تركيبات", "إعادة تأهيل", "حالة سريرية"],
    category: "تركيبات الأسنان",
  },
];

// فئات المحتوى
const contentCategories = [
  { id: "all", label: "جميع المنشورات", icon: Globe, color: "gray" },
  { id: "discussion", label: "المناقشات", icon: MessageCircle, color: "blue" },
  { id: "course", label: "الدورات", icon: GraduationCap, color: "purple" },
  { id: "webinar", label: "الندوات", icon: Video, color: "green" },
  { id: "article", label: "المقالات", icon: BookOpen, color: "orange" },
  {
    id: "case-study",
    label: "الحالات السريرية",
    icon: FileText,
    color: "teal",
  },
];

const typeConfig: Record<
  ContentType,
  { label: string; icon: React.ComponentType<any>; color: string }
> = {
  discussion: { label: "مناقشة", icon: MessageCircle, color: "blue" },
  course: { label: "دورة", icon: GraduationCap, color: "purple" },
  webinar: { label: "ندوة", icon: Video, color: "green" },
  article: { label: "مقال", icon: BookOpen, color: "orange" },
  "case-study": { label: "حالة سريرية", icon: FileText, color: "teal" },
  research: { label: "بحث", icon: Brain, color: "indigo" },
};

export default function CommunityEducationHub() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.type === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const handleBookmark = (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (bookmarks.some((b) => b.id === postId)) {
      removeBookmark(postId);
    } else {
      addBookmark({
        id: postId,
        title: post.title,
        url: `/community/post/${postId}`,
        type: "community_post",
      });
    }
  };

  const renderPostCard = (post: Post) => {
    const typeInfo = typeConfig[post.type];
    const isBookmarked = bookmarks.some((b) => b.id === post.id);

    return (
      <div
        key={post.id}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        {/* صورة المنشور */}
        {post.image && (
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium text-white",
                  `bg-${typeInfo.color}-500`,
                )}
              >
                <typeInfo.icon className="w-3 h-3 inline ml-1" />
                {typeInfo.label}
              </span>
            </div>
            {post.type === "course" && post.duration && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                <Clock className="w-3 h-3 inline ml-1" />
                {post.duration}
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* معلومات المؤلف */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">
                  {post.author.name}
                </h4>
                {post.author.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">{post.author.role}</p>
            </div>
            <div className="text-xs text-gray-500">{post.timestamp}</div>
          </div>

          {/* محتوى المنشور */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-3">
              {post.excerpt}
            </p>

            {/* معلومات الدورة */}
            {post.type === "course" && (
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                {post.difficulty && (
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {post.difficulty}
                  </span>
                )}
                {post.rating && (
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {post.rating}
                  </span>
                )}
                {post.enrolled && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {post.enrolled} مشترك
                  </span>
                )}
              </div>
            )}

            {/* العلامات */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* إحصائيات التفاعل */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">{post.shares}</span>
              </button>
              {post.views && (
                <span className="flex items-center gap-2 text-gray-500">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm">{post.views}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBookmark(post.id)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isBookmarked
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-400 hover:text-blue-600 hover:bg-blue-50",
                )}
              >
                <Bookmark
                  className={cn("w-5 h-5", isBookmarked && "fill-current")}
                />
              </button>

              {post.type === "course" && post.price && (
                <div className="text-lg font-bold text-green-600">
                  ${post.price}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 with-floating-nav pt-4" dir="rtl">
      <div className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto p-4">
          {/* رأس الصفحة */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">المجتمع والتعليم</h1>
                <p className="text-purple-100 text-lg">
                  تواصل، تعلم، وتطور مع مجتمع أطباء الأسنان
                </p>
              </div>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {/* إحصائيات المجتمع */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold">2.5K</div>
                <div className="text-purple-100 text-sm">أعضاء نشطون</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold">150</div>
                <div className="text-purple-100 text-sm">دورة تدريبية</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold">45</div>
                <div className="text-purple-100 text-sm">ندوة هذا الشهر</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold">890</div>
                <div className="text-purple-100 text-sm">مقال علمي</div>
              </div>
            </div>
          </div>

          {/* شريط البحث والفلاتر */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* البحث */}
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث في المنشورات والدورات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* فلتر سريع */}
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-500" />
                <span>تصفية</span>
              </button>
            </div>

            {/* فئات المحتوى */}
            <div className="flex gap-2 overflow-x-auto">
              {contentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === category.id
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                  )}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* شبكة المنشورات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(renderPostCard)}
          </div>

          {/* زر تحميل المزيد */}
          <div className="text-center mt-8">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
              تحميل المزيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
