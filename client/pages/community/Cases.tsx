interface CaseItem {
  id: string;
  title: string;
  thumb: string;
  author: string;
  stats: { views: number; comments: number };
}

const cases: CaseItem[] = [
  {
    id: "c1",
    title: "تجميل أمامي مع تحسين الابتسامة",
    thumb: "https://images.unsplash.com/photo-1606811971618-4486d14f3f07?q=80&w=700&auto=format&fit=crop",
    author: "د. روان",
    stats: { views: 820, comments: 14 },
  },
  {
    id: "c2",
    title: "قلع جراحي لضرس عقل مطمور",
    thumb: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=700&auto=format&fit=crop",
    author: "د. باسل",
    stats: { views: 640, comments: 9 },
  },
];

export default function Cases() {
  return (
    <div className="grid gap-2">
      {cases.map((c) => (
        <article key={c.id} className="flex gap-2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow">
          <img src={c.thumb} alt="" className="w-24 h-20 rounded object-cover flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{c.title}</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">{c.author}</p>
            <div className="mt-1 text-[11px] text-gray-600">{c.stats.views} مشاهدة • {c.stats.comments} تعليق</div>
          </div>
        </article>
      ))}
    </div>
  );
}
