import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Home,
  Grid3X3,
  Gift,
  ShoppingCart,
  Package,
  Truck,
  Award,
  Menu,
  X,
  Search,
  GraduationCap,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

// قائمة الصفحات المحدثة في المتجر - فقط العروض والأقسام ال��ساسية
const storePages = [
  {
    icon: Home,
    label: "الرئيسية",
    href: "/dental-supply",
    badge: null,
    color: "blue",
    description: "الصفحة الرئيسية للمتجر",
  },
  {
    icon: Grid3X3,
    label: "جميع الفئات",
    href: "/dental-supply/categories",
    badge: null,
    color: "purple",
    description: "تصفح جميع فئات المنتجات",
  },
  {
    icon: Package,
    label: "جميع المنتجات",
    href: "/dental-supply/products",
    badge: null,
    color: "gray",
    description: "كامل كتالوج المنتجات",
  },
  {
    icon: Gift,
    label: "العروض والخصومات",
    href: "/dental-supply/offers",
    badge: "70%",
    color: "green",
    description: "جميع العروض والخصومات الحصرية",
  },
  {
    icon: Heart,
    label: "المفضلة",
    href: "/dental-supply/favorites",
    badge: null,
    color: "pink",
    description: "منتجاتك المفضلة",
  },
  {
    icon: ShoppingCart,
    label: "سلة التسوق",
    href: "/dental-supply/cart",
    badge: null,
    color: "blue",
    description: "عربة التسوق الخاصة بك",
  },
  {
    icon: Truck,
    label: "الموردين",
    href: "/dental-supply/suppliers",
    badge: null,
    color: "teal",
    description: "قائمة الموردين المعتمدين",
  },
  {
    icon: Award,
    label: "العلامات التجارية",
    href: "/dental-supply/brands",
    badge: null,
    color: "emerald",
    description: "أشهر العلامات التجارية",
  },
  {
    icon: GraduationCap,
    label: "طلاب طب الأسنان",
    href: "/dental-supply/students",
    badge: "خصم",
    color: "violet",
    description: "منتجات مخصصة للطلاب",
  },
];

