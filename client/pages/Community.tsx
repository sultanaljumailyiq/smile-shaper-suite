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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookmarks } from "@/contexts/BookmarksContext";

// Mock data for community posts - Enhanced Arabic content
const posts = [
  {
    id: 1,
    type: "article",
    title: "نهج ثوري لعلاج جذور الأسنان بدون ألم",
    excerpt:
      "اكتشف أحدث الت��نيات التي تجعل إجراءات قناة الجذر خالية من الألم تقريباً وتقلل وقت التعافي بنسبة 50%.",
    content:
      "��م تطوير تقنية جديدة في علاج جذور الأسنان تعتمد على استخدام الليزر والتبريد المتحكم ��ه، مما يقلل الألم ب��كل كبير...",
    author: {
      name: "د. ��ارة أحمد",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      title: "أخصائي علاج العصب",
      verified: true,
      followers: 15420,
      location: "بغداد، العراق",
      specialization: "علاج العصب",
    },
    stats: {
      likes: 324,
      comments: 42,
      shares: 18,
      views: 2340,
      bookmarks: 89,
    },
    tags: ["علاج العصب", "تقنيات حديثة", "تسكين الألم"],
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=300&fit=crop",
    posted: "منذ 3 ساعات",
    featured: true,
    category: "medical",
  },
  {
    id: 2,
    type: "discussion",
    title: "ما هي أفضل طريقة للتعامل مع قل�� الأطفال من طبيب الأسنان؟",
    content:
      "أعمل كطبيب أسنان أطفال منذ 5 سنوات وما زلت أواجه تحديات مع الأطفال القلقين. هل لديكم تقنيات مجربة للتعامل مع هذه الحالات؟ 🦷👶",
    author: {
      name: "د. أحمد محمد",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      title: "طبيب ����نان أطفال",
      verified: true,
      followers: 8945,
      location: "البصرة، العراق",
      specialization: "طب أسنان الأطفال",
    },
    stats: {
      likes: 156,
      comments: 89,
      shares: 12,
      views: 1567,
      bookmarks: 45,
    },
    tags: ["طب أسنان الأطفال", "علم النفس", "إدارة القلق"],
    posted: "منذ 6 ساعات",
    featured: false,
    category: "discussion",
  },
  {
    id: 3,
    type: "case_study",
    title: "حالة معقدة: زراعة أس��ان متعددة مع ترقيع عظمي",
    excerpt:
      "مريض 45 عاماً فقد 6 أسنان أمامية في حادث. شاهد كيف استطعنا استعادة ابتسامته باستخدام تقنيات متقدمة.",
    content:
      "��ذه الحالة تتطلب تدخل جراحي متقدم باستخدام ترقيع عظمي وزراعة فوري��...",
    author: {
      name: "د. فاطمة حسن",
      avatar:
        "https://images.unsplash.com/photo-1594824475386-67eb4d8b5f59?w=100&h=100&fit=crop&crop=face",
      title: "جراح ف�� وفكين",
      verified: true,
      followers: 12340,
      location: "أربيل، العراق",
      specialization: "جراحة الفم والفكين",
    },
    stats: {
      likes: 445,
      comments: 67,
      shares: 34,
      views: 3421,
      bookmarks: 156,
    },
    tags: ["زراعة الأسنان", "ترقيع عظمي", "جراحة فم"],
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=300&fit=crop",
    posted: "منذ يوم واحد",
    featured: true,
    category: "case_study",
  },
  {
    id: 4,
    type: "video",
    title: "شرح تقنية التقويم الشفاف الحديثة",
    excerpt:
      "فيديو تعليمي مفصل ��ن استخدام التقويم الشفاف في علاج سوء الإطباق.",
    content: "في هذا الفيديو سنتعرف على التقنيات الحديثة للتقويم الشفاف...",
    author: {
      name: "د. علي حسين",
      avatar:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      title: "أخصائي تقويم أسنان",
      verified: true,
      followers: 9876,
      location: "النجف، العراق",
      specialization: "تقويم الأ��نان",
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 23,
      views: 1890,
      bookmarks: 78,
    },
    tags: ["تقويم أسنان", "تقويم شفاف", "ت��ليم"],
    image:
      "https://images.unsplash.com/photo-1576091160549-2173dba999ef?w=600&h=300&fit=crop",
    videoThumbnail: true,
    posted: "منذ 2 أيام",
    featured: false,
    category: "education",
  },
];

const suggestedExperts = [
  {
    id: 1,
    name: "د. محمد العراقي",
    title: "استشاري جراحة فم وفكين",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    followers: 25430,
    verified: true,
    posts: 234,
    engagement: "98%",
  },
  {
    id: 2,
    name: "د. زينب الحسن",
    title: "أخصائي علاج العصب",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    followers: 18920,
    verified: true,
    posts: 187,
    engagement: "95%",
  },
  {
    id: 3,
    name: "د. حسام الدين",
    title: "أخ��ائي تقويم أسنان",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    followers: 14567,
    verified: true,
    posts: 156,
    engagement: "92%",
  },
];

