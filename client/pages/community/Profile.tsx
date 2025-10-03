import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  return (
    <div className="space-y-2">
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/96?u=${id ?? "me"}`} alt="" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <div className="text-sm font-semibold text-gray-900">{id ? `@${id}` : "الملف الشخصي"}</div>
            <div className="text-[11px] text-gray-600">طبيب أسنان عام • السعودية</div>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">لا توجد منشورات بعد.</div>
    </div>
  );
}
