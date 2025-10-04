import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  return (
    <div className="space-y-2">
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">دورة تعليمية</h2>
        <p className="mt-1 text-xs text-gray-600">معرف الدورة: {id}</p>
      </div>
      <p className="text-sm text-gray-700">محتوى الدورة سيضاف لاحقًا.</p>
    </div>
  );
}
