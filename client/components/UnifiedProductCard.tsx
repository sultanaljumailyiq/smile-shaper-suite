import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Eye,
  ShoppingCart,
  Heart,
  Timer,
  Crown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface BaseProduct {
  id: number | string;
  name?: string;
  arabicName?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  reviewsCount?: number;
  category?: string;
  brand?: string;
  discount?: number;
  featured?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  timeLeft?: string;
  inStock?: boolean;
}

interface UnifiedProductCardProps {
  product: BaseProduct;
  className?: string;
  compact?: boolean;
  showProgressBar?: boolean;
  showCartButton?: boolean;
}

export default function UnifiedProductCard({
  product,
  className,
  compact = true,
  showProgressBar = false,
  showCartButton = true,
}: UnifiedProductCardProps) {
  const { addItem: addToCart, isInCart, getItemQuantity } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const title = product.arabicName || product.name || "";
  const reviews =
    (product as any).reviewCount ?? (product as any).reviewsCount ?? 0;
  const isFeatured = product.featured || product.isFeatured;

  return (
    <div
      className={cn(
        "group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden relative unified-product-card",
        className,
      )}
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        <Link to={`/dental-supply/product/${product.id}`}>
          <img
            src={product.image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        {typeof product.discount === "number" && product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {isFeatured && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            مميز
          </div>
        )}

        {product.isNew && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            جديد
          </div>
        )}

        {product.timeLeft && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <Timer className="w-3 h-3" />
            <span>{product.timeLeft}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => toggleFavorite(product as any)}
            className={cn(
              "w-7 h-7 shadow-md rounded-full flex items-center justify-center transition-colors",
              isFavorite(String(product.id))
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500",
            )}
          >
            <Heart className="w-3.5 h-3.5" />
          </button>
          <Link
            to={`/dental-supply/product/${product.id}`}
            className="w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gray-600 hover:text-blue-500" />
          </Link>
        </div>

        {/* Stock overlay */}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              نفذ المخزون
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={cn("p-3", compact ? "sm:p-3" : "sm:p-4 lg:p-4")}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 truncate">
            {product.brand}
          </span>
          {product.category && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({reviews})</span>
          </div>
        </div>

        {/* Optional progress bar (flash deals) */}
        {showProgressBar && product.timeLeft && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>المباع 78%</span>
              <span>متبقي 44</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: "78%" }}
              />
            </div>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-sm">
              {product.price.toLocaleString()} د.ع
            </span>
            {typeof product.originalPrice === "number" && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} د.ع
              </span>
            )}
          </div>

          {showCartButton && product.inStock !== false && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product as any);
              }}
              className={cn(
                "p-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105",
                isInCart(product as any)
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700",
              )}
            >
              {isInCart(product as any) ? (
                <span className="text-xs font-bold px-1">
                  {getItemQuantity(product as any)}
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
}
