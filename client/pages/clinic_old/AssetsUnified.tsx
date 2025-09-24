import React, { useState } from "react";
import Stocks from "@/pages/Stocks";
import Peripherals from "@/pages/Peripherals";
import { Boxes, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AssetsUnified() {
  const [tab, setTab] = useState<"stocks" | "peripherals">("stocks");
  const tabs = [
    { id: "stocks" as const, label: "المخزون", icon: Boxes },
    { id: "peripherals" as const, label: "الأجهزة", icon: Cpu },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-xl p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap",
                  active
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border",
                )}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {tab === "stocks" && <Stocks />}
        {tab === "peripherals" && <Peripherals />}
      </div>
    </div>
  );
}