const trendingTopics = [
  { tag: "#علاج_الع��ب", posts: 234, growth: "+12%" },
  { tag: "#زراعة_الأسنان", posts: 189, growth: "+8%" },
  { tag: "#تقويم_الأسنان", posts: 156, growth: "+15%" },
  { tag: "#طب_أسنان_الأطفال", posts: 98, growth: "+6%" },
  { tag: "#جراحة_فم", posts: 87, growth: "+20%" },
];

export default function Community() {
  const { language } = useI18n();
  const isMobile = useIsMobile();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = [
    { id: "all", label: "الكل", icon: TrendingUp },
    { id: "articles", label: "المقالات", icon: BookOpen },
    { id: "discussions", label: "المناقشات", icon: MessageCircle },
    { id: "cases", label: "الحالا��", icon: Award },
    { id: "videos", label: "الفيديوهات", icon: Video },
  ];

  const sidebarTabs = [
    { id: "feed", label: "التغذية الرئيسية", icon: TrendingUp },
    { id: "trending", label: "الموضوعات الشائعة", icon: Star },
    { id: "experts", label: "الخبراء", icon: Award },
    { id: "events", label: "الفعاليات", icon: Calendar },
    { id: "my-posts", label: "من��وراتي", icon: User },
  ];

  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "articles") return post.type === "article";
    if (selectedFilter === "discussions") return post.type === "discussion";
    if (selectedFilter === "cases") return post.type === "case_study";
    if (selectedFilter === "videos") return post.type === "video";
    return true;
  });

  const handleBookmarkToggle = (post: any) => {
    if (isBookmarked(post.id)) {
      removeBookmark(post.id);
    } else {
      const bookmarkItem = {
        id: post.id,
        title: post.title,
        type: post.type,
        author: post.author,
        image: post.image,
        excerpt: post.excerpt,
        content: post.content,
        stats: post.stats,
        tags: post.tags,
        posted: post.posted,
        addedDate: new Date().toISOString().split("T")[0],
        section: "community" as const,
        featured: post.featured,
      };
      addBookmark(bookmarkItem);
    }
  };

  const PostCard = ({ post }: { post: any }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Post Header */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <Link to={`/profile/${post.author.name}`} className="flex-shrink-0">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  to={`/profile/${post.author.name}`}
                  className="hover:underline"
                >
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    {post.author.name}
                  </h3>
                </Link>
                {post.author.verified && (
                  <Verified className="w-4 h-4 text-blue-500 fill-current flex-shrink-0" />
                )}
                {post.featured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                {post.author.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{post.author.location}</span>
                <span>•</span>
                <Clock className="w-3 h-3" />
                <span>{post.posted}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          {post.type === "article" && (
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 leading-tight">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}
          {post.type === "discussion" && (
            <div>
              <h2 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {post.content}
              </p>
            </div>
          )}
          {post.type === "case_study" && (
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}
          {post.type === "video" && (
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs hover:bg-blue-100 cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Post Image/Video */}
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 sm:h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity"
          />
          {post.videoThumbnail && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <Video className="w-8 h-8 text-gray-700 ml-1" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 sm:px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.stats.views.toLocaleString()}
            </span>
            <span>{post.stats.comments} تعل��ق</span>
            <span>{post.stats.shares} مشاركة</span>
          </div>
          <span>{post.stats.bookmarks} إشا��ة مرجعية</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group">
              <Heart className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
              <span className="text-sm text-gray-700 font-medium">
                {post.stats.likes}
              </span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group">
              <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm text-gray-700 font-medium">
                {post.stats.comments}
              </span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group">
              <Repeat2 className="w-5 h-5 text-gray-500 group-hover:text-green-500 transition-colors" />
              <span className="text-sm text-gray-700 font-medium">
                {post.stats.shares}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors group">
              <Share2 className="w-5 h-5 text-gray-500 group-hover:text-purple-500 transition-colors" />
            </button>

            <button
              onClick={() => handleBookmarkToggle(post)}
              className={cn(
                "p-2 rounded-lg transition-colors group",
                isBookmarked(post.id)
                  ? "bg-yellow-50 hover:bg-yellow-100"
                  : "hover:bg-gray-50",
              )}
            >
              <Bookmark
                className={cn(
                  "w-5 h-5 transition-colors",
                  isBookmarked(post.id)
                    ? "text-yellow-600 fill-current"
                    : "text-gray-500 group-hover:text-yellow-500",
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExpertCard = ({ expert }: { expert: any }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {expert.name}
            </h3>
            {expert.verified && (
              <Verified className="w-4 h-4 text-blue-500 fill-current flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-600 truncate">{expert.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div>
          <div className="text-sm font-bold text-gray-900">
            {expert.followers.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">متابع</div>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">{expert.posts}</div>
          <div className="text-xs text-gray-600">منشور</div>
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">
            {expert.engagement}
          </div>
          <div className="text-xs text-gray-600">تفاعل</div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        متابعة
      </button>
    </div>
  );

  const CreatePostModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-full sm:max-w-lg max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">إنشاء منشور جديد</h2>
          <button
            onClick={() => setShowCreatePost(false)}
            className="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-3 mb-4">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">د. أحمد العراقي</h3>
              <p className="text-sm text-gray-600">أخصائي طب الأسنان</p>
            </div>
          </div>

          <textarea
            placeholder="ما الذي تريد مشاركته مع المجتمع الطبي؟"
            className="w-full h-32 p-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">صورة</span>
              </button>
              <button className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">فيديو</span>
              </button>
              <button className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors">
                <Smile className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">مشاعر</span>
              </button>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              نشر
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div className="sticky top-0 bg-white border-b border-gray-200 z-30 md:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileMenu(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">المجتمع ا��طبي</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300",
        showMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300",
          showMobileMenu ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">القائمة</h2>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* User Profile */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 mb-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
                alt="د. أحمد العراقي"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <h3 className="font-bold">د. أحمد العراقي</h3>
                <p className="text-sm opacity-90">أخصائي طب الأسنان</p>
              </div>
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold">245</div>
                <div className="opacity-90">متابِع</div>
              </div>
              <div className="text-center">
                <div className="font-bold">856</div>
                <div className="opacity-90">متابَع</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobileMenu(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-gray-50 with-floating-nav"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Mobile Header */}
      {isMobile && <MobileHeader />}

      {/* Mobile Sidebar */}
      <MobileSidebar />

      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-4 sm:py-6">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 space-y-6 sticky top-24 self-start">
            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
                  alt="د. أحمد العراقي"
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-3 ring-4 ring-blue-50"
                />
                <h3 className="font-bold text-gray-900">د. أحمد العراقي</h3>
                <p className="text-sm text-gray-600 mb-3">أخصائي طب الأسنان</p>

                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">245</div>
                    <div className="text-gray-600">متابِع</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">856</div>
                    <div className="text-gray-600">متابَع</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <nav className="p-2">
                {sidebarTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                إحصائيات المجتمع
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الأعضاء</span>
                  <span className="font-semibold text-blue-600">12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">المنشورات</span>
                  <span className="font-semibold text-green-600">3,567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">المناقشات</span>
                  <span className="font-semibold text-purple-600">8,901</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">الخبراء</span>
                  <span className="font-semibold text-orange-600">245</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 max-w-2xl">
          {activeTab === "feed" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                        selectedFilter === filter.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                      )}
                    >
                      <filter.icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Create Post */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <button
                    data-create-post
                    onClick={() => setShowCreatePost(true)}
                    className="flex-1 text-right p-3 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors text-sm sm:text-base"
                  >
                    ما الذي تريد مشاركته مع الم��تمع؟
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 sm:gap-4">
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-sm hidden sm:inline">صورة</span>
                    </button>
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="flex items-center gap-2 text-green-600 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-sm hidden sm:inline">فيديو</span>
                    </button>
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="text-sm hidden sm:inline">مقال</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    نشر
                  </button>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-4 sm:space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "experts" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  الخبراء المقترحون
                </h2>
                <div className="grid gap-4">
                  {suggestedExperts.map((expert) => (
                    <ExpertCard key={expert.id} expert={expert} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "trending" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  الموضوعات الشائعة
                </h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors cursor-pointer"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {topic.tag}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {topic.posts} منشور
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-green-600 text-sm font-medium">
                          {topic.growth}
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Desktop only */}
        {!isMobile && (
          <div className="w-80 space-y-6 sticky top-20 self-start">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">��لموضوعات الشائعة</h3>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="space-y-3">
                {trendingTopics.slice(0, 4).map((topic, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{topic.tag}</p>
                      <span className="text-green-600 text-sm font-medium">
                        {topic.growth}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{topic.posts} منشور</p>
                  </div>
                ))}
              </div>
              <Link
                to="/community/trending"
                className="block mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                عرض المزيد
              </Link>
            </div>

            {/* Suggested Experts */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">خبراء مقترحون</h3>
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="space-y-4">
                {suggestedExperts.slice(0, 3).map((expert) => (
                  <div key={expert.id} className="flex items-center gap-3">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h4 className="font-medium text-gray-900 text-sm truncate">
                          {expert.name}
                        </h4>
                        {expert.verified && (
                          <Verified className="w-3 h-3 text-blue-500 fill-current flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {expert.title}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      متابعة
                    </button>
                  </div>
                ))}
              </div>
              <Link
                to="/community/experts"
                className="block mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                عرض جميع الخبراء
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">إجراءات سريعة</h3>
              <div className="space-y-2">
                <Link
                  to="/community/groups"
                  className="block w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">تصفح المجموعات</span>
                  </div>
                </Link>
                <button className="block w-full bg-white/20 hover:bg-white/30 rounded-lg p-3 transition-colors">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      الفعاليا�� القادمة
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button - Mobile */}
      {isMobile && (
        <button
          onClick={() => setShowCreatePost(true)}
          className="fixed bottom-20 left-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-40"
        >
          <Plus className="w-6 h-6 mx-auto" />
        </button>
      )}

      {/* Create Post Modal */}
      {showCreatePost && <CreatePostModal />}

      {/* Bottom padding handled by CSS */}
    </div>
  );
}
