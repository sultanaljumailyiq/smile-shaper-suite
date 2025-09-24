import React, { useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package,
  Store,
  Star,
  Eye,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Target,
  Calendar,
  Filter,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Bell,
  Settings,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Heart,
  Share2,
  MapPin,
  Phone,
  Mail,
  Building,
  CreditCard,
  Truck,
  Grid,
  List,
  X,
  ArrowUp,
  ArrowDown,
  Percent,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

// Mock data for marketplace analytics
const marketplaceStats = {
  patientMarketplace: {
    totalServices: 1234,
    activeBookings: 456,
    revenue: 125000,
    growthRate: 18.5,
    avgRating: 4.7,
    providers: 234,
  },
  dentalSupplyMarket: {
    totalProducts: 5678,
    activeOrders: 789,
    revenue: 850000,
    growthRate: 24.3,
    avgRating: 4.8,
    suppliers: 156,
  },
  overall: {
    totalUsers: 12456,
    monthlyRevenue: 975000,
    totalTransactions: 8765,
    customerSatisfaction: 92,
  },
};

// Mock data for recent orders/bookings
const recentActivity = [
  {
    id: 1,
    type: "service_booking",
    customer: "Sarah Johnson",
    service: "Dental Cleaning",
    provider: "SmileMax Dental",
    amount: 120,
    status: "confirmed",
    timestamp: "2 minutes ago",
    marketplace: "patient",
  },
  {
    id: 2,
    type: "product_order",
    customer: "Dr. Michael Chen",
    product: "Digital X-Ray System",
    supplier: "DentalTech Pro",
    amount: 12999,
    status: "processing",
    timestamp: "15 minutes ago",
    marketplace: "supply",
  },
  {
    id: 3,
    type: "service_booking",
    customer: "Emily Rodriguez",
    service: "Teeth Whitening",
    provider: "Bright Smile Studio",
    amount: 249,
    status: "completed",
    timestamp: "1 hour ago",
    marketplace: "patient",
  },
  {
    id: 4,
    type: "product_order",
    customer: "Dr. David Kim",
    product: "Nitrile Gloves (Box of 100)",
    supplier: "MedSupply Direct",
    amount: 25,
    status: "shipped",
    timestamp: "2 hours ago",
    marketplace: "supply",
  },
];

// Mock data for top providers/suppliers
const topPerformers = [
  {
    id: 1,
    name: "SmileMax Dental Center",
    type: "Service Provider",
    revenue: 45000,
    rating: 4.9,
    bookings: 234,
    marketplace: "patient",
    growth: 15,
  },
  {
    id: 2,
    name: "DentalTech Solutions",
    type: "Equipment Supplier",
    revenue: 125000,
    rating: 4.8,
    orders: 456,
    marketplace: "supply",
    growth: 28,
  },
  {
    id: 3,
    name: "Perfect Align Orthodontics",
    type: "Service Provider",
    revenue: 38000,
    rating: 4.9,
    bookings: 178,
    marketplace: "patient",
    growth: 22,
  },
  {
    id: 4,
    name: "MedSupply Direct",
    type: "Disposables Supplier",
    revenue: 67000,
    rating: 4.7,
    orders: 789,
    marketplace: "supply",
    growth: 12,
  },
];

// Mock data for pending approvals
const pendingApprovals = [
  {
    id: 1,
    type: "provider_registration",
    name: "Downtown Dental Care",
    submittedBy: "Dr. Lisa Park",
    category: "General Dentistry",
    location: "San Francisco, CA",
    documents: ["License", "Insurance", "Certification"],
    timestamp: "2 days ago",
    urgency: "high",
  },
  {
    id: 2,
    type: "supplier_registration",
    name: "Premium Dental Supplies Inc",
    submittedBy: "John Smith",
    category: "Dental Materials",
    location: "Los Angeles, CA",
    documents: ["Business License", "Tax ID", "Product Catalog"],
    timestamp: "1 day ago",
    urgency: "medium",
  },
  {
    id: 3,
    type: "product_listing",
    name: "Advanced LED Curing Light",
    submittedBy: "BrightDental Tech",
    category: "Equipment",
    price: 1299,
    documents: ["Product Specs", "FDA Approval", "Warranty"],
    timestamp: "6 hours ago",
    urgency: "low",
  },
];

// Mock data for promotional campaigns
const activeCampaigns = [
  {
    id: 1,
    title: "Holiday Equipment Sale",
    type: "percentage_discount",
    discount: 40,
    marketplace: "supply",
    startDate: "Dec 15, 2024",
    endDate: "Dec 31, 2024",
    budget: 50000,
    spent: 23000,
    conversions: 156,
    status: "active",
  },
  {
    id: 2,
    title: "New Patient Special",
    type: "fixed_discount",
    discount: 50,
    marketplace: "patient",
    startDate: "Dec 1, 2024",
    endDate: "Jan 15, 2025",
    budget: 25000,
    spent: 18500,
    conversions: 234,
    status: "active",
  },
  {
    id: 3,
    title: "Bulk Order Incentive",
    type: "bulk_discount",
    discount: 25,
    marketplace: "supply",
    startDate: "Nov 1, 2024",
    endDate: "Dec 31, 2024",
    budget: 75000,
    spent: 62000,
    conversions: 89,
    status: "ending_soon",
  },
];

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  approval: any;
}

