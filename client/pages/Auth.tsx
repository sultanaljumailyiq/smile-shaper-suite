import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Building,
  MapPin,
  Shield,
  CheckCircle,
  Upload,
  Camera,
  Stethoscope,
  Store,
  ArrowRight,
  AlertCircle,
  Check,
  Globe,
  Chrome,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthProps {
  mode?: "signin" | "signup";
  userType?: "dentist" | "provider" | "admin";
}

export default function Auth({
  mode = "signin",
  userType = "dentist",
}: AuthProps) {
  const [authMode, setAuthMode] = useState(mode);
  const [selectedUserType, setSelectedUserType] = useState(userType);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Professional Info (Dentist)
    licenseNumber: "",
    specialization: "",
    experienceYears: "",
    clinicName: "",
    clinicAddress: "",
    clinicPhone: "",

    // Business Info (Provider)
    companyName: "",
    businessType: "",
    taxId: "",
    website: "",
    description: "",

    // Verification
    licenseDocument: null,
    businessLicense: null,
    profilePhoto: null,
  });

  const specializations = [
    "General Dentistry",
    "Orthodontics",
    "Oral Surgery",
    "Endodontics",
    "Periodontics",
    "Prosthodontics",
    "Pediatric Dentistry",
    "Oral Pathology",
    "Cosmetic Dentistry",
  ];

  const businessTypes = [
    "Dental Equipment Supplier",
    "Dental Materials Supplier",
    "Pharmaceutical Company",
    "Medical Device Manufacturer",
    "Dental Software Provider",
    "Laboratory Services",
    "Cleaning & Maintenance",
    "Other",
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Form submitted:", formData);
  };

  const userTypeOptions = [
    {
      type: "dentist",
      title: "Dental Professional",
      description:
        "Access clinic management, patient care, and professional community",
      icon: Stethoscope,
      features: [
        "Clinic Management",
        "Patient Records",
        "Professional Network",
        "Continuing Education",
      ],
    },
    {
      type: "provider",
      title: "Dental Supplier",
      description:
        "Sell dental supplies, equipment, and services to dental practices",
      icon: Store,
      features: [
        "Product Management",
        "Order Processing",
        "Marketing Tools",
        "Analytics Dashboard",
      ],
    },
    {
      type: "admin",
      title: "Platform Administrator",
      description:
        "Manage the entire Zendenta ecosystem and platform operations",
      icon: Shield,
      features: [
        "User Management",
        "Platform Analytics",
        "Content Moderation",
        "System Configuration",
      ],
    },
  ];

  if (authMode === "signup" && currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900">Zendenta</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your Account Type
            </h1>
            <p className="text-gray-600">
              Select how you want to use Zendenta platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {userTypeOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => {
                  setSelectedUserType(option.type as any);
                  setCurrentStep(1);
                }}
                className={cn(
                  "bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-lg text-left",
                  selectedUserType === option.type
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 hover:border-blue-300",
                )}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <option.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <div className="space-y-2">
                  {option.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 text-green-600" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-blue-600 font-medium">
                  Get Started <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setAuthMode("signin")}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 mb-6"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-gray-900">Zendenta</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {authMode === "signin" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {authMode === "signin"
                ? "Sign in to access your dashboard"
                : `Join as a ${selectedUserType === "dentist" ? "Dental Professional" : selectedUserType === "provider" ? "Dental Supplier" : "Platform Administrator"}`}
            </p>
          </div>

          {/* User Type Selector for Sign In */}
          {authMode === "signin" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {userTypeOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSelectedUserType(option.type as any)}
                    className={cn(
                      "p-3 border rounded-lg text-center transition-all text-sm",
                      selectedUserType === option.type
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400",
                    )}
                  >
                    <option.icon className="w-5 h-5 mx-auto mb-1" />
                    <div className="font-medium">
                      {option.type === "dentist"
                        ? "Dentist"
                        : option.type === "provider"
                          ? "Supplier"
                          : "Admin"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Progress Steps for Sign Up */}
          {authMode === "signup" && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        currentStep >= step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600",
                      )}
                    >
                      {currentStep > step ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 3 && (
                      <div
                        className={cn(
                          "w-16 h-1 mx-2",
                          currentStep > step ? "bg-blue-600" : "bg-gray-200",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 text-center">
                Step {currentStep} of 3:{" "}
                {currentStep === 1
                  ? "Personal Information"
                  : currentStep === 2
                    ? selectedUserType === "dentist"
                      ? "Professional Details"
                      : "Business Information"
                    : "Verification"}
              </div>
            </div>
          )}

          {/* Social Login (Sign In Only) */}
          {authMode === "signin" && (
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Chrome className="w-5 h-5 text-red-500" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">
                  Continue with Facebook
                </span>
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Personal Information */}
            {(authMode === "signin" || currentStep === 1) && (
              <>
                {authMode === "signup" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="John"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {authMode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-12 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {authMode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className="pl-10 pr-12 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Professional/Business Information */}
            {authMode === "signup" && currentStep === 2 && (
              <>
                {selectedUserType === "dentist" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        License Number
                      </label>
                      <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          handleInputChange("licenseNumber", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your dental license number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                      </label>
                      <select
                        value={formData.specialization}
                        onChange={(e) =>
                          handleInputChange("specialization", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select your specialization</option>
                        {specializations.map((spec) => (
                          <option key={spec} value={spec}>
                            {spec}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={formData.experienceYears}
                        onChange={(e) =>
                          handleInputChange("experienceYears", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinic Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.clinicName}
                          onChange={(e) =>
                            handleInputChange("clinicName", e.target.value)
                          }
                          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your clinic name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinic Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.clinicAddress}
                          onChange={(e) =>
                            handleInputChange("clinicAddress", e.target.value)
                          }
                          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Full clinic address"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : selectedUserType === "provider" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your company name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) =>
                          handleInputChange("businessType", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select business type</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tax ID / Business Registration
                      </label>
                      <input
                        type="text"
                        value={formData.taxId}
                        onChange={(e) =>
                          handleInputChange("taxId", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tax ID or business registration number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          handleInputChange("website", e.target.value)
                        }
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={3}
                        className="px-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of your business and products/services"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Administrator Account
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Administrator accounts require manual approval. Please
                      contact our support team.
                    </p>
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Contact Support
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Step 3: Verification */}
            {authMode === "signup" &&
              currentStep === 3 &&
              selectedUserType !== "admin" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload your profile photo
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        id="profile-photo"
                        accept="image/*"
                      />
                      <label
                        htmlFor="profile-photo"
                        className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedUserType === "dentist"
                        ? "Dental License Document"
                        : "Business License"}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload{" "}
                        {selectedUserType === "dentist"
                          ? "your dental license"
                          : "business license/registration"}
                      </p>
                      <input
                        type="file"
                        className="hidden"
                        id="license-doc"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <label
                        htmlFor="license-doc"
                        className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Verification Process
                        </h4>
                        <p className="text-sm text-blue-700">
                          Your account will be reviewed within 24-48 hours.
                          You'll receive an email once verified.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" required />
                    <label className="text-sm text-gray-700">
                      I agree to Zendenta's{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </>
              )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {authMode === "signin" ? (
                <>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </button>
                  <div className="text-center">
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex gap-3">
                  {currentStep > 1 && selectedUserType !== "admin" && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type={
                      currentStep === 3 || selectedUserType === "admin"
                        ? "submit"
                        : "button"
                    }
                    onClick={
                      currentStep < 3 && selectedUserType !== "admin"
                        ? () => setCurrentStep(currentStep + 1)
                        : undefined
                    }
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {currentStep === 3 || selectedUserType === "admin"
                      ? "Create Account"
                      : "Continue"}
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {authMode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setAuthMode(authMode === "signin" ? "signup" : "signin");
                  setCurrentStep(authMode === "signin" ? 0 : 1);
                }}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                {authMode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
            {selectedUserType === "dentist" ? (
              <Stethoscope className="w-10 h-10" />
            ) : selectedUserType === "provider" ? (
              <Store className="w-10 h-10" />
            ) : (
              <Shield className="w-10 h-10" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {selectedUserType === "dentist"
              ? "Join the Future of Dental Care"
              : selectedUserType === "provider"
                ? "Grow Your Dental Supply Business"
                : "Manage the Dental Ecosystem"}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {selectedUserType === "dentist"
              ? "Connect with patients, manage your practice, and access cutting-edge AI tools."
              : selectedUserType === "provider"
                ? "Reach thousands of dental professionals and grow your business with our platform."
                : "Oversee the entire Zendenta platform and ensure quality service delivery."}
          </p>
          <div className="space-y-4">
            {selectedUserType === "dentist" ? (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>AI-powered patient diagnostics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Complete practice management</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Professional community access</span>
                </div>
              </>
            ) : selectedUserType === "provider" ? (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Direct access to dental practices</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Advanced marketing tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Real-time analytics dashboard</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Platform-wide management</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Advanced analytics & insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>User & content moderation</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
