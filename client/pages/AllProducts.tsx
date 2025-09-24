import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UnifiedProductCard from "@/components/UnifiedProductCard";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { dentalCategories } from "@/data/categories";
import {
  dentalProducts,
  searchProducts,
  getProductsByCategory,
} from "@/data/dentalProducts";
import CategoryStrip from "@/components/CategoryStrip";
import CategoryProductsStrip from "@/components/CategoryProductsStrip";

const sortOptions = [
  { label: "الأحدث", value: "newest" },
  { label: "الأكثر مبيعاً", value: "bestseller" },
  { label: "السعر: من الأقل للأعلى", value: "price_low" },
  { label: "السعر: من الأعلى للأقل", value: "price_high" },
  { label: "الأعلى تقييماً", value: "rating" },
];

export default function AllProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const isMobile = useIsMobile();
  const { addItem: addToCart, isInCart, getItemQuantity } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = dentalProducts;

    // Search filter
    if (searchQuery.trim()) {
      products = searchProducts(searchQuery);
    }

    // Category filter
    if (selectedCategory !== "all") {
      const category = dentalCategories.find(
        (cat) => cat.id === selectedCategory,
      );
      if (category) {
        products = products.filter(
          (product) =>
            product.category.toLowerCase() === category.name.toLowerCase(),
        );
      }
    }

    // Sort products
    products = [...products].sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "bestseller":
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    return products;
  }, [searchQuery, selectedCategory, sortBy]);

  const ProductCard = ({ product }: { product: any }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden relative unified-product-card lg:w-auto">
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        <Link to={`/dental-supply/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.arabicName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isNew && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              جديد
            </div>
          )}
          {product.isExclusive && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              حصري
            </div>
          )}
          {product.discount && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product);
            }}
            className={cn(
              "w-8 h-8 shadow-md rounded-full flex items-center justify-center transition-colors",
              isFavorite(product.id)
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500",
            )}
          >
            <Heart className="w-4 h-4" />
          </button>
          <Link
            to={`/dental-supply/product/${product.id}`}
            className="w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium truncate">
            {product.brand}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/dental-supply/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight hover:text-blue-600 transition-colors">
            {product.arabicName}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">
              {product.price.toLocaleString()} د.ع
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} د.ع
              </span>
            )}
          </div>

          {/* Compact Cart Button */}
          {product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className={cn(
                "p-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105",
                isInCart(product.id)
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700",
              )}
            >
              {isInCart(product.id) ? (
                <span className="text-xs font-bold px-1">
                  {getItemQuantity(product.id)}
                </span>
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" dir="rtl">
      <main className="p-2 md:p-4 lg:p-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            جميع المنتجات
          </h1>
          <p className="text-gray-600">
            تصفح مجموعتنا الكاملة من منتجات طب الأسنان
          </p>
        </div>

        {/* Categories Strip */}
        <CategoryStrip
          title="الفئات الرئيسية"
          viewAllLink="/dental-supply/categories"
        />

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">جميع الفئات</option>
              {dentalCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.arabicName}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-3 rounded-lg border transition-colors",
                  viewMode === "grid"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
                )}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-3 rounded-lg border transition-colors",
                  viewMode === "list"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredProducts.length} منتج
          </h2>
        </div>

        {/* Products Grid */}
        <div
          className={cn(
            "gap-4",
            viewMode === "grid"
              ? "unified-product-grid product-scroll-enhanced"
              : "grid grid-cols-1",
          )}
        >
          {filteredProducts.map((product) => (
            <UnifiedProductCard key={product.id} product={product} compact />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لا توجد منتجات
            </h3>
            <p className="text-gray-500 mb-4">
              لم نجد أي منتجات تطابق معايير البحث
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("newest");
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              إعادة تعيين البحث
            </button>
          </div>
        )}

        {/* Popular Categories with Products - Show when no filters applied */}
        {searchQuery === "" && selectedCategory === "all" && (
          <div className="mt-8 space-y-6">
            <CategoryProductsStrip categoryName="Restorative Materials" />
            <CategoryProductsStrip categoryName="Endodontics" />
            <CategoryProductsStrip categoryName="Orthodontics" />
          </div>
        )}
      </main>
    </div>
  );
}
