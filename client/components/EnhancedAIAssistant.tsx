import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  MessageCircle,
  Send,
  Mic,
  MicOff,
  X,
  Maximize2,
  Minimize2,
  Settings,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Volume2,
  VolumeX,
  Sparkles,
  Brain,
  Stethoscope,
  Calendar,
  FileText,
  Users,
  Package,
  CreditCard,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ComponentType;
  }>;
}

interface EnhancedAIAssistantProps {
  isFloating?: boolean;
  position?: "bottom-right" | "bottom-left" | "center";
  theme?: "light" | "dark" | "clinic";
}

const EnhancedAIAssistant: React.FC<EnhancedAIAssistantProps> = ({
  isFloating = true,
  position = "bottom-right",
  theme = "clinic",
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quickActions, setQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-defined responses for common clinic queries
  const commonResponses = {
    مرحبا: "مرحباً بك في عيادتك! كي�� يمكنني مساعدتك اليوم؟",
    المواعيد:
      "يمكنني مساعدتك في إدارة المواعيد. هل تريد مشاهدة مواعيد اليوم أم إضافة موعد جديد؟",
    المرضى:
      "أستطيع مساعدتك في البحث عن المرضى أو إضافة مريض جديد. ما الذي تحتاجه؟",
    المالية:
      "يمكنني عرض التقارير المالية أو مساعدتك في إدارة الفواتير والمدفوعات.",
    المختبر:
      "أستطيع مساعدتك في متابعة طلبات المختبر والتركيبات. هل تريد مشاهدة الطلبات المعلقة؟",
    التقارير:
      "يمكنني إنشاء تقارير مخصصة حول أداء العيادة. أي نوع من التقارير تحتاج؟",
  };

  const quickActionButtons = [
    {
      label: "مواعيد اليوم",
      icon: Calendar,
      action: () => navigate("/clinic/reservations"),
    },
    {
      label: "مرضى جدد",
      icon: Users,
      action: () => navigate("/clinic/patients"),
    },
    {
      label: "طلبات المختبر",
      icon: Package,
      action: () => navigate("/clinic/lab"),
    },
    {
      label: "التقارير المالية",
      icon: BarChart3,
      action: () => navigate("/clinic/accounts"),
    },
  ];

  useEffect(() => {
    if (messages.length === 0) {
      // Welcome message
      setMessages([
        {
          id: "welcome",
          type: "assistant",
          content:
            "مرحباً! أنا مساعدك الذكي للعيادة. كيف يمكنني مساعدتك اليوم؟",
          timestamp: new Date(),
          suggestions: [
            "مواعيد اليوم",
            "إضافة مريض جديد",
            "التقارير المالية",
            "طلبات المختبر",
          ],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(currentMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
        actions: response.actions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Check for common patterns
    for (const [key, response] of Object.entries(commonResponses)) {
      if (lowerMessage.includes(key)) {
        return {
          content: response,
          suggestions: getSuggestionsForTopic(key),
          actions: getActionsForTopic(key),
        };
      }
    }

    // Default response
    return {
      content:
        "شكراً لسؤالك. أستطيع مساعدتك في إدارة العيادة. هل تحتاج مساعدة في المواعيد، المرضى، أو التقارير؟",
      suggestions: [
        "مواعيد اليوم",
        "قائمة المرضى",
        "التقارير المالية",
        "إعدادات العيادة",
      ],
      actions: [],
    };
  };

  const getSuggestionsForTopic = (topic: string) => {
    switch (topic) {
      case "المواعيد":
        return [
          "مواعيد اليوم",
          "مواعيد الأسبوع",
          "إضافة موعد جديد",
          "مواعيد ملغية",
        ];
      case "المرضى":
        return ["بحث عن مريض", "إضافة مريض جديد", "المرضى الجدد", "تاريخ طبي"];
      case "المالية":
        return ["إيرادات الشهر", "المدفوعات المعلقة", "تقرير مالي", "الفواتير"];
      case "المختبر":
        return [
          "طلبات معلقة",
          "تركيبات جديدة",
          "مختبرات شريكة",
          "متابعة الطلبات",
        ];
      default:
        return ["مساعدة عامة", "إعدادات", "دعم تقني"];
    }
  };

  const getActionsForTopic = (topic: string) => {
    switch (topic) {
      case "المواعيد":
        return [
          {
            label: "عرض مواعيد اليوم",
            action: () => navigate("/clinic/reservations"),
            icon: Calendar,
          },
        ];
      case "المرضى":
        return [
          {
            label: "قائمة المرضى",
            action: () => navigate("/clinic/patients"),
            icon: Users,
          },
        ];
      case "المختبر":
        return [
          {
            label: "إدارة المختبر",
            action: () => navigate("/clinic/lab"),
            icon: Package,
          },
        ];
      default:
        return [];
    }
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentMessage("مرحبا كيف الحال؟");
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleExpand = () => {
    navigate("/ai-assistant");
  };

  const FloatingButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "fixed z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
        "flex items-center justify-center",
        position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6",
      )}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <div className="relative">
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </button>
  );

  const ChatWindow = () => (
    <div
      className={cn(
        "fixed z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300",
        "w-96 h-96",
        position === "bottom-right" ? "bottom-24 right-6" : "bottom-24 left-6",
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none",
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">المساعد الذكي</h3>
              <p className="text-blue-100 text-xs">متاح للمساعدة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExpand}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 h-64 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.type === "user" ? "justify-start" : "justify-end",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-2xl text-sm",
                  message.type === "user"
                    ? "bg-blue-500 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md",
                )}
              >
                <p>{message.content}</p>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {message.suggestions
                      .slice(0, 2)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMessage(suggestion)}
                          className="px-2 py-1 bg-white/20 rounded-lg text-xs hover:bg-white/30 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                  </div>
                )}

                {/* Actions */}
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="w-full px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors flex items-center gap-1"
                      >
                        {/* {action.icon && <action.icon className="w-3 h-3" />} */}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-end">
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="اكتب رسالتك..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button
            onClick={handleVoiceInput}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isListening
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      {quickActions && (
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="grid grid-cols-2 gap-2">
            {quickActionButtons.slice(0, 4).map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center gap-2 p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors text-xs"
              >
                <action.icon className="w-3 h-3" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (!isFloating) {
    return <ChatWindow />;
  }

  return (
    <>
      <FloatingButton />
      <ChatWindow />
    </>
  );
};

export default EnhancedAIAssistant;
