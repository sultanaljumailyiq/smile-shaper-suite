import { Heart, MessageCircle, Share2, MoreHorizontal, CheckCircle2 } from "lucide-react";

interface Post {
  id: string;
  author: string;
  role: string;
  avatar: string;
  time: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
}

const posts: Post[] = [
  {
    id: "p1",
    author: "د. سارة العبدالله",
    role: "أخصائية تقويم",
    avatar: "https://i.pravatar.cc/80?img=5",
    time: "قبل 1 ساعة",
    text: "نقاش سريع حول أفضل بروتوكول تثبيت بعد إنهاء التقويم لحالات الازدحام الخفيف.",
    image: undefined,
    likes: 24,
    comments: 9,
  },
  {
    id: "p2",
    author: "د. خالد الحربي",
    role: "جراحة فم ووجه وفكين",
    avatar: "https://i.pravatar.cc/80?img=16",
    time: "قبل 3 ساعات",
    text: "صور قبل/بعد لقلع ضرس عقل مطمور أفقيًا مع توثيق الخطوات.",
    image: "https://images.unsplash.com/photo-1588771930290-24f33c846263?q=80&w=800&auto=format&fit=crop",
    likes: 56,
    comments: 18,
  },
];

export default function Feed() {
  return (
    <div className="space-y-2">
      {posts.map((p) => (
        <article key={p.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition">
          <header className="flex items-center gap-2">
            <img src={p.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-xs text-gray-900 font-semibold">
                <span className="truncate">{p.author}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-gray-500">• {p.time}</span>
              </div>
              <div className="text-[11px] text-gray-500">{p.role}</div>
            </div>
            <button className="p-1.5 text-gray-500">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </header>

          <p className="mt-2 text-sm leading-5 text-gray-900">{p.text}</p>

          {p.image && (
            <div className="mt-2 overflow-hidden rounded-md border border-gray-200">
              <img src={p.image} alt="" className="w-full h-48 object-cover" />
            </div>
          )}

          <footer className="mt-2 grid grid-cols-3 text-xs text-gray-600">
            <button className="flex items-center justify-center gap-1 py-1.5 rounded hover:bg-gray-50">
              <Heart className="w-4 h-4" /> {p.likes}
            </button>
            <button className="flex items-center justify-center gap-1 py-1.5 rounded hover:bg-gray-50">
              <MessageCircle className="w-4 h-4" /> {p.comments}
            </button>
            <button className="flex items-center justify-center gap-1 py-1.5 rounded hover:bg-gray-50">
              <Share2 className="w-4 h-4" /> مشاركة
            </button>
          </footer>
        </article>
      ))}
    </div>
  );
}
