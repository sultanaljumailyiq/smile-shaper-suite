import { Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  thumb: string;
}

const courses: Course[] = [
  {
    id: "cr1",
    title: "أساسيات علاج العصب بخطوات عملية",
    level: "beginner",
    duration: "35 دقيقة",
    thumb: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: "cr2",
    title: "مبادئ التخطيط الرقمي للابتسامة",
    level: "intermediate",
    duration: "48 دقيقة",
    thumb: "https://images.unsplash.com/photo-1588774069261-3a52a66d0a58?q=80&w=700&auto=format&fit=crop",
  },
];

export default function Learn() {
  return (
    <div className="grid gap-2">
      {courses.map((c) => (
        <Link to={`/community/courses/${c.id}`} key={c.id} className="flex gap-2 p-2 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow">
          <img src={c.thumb} alt="" className="w-24 h-20 rounded object-cover flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{c.title}</h3>
            <div className="mt-1 text-[11px] text-gray-600">{c.level === "beginner" ? "مبتدئ" : c.level === "intermediate" ? "متوسط" : "متقدم"} • {c.duration}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