function ApprovalModal({ isOpen, onClose, approval }: ApprovalModalProps) {
  if (!isOpen || !approval) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Review {approval.type.replace("_", " ")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {approval.name}
              </h3>
              <p className="text-gray-600">
                Submitted by {approval.submittedBy}
              </p>
              <p className="text-sm text-gray-500">{approval.timestamp}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Category</h4>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {approval.category}
              </span>
            </div>

            {approval.location && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {approval.location}
                </div>
              </div>
            )}

            {approval.price && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Price</h4>
                <div className="text-2xl font-bold text-gray-900">
                  ${approval.price.toLocaleString()}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Submitted Documents
              </h4>
              <div className="space-y-2">
                {approval.documents.map((doc: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{doc}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketplaceAdmin() {
  const { language, t } = useI18n();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Marketplace Administration
          </h1>
          <p className="text-gray-600">
            Manage patient marketplace and dental supply market
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <nav className="flex">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "patient-market", label: "Patient Market", icon: Heart },
            { id: "supply-market", label: "Supply Market", icon: Package },
            { id: "providers", label: "Providers", icon: Store },
            { id: "approvals", label: "Approvals", icon: CheckCircle },
            { id: "campaigns", label: "Campaigns", icon: Target },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  +21.5%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${marketplaceStats.overall.monthlyRevenue.toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">Monthly Revenue</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  +15.2%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {marketplaceStats.overall.totalUsers.toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">Total Users</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  +18.7%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {marketplaceStats.overall.totalTransactions.toLocaleString()}
              </div>
              <div className="text-gray-600 text-sm">Total Transactions</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <ArrowUp className="w-4 h-4" />
                  +2.1%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {marketplaceStats.overall.customerSatisfaction}%
              </div>
              <div className="text-gray-600 text-sm">Customer Satisfaction</div>
            </div>
          </div>

          {/* Marketplace Comparison */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Patient Marketplace
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Services</span>
                  <span className="font-semibold">
                    {marketplaceStats.patientMarketplace.totalServices}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Bookings</span>
                  <span className="font-semibold">
                    {marketplaceStats.patientMarketplace.activeBookings}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold text-green-600">
                    $
                    {marketplaceStats.patientMarketplace.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-semibold text-green-600">
                    +{marketplaceStats.patientMarketplace.growthRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Service Providers</span>
                  <span className="font-semibold">
                    {marketplaceStats.patientMarketplace.providers}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Dental Supply Market
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Products</span>
                  <span className="font-semibold">
                    {marketplaceStats.dentalSupplyMarket.totalProducts}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Orders</span>
                  <span className="font-semibold">
                    {marketplaceStats.dentalSupplyMarket.activeOrders}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold text-green-600">
                    $
                    {marketplaceStats.dentalSupplyMarket.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-semibold text-green-600">
                    +{marketplaceStats.dentalSupplyMarket.growthRate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Suppliers</span>
                  <span className="font-semibold">
                    {marketplaceStats.dentalSupplyMarket.suppliers}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Top Performers */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          activity.marketplace === "patient"
                            ? "bg-blue-100"
                            : "bg-green-100",
                        )}
                      >
                        {activity.type === "service_booking" ? (
                          <Calendar
                            className={cn(
                              "w-5 h-5",
                              activity.marketplace === "patient"
                                ? "text-blue-600"
                                : "text-green-600",
                            )}
                          />
                        ) : (
                          <Package
                            className={cn(
                              "w-5 h-5",
                              activity.marketplace === "patient"
                                ? "text-blue-600"
                                : "text-green-600",
                            )}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900">
                          <span className="font-medium">
                            {activity.customer}
                          </span>{" "}
                          {activity.type === "service_booking"
                            ? "booked"
                            : "ordered"}{" "}
                          <span className="font-medium">
                            {activity.service || activity.product}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          from {activity.provider || activity.supplier} •{" "}
                          <span
                            className={cn(
                              "font-medium",
                              activity.status === "confirmed" ||
                                activity.status === "completed"
                                ? "text-green-600"
                                : activity.status === "processing"
                                  ? "text-yellow-600"
                                  : "text-blue-600",
                            )}
                          >
                            {activity.status}
                          </span>{" "}
                          • ${activity.amount}
                        </p>
                        <p className="text-xs text-gray-400">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Performers
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.id} className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            performer.marketplace === "patient"
                              ? "bg-blue-100"
                              : "bg-green-100",
                          )}
                        >
                          {performer.marketplace === "patient" ? (
                            <Heart
                              className={cn(
                                "w-5 h-5",
                                performer.marketplace === "patient"
                                  ? "text-blue-600"
                                  : "text-green-600",
                              )}
                            />
                          ) : (
                            <Package
                              className={cn(
                                "w-5 h-5",
                                performer.marketplace === "patient"
                                  ? "text-blue-600"
                                  : "text-green-600",
                              )}
                            />
                          )}
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Award className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {performer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {performer.type} •{" "}
                          {performer.marketplace === "patient"
                            ? `${performer.bookings} bookings`
                            : `${performer.orders} orders`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          ${performer.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          +{performer.growth}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Approvals
              </h3>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                {pendingApprovals.length} pending
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div
                    key={approval.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => setSelectedApproval(approval)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          approval.urgency === "high"
                            ? "bg-red-400"
                            : approval.urgency === "medium"
                              ? "bg-yellow-400"
                              : "bg-blue-400",
                        )}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {approval.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {approval.type.replace("_", " ")} by{" "}
                          {approval.submittedBy} • {approval.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs implementation would go here */}
      {activeTab !== "overview" && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeTab === "patient-market" && (
              <Heart className="w-8 h-8 text-gray-400" />
            )}
            {activeTab === "supply-market" && (
              <Package className="w-8 h-8 text-gray-400" />
            )}
            {activeTab === "providers" && (
              <Store className="w-8 h-8 text-gray-400" />
            )}
            {activeTab === "approvals" && (
              <CheckCircle className="w-8 h-8 text-gray-400" />
            )}
            {activeTab === "campaigns" && (
              <Target className="w-8 h-8 text-gray-400" />
            )}
            {activeTab === "analytics" && (
              <BarChart3 className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h3>
          <p className="text-gray-600">
            Detailed {activeTab} management interface would be implemented here
          </p>
        </div>
      )}

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={!!selectedApproval}
        onClose={() => setSelectedApproval(null)}
        approval={selectedApproval}
      />
    </div>
  );
}
