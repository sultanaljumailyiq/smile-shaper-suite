import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Bell, Plus, Search } from "lucide-react";

const tabs = [
  { to: "/community", label: "المنشورات", exact: true },
  { to: "/community/topics", label: "المواضيع" },
  { to: "/community/cases", label: "الحالات" },
  { to: "/community/learn", label: "الدروس" },
  { to: "/community/events", label: "الفعاليات" },
  { to: "/community/groups", label: "المجموعات" },
  { to: "/community/experts", label: "الخبراء" },
];

export default function CommunityLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white">
      {/* Upper App Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-screen-sm mx-auto px-3 py-2 flex items-center justify-between">
          <button aria-label="بحث" className="p-2 text-gray-600 active:scale-95">
            <Search className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-semibold text-gray-900">المجتمع</h1>
          <div className="flex items-center gap-1">
            <button aria-label="إشعارات" className="relative p-2 text-gray-600 active:scale-95">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[10px] leading-3 rounded-full grid place-items-center">3</span>
            </button>
            <button aria-label="منشور جديد" className="p-2 text-white bg-blue-600 rounded-md active:scale-95">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs: horizontally scrollable, compact */}
        <nav className="max-w-screen-sm mx-auto px-2 pb-2 overflow-x-auto categories-nav">
          <ul className="flex gap-2 min-w-max">
            {tabs.map((t) => (
              <li key={t.to}>
                <NavLink
                  to={t.to}
                  end={t.exact}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ` +
                    (isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200")
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Content */}
      <main className="max-w-screen-sm mx-auto p-2 sm:p-3">
        <Outlet />
      </main>

      {/* Bottom padding for mobile safe area */}
      <div className="h-6" />
    </div>
  );
}
