const experts = [
  { id: "u1", name: "د. تمارا الجاسم", title: "تركيبات تجميلية", avatar: "https://i.pravatar.cc/80?img=32" },
  { id: "u2", name: "د. ناصر الرشيد", title: "جراحة فم وفكين", avatar: "https://i.pravatar.cc/80?img=11" },
];

export default function Experts() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {experts.map((e) => (
        <div key={e.id} className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-2">
          <img src={e.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{e.name}</div>
            <div className="text-[11px] text-gray-600 truncate">{e.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
