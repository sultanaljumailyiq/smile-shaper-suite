const topics = [
  "تقويم الأسنان",
  "تركيبات",
  "حشوات",
  "علاج الجذور",
  "جراحة فم وفكين",
  "وقاية",
  "أشعة",
  "صحة فموية",
  "إدارة العيادات",
  "تسويق",
];

export default function Topics() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {topics.map((t) => (
        <button
          key={t}
          className="px-2.5 py-2 text-[11px] sm:text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.99]"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
