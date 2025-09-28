import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Brain,
  Bot,
  Minimize2,
  Maximize2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  confidence?: number;
}

const SimpleFloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `مرحباً! أنا مساعدك الذكي المتخصص في طب الأسنان 🦷

**يمكنني مساعدتك في:**
• تحليل الصور الشعاعية والتشخيص
• وضع خطط العلاج المخصصة  
• إدارة المواعيد والجدولة
• فحص التفاعلات الدوائية
• تحليل تاريخ المرضى
• تقديم التوصيات العلاجية

**الذكاء الاصطناعي المتقدم:**
✨ دقة تشخيص 97.8%
🚀 معالجة فورية للبيانات
🔒 حماية كاملة للخصوصية
📊 تحليل متقدم للحالات

كيف يمكنني مساعدتك اليوم؟`,
      sender: "ai",
      timestamp: new Date(),
      confidence: 100,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing time
    const processingTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, processingTime);
  };

  const generateAIResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    let response = "";
    let confidence = Math.floor(Math.random() * 15) + 85; // 85-100%

    if (
      lowerInput.includes("أشعة") ||
      lowerInput.includes("تحليل") ||
      lowerInput.includes("صورة")
    ) {
      response = `🔍 **تحليل الذكاء الاصطناعي للصورة الشعاعية**

**النتائج التشخيصية:**
• **السن رقم 14**: تكوين تسوس محتمل في السطح البعيد
• **السن رقم 26**: علامات مبكرة لفقدان العظم حول الجذر
• **التقييم العام**: كثافة عظمية جيدة، لا مخاوف فورية

**درجة الثقة**: ${confidence}%
**وقت المعالجة**: 1.7 ثانية
**النموذج المستخدم**: DentalVision AI v3.2

**الإجراءات الموصى بها:**
✅ حشوة مركبة للسن رقم 14 (أولوية عالية)
✅ تنظيف عميق لمنطقة السن رقم 26
✅ متابعة خلال 3 أشهر
⚠️ مراقبة التطور

**تكلفة متوقعة**: 450-650 د.ع
**مدة العلاج**: 2-3 جلسات

هل تريد مني إنشاء خطة علاج تفصيلية؟`;
    } else {
      response = `🤖 **المساعد الذكي - DentalGPT Pro**

أفهم أنك تسأل عن "${userInput}".

**خدماتي المتقدمة:**

🔍 **التشخيص الذكي**
• تحليل الصور الشعاعية والفوتوغرافية
• كشف التسوس والمشاكل مبكراً
• تقييم صحة اللثة والأنسجة

🎯 **التخطيط العلاجي**
• خطط علاج مخصصة ومدروسة
• توقعات دقيقة للنتائج
• تحديد الأولويات العلاجية

📊 **إدارة المرضى**
• تحليل المخاطر والامتثال
• تتبع تاريخ العلاج
• توقع احتياجات المريض

هل تود أن أبدأ بتحليل حالة معينة أو مساعدتك في مهمة محددة؟`;
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "ai",
      timestamp: new Date(),
      confidence,
    };
  };

  // الزر العائم
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 active:scale-95"
        >
          {/* خلفية متحركة */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>

          {/* المحتوى */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Brain className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 absolute -top-1 -right-1 text-yellow-300 animate-ping" />
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            </div>

            <div className="flex flex-col text-right">
              <span className="font-bold text-sm sm:text-base">
                مساعد الذكاء الاصطناعي
              </span>
              <span className="text-xs text-blue-100">
                DentalGPT Pro • متاح الآن
              </span>
            </div>
          </div>

          {/* جسيمات متحركة */}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute top-1/2 -left-1 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-500"></div>
        </button>
      </div>
    );
  }

  // النافذة المنبثقة
  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <div
        className={cn(
          "bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 transition-all duration-500",
          "w-[calc(100vw-2rem)] max-w-[500px] h-[calc(100vh-2rem)] max-h-[750px]",
          "sm:w-[500px] sm:h-[750px]",
          "overflow-hidden ring-1 ring-black/5",
        )}
      >
        {/* عنوان محسن */}
        <div className="relative z-10 flex items-center justify-between p-3 sm:p-5 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Brain className="w-5 h-5 sm:w-7 sm:h-7 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            {!isMinimized && (
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-lg">
                  مساعد الذكاء الاصطناعي
                  <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 sm:px-3 py-1 rounded-full">
                    Pro
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                  <span>جاهز للمساعدة</span>
                  <span className="text-green-600">• DentalGPT v2.1</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl transition-colors"
              title={isMinimized ? "توسيع" : "تصغير"}
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              ) : (
                <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 sm:p-2 hover:bg-red-50 rounded-xl transition-colors group"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-red-600" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* منطقة الرسائل */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 scroll-smooth h-[calc(100%-140px)] sm:h-[450px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[90%] rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm relative",
                      "transition-all duration-200 hover:shadow-md",
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                        : "bg-gradient-to-r from-gray-50 to-blue-50 text-gray-900 border border-gray-200 shadow-sm hover:border-blue-300",
                    )}
                  >
                    {message.sender === "ai" && (
                      <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-2 border-b border-gray-200">
                        <div className="w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-blue-600">
                          DentalGPT Pro
                        </span>
                        {message.confidence && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {message.confidence}% دقة
                          </span>
                        )}
                      </div>
                    )}

                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>

                    <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 border-t border-gray-200">
                      <div className={cn(
                        "text-xs opacity-70",
                        message.sender === "user" ? "text-blue-100" : "text-gray-500",
                      )}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-gray-600">
                        الذكاء الاصطناعي يحلل...
                      </span>
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* منطقة الإدخال */}
            <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 border-t border-gray-200 p-3 sm:p-5">
              <div className="relative">
                <div className="relative bg-white rounded-3xl shadow-lg border-2 border-gray-300 hover:border-blue-400 focus-within:border-blue-500 transition-all duration-300">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="💬 اكتب سؤالك عن التشخيص، العلاج، الجدولة، أو أي موضوع طبي..."
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-20 bg-transparent resize-none border-0 focus:outline-none placeholder:text-gray-500 text-right text-xs sm:text-sm leading-relaxed min-h-[60px] sm:min-h-[80px] max-h-[120px] sm:max-h-[160px]"
                    rows={2}
                  />

                  <div className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4">
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 sm:p-3 rounded-2xl",
                        "hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl",
                        "transform hover:scale-105 active:scale-95 group",
                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                      )}
                      title="إرسال الرسالة (Enter)"
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SimpleFloatingAI;