const groups = [
  { id: "g1", name: "تقويم الأسنان - مناقشات", members: 2480 },
  { id: "g2", name: "التركيبات التجميلية", members: 1730 },
];

export default function Groups() {
  return (
    <div className="space-y-2">
      {groups.map((g) => (
        <div key={g.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold text-gray-900">{g.name}</div>
              <div className="text-[11px] text-gray-600">{g.members.toLocaleString()} عضو</div>
            </div>
            <button className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-md">انضمام</button>
          </div>
        </div>
      ))}
    </div>
  );
}