export default function StoreLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Cart and Favorites contexts
  const { state: cartState } = useCart();
  const { favorites } = useFavorites();
  const cartItems = cartState?.items || [];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById("store-sidebar");
        const menuButton = document.getElementById("store-menu-button");
        if (
          sidebar &&
          !sidebar.contains(event.target as Node) &&
          menuButton &&
          !menuButton.contains(event.target as Node)
        ) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Get current page info
  const getCurrentPageInfo = () => {
    const currentPage = storePages.find(
      (page) => page.href === location.pathname,
    );
    return currentPage || storePages[0];
  };

  const currentPageInfo = getCurrentPageInfo();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      dir="rtl"
    >
      <div className="flex relative">
        {/* Desktop Sidebar */}
        <div className={cn("hidden lg:block fixed top-16 right-0 bottom-0 bg-white border-l border-gray-200 z-30 shadow-xl transition-all duration-300", sidebarCollapsed ? "w-16" : "w-64")}>
          <div className="h-full overflow-y-auto">
            {/* Store Header with Animation */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full translate-x-8 translate-y-8"></div>
                <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full -translate-x-6 -translate-y-6"></div>
              </div>
              <div className="relative text-center text-white">
                <button
                  onClick={() => setSidebarCollapsed((v) => !v)}
                  className="absolute top-2 left-2 bg-white/20 hover:bg-white/30 text-white rounded-lg px-2 py-1 text-xs"
                  title={sidebarCollapsed ? "توسيع القائمة" : "تصغير القائمة"}
                >
                  {sidebarCollapsed ? "⟩" : "⟨"}
                </button>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Package className="w-8 h-8" />
                </div>
                <h2 className="font-bold text-xl mb-2">الأقسام</h2>
                <p className="text-white/90 text-sm mb-3">تصفح أقسا�� المتجر</p>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Main Menu - Compact and Professional */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                <h3 className="text-sm font-bold text-gray-700">
                  أقسام المتجر
                </h3>
                <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent"></div>
              </div>
              <div className="space-y-1">
                {storePages.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200 shadow-md transform scale-105"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 hover:transform hover:scale-102",
                      )}
                    >
                      {/* Hover Effect Background */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity duration-300",
                          !isActive && "group-hover:opacity-5",
                        )}
                      ></div>

                      <div
                        className={cn(
                          "relative p-2 rounded-xl transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:scale-110 z-10",
                          item.color === "blue" && "bg-blue-100 text-blue-600",
                          item.color === "purple" &&
                            "bg-purple-100 text-purple-600",
                          item.color === "green" &&
                            "bg-green-100 text-green-600",
                          item.color === "pink" && "bg-pink-100 text-pink-600",
                          item.color === "gray" && "bg-gray-100 text-gray-600",
                          item.color === "teal" && "bg-teal-100 text-teal-600",
                          item.color === "emerald" &&
                            "bg-emerald-100 text-emerald-600",
                          item.color === "violet" &&
                            "bg-violet-100 text-violet-600",
                          isActive &&
                            "bg-white shadow-lg border border-purple-200 scale-110",
                        )}
                      >
                        <Icon className="w-5 h-5 relative z-10" />
                      </div>
                      <div className="flex-1 relative z-10">
                        {!sidebarCollapsed && (
                          <span className="font-semibold text-sm group-hover:font-bold transition-all duration-300">
                            {item.label}
                          </span>
                        )}
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "relative z-10 text-xs px-2 py-1 rounded-full font-bold transition-all duration-300 group-hover:scale-110",
                            isActive
                              ? "bg-purple-600 text-white shadow-lg"
                              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white group-hover:shadow-lg",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.href === "/dental-supply/cart" &&
                        cartItems.length > 0 && (
                          <span className="relative z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse shadow-lg">
                            {cartItems.length}
                          </span>
                        )}
                      {item.href === "/dental-supply/favorites" &&
                        favorites.length > 0 && (
                          <span className="relative z-10 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-bounce shadow-lg">
                            {favorites.length}
                          </span>
                        )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Professional Store Stats */}
            <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-purple-600">2.5K+</div>
                  <div className="text-xs text-gray-500">منتج</div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-green-600">50+</div>
                  <div className="text-xs text-gray-500">علامة تجارية</div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-blue-600">25+</div>
                  <div className="text-xs text-gray-500">مورد</div>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-orange-600">4.8</div>
                  <div className="text-xs text-gray-500">تقييم</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div
              id="store-sidebar"
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden transform transition-transform duration-300 shadow-2xl"
            >
              {/* Mobile Sidebar Header */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full translate-x-6 translate-y-6"></div>
                </div>
                <div className="flex items-center justify-between relative">
                  <div className="text-white">
                    <h2 className="font-bold text-lg">متجر المستلزمات</h2>
                    <p className="text-white/90 text-sm">مستلزمات طب الأسنان</p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Sidebar Content */}
              <div className="h-full overflow-y-auto pb-20">
                <div className="p-4">
                  <div className="space-y-2">
                    {storePages.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                            isActive
                              ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200 shadow-md"
                              : "text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700",
                          )}
                        >
                          <div
                            className={cn(
                              "p-2 rounded-xl transition-all duration-300 group-hover:bg-white group-hover:shadow-lg group-hover:scale-110",
                              item.color === "blue" &&
                                "bg-blue-100 text-blue-600",
                              item.color === "purple" &&
                                "bg-purple-100 text-purple-600",
                              item.color === "green" &&
                                "bg-green-100 text-green-600",
                              item.color === "pink" &&
                                "bg-pink-100 text-pink-600",
                              item.color === "gray" &&
                                "bg-gray-100 text-gray-600",
                              item.color === "teal" &&
                                "bg-teal-100 text-teal-600",
                              item.color === "emerald" &&
                                "bg-emerald-100 text-emerald-600",
                              item.color === "violet" &&
                                "bg-violet-100 text-violet-600",
                              isActive &&
                                "bg-white shadow-lg border border-purple-200",
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-sm group-hover:font-bold transition-all duration-300">
                              {item.label}
                            </span>
                          </div>
                          {item.badge && (
                            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold group-hover:scale-110 transition-transform duration-300">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <div
          className={cn(
            "flex-1 min-h-screen transition-all duration-300",
            sidebarCollapsed ? "lg:mr-16" : "lg:mr-64",
          )}
        >
          <div className="relative pb-20 lg:pb-0">
            <Outlet />
          </div>
        </div>
      </div>

      {/* التنقل السفلي للمتجر - ظاهر فقط على الهاتف */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
        <div className="flex items-center justify-around py-1.5 px-1 max-w-lg mx-auto">
          {storePages.slice(0, 5).map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 p-1.5 transition-all duration-200 min-h-[48px] touch-manipulation flex-1",
                  isActive
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                <div
                  className={cn(
                    "p-1 rounded-lg transition-colors relative",
                    isActive && "bg-purple-100",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.href === "/dental-supply/cart" &&
                    cartItems.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-bold animate-pulse min-w-[16px] h-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  {item.href === "/dental-supply/favorites" &&
                    favorites.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-xs px-1 py-0.5 rounded-full font-bold min-w-[16px] h-4 flex items-center justify-center">
                        {favorites.length}
                      </span>
                    )}
                </div>
                <span className="text-xs font-medium text-center leading-none truncate max-w-full">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
