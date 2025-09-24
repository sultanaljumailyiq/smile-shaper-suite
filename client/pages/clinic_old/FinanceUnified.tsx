import React, { useState } from "react";
import Accounts from "@/pages/Accounts";
import Sales from "@/pages/Sales";
import Purchases from "@/pages/Purchases";
import { Wallet, TrendingUp, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

function EmployeesFinance() {
  const [employees] = useState([
    {
      id: "e1",
      name: "أحمد علي",
      role: "مساعد طبي",
      base: 600000,
      bonus: 50000,
      lastPaid: "2024-01-15",
    },
    {
      id: "e2",
      name: "سارة محمد",
      role: "استقبال",
      base: 450000,
      bonus: 25000,
      lastPaid: "2024-01-12",
    },
  ]);
  return (
    <div className="bg-white rounded-xl border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">أجور الموظفين</h3>
      </div>
      <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 rounded-lg">
        <div className="col-span-3">الاسم</div>
        <div className="col-span-3">الوظيفة</div>
        <div className="col-span-2">الراتب الأساسي</div>
        <div className="col-span-2">المكافآت</div>
        <div className="col-span-2 text-left">آخر دفعة</div>
      </div>
      <div className="divide-y">
        {employees.map((e) => (
          <div
            key={e.id}
            className="grid grid-cols-12 px-4 py-3 items-center text-sm"
          >
            <div className="col-span-3 font-medium text-gray-900">{e.name}</div>
            <div className="col-span-3 text-gray-700">{e.role}</div>
            <div className="col-span-2">
              {e.base.toLocaleString("ar-IQ")} IQD
            </div>
            <div className="col-span-2">
              {e.bonus.toLocaleString("ar-IQ")} IQD
            </div>
            <div className="col-span-2 text-left text-gray-600">
              {e.lastPaid}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinanceUnified() {
  const [tab, setTab] = useState<
    "accounts" | "sales" | "purchases" | "employees"
  >("accounts");

  const tabs = [
    { id: "accounts" as const, label: "الحسابات", icon: Wallet },
    { id: "sales" as const, label: "المبيعات", icon: TrendingUp },
    { id: "purchases" as const, label: "المشتريات", icon: ShoppingCart },
    { id: "employees" as const, label: "الموظفون (الأجور)", icon: Users },
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
        {tab === "accounts" && <Accounts />}
        {tab === "sales" && <Sales />}
        {tab === "purchases" && <Purchases />}
        {tab === "employees" && <EmployeesFinance />}
      </div>
    </div>
  );
}
