const events = [
  { id: "e1", title: "ورشة متقدمة في زراعة الأسنان", date: "الجمعة 7:00م", place: "الرياض" },
  { id: "e2", title: "ندوة عن تصوير الحالات السريرية", date: "الأحد 6:00م", place: "أونلاين" },
];

export default function Events() {
  return (
    <div className="space-y-2">
      {events.map((e) => (
        <div key={e.id} className="p-3 bg-white border border-gray-200 rounded-lg text-sm shadow-sm">
          <div className="font-semibold text-gray-900">{e.title}</div>
          <div className="text-[11px] text-gray-600 mt-0.5">{e.date} • {e.place}</div>
        </div>
      ))}
    </div>
  );
}
