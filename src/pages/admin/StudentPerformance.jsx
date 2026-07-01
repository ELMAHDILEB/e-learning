import { useState, useEffect } from "react";
import { getTeacherStudents } from "../../services/teacher";

const StudentPerformance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeacherStudents().then(({ data: d }) => setData(d)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm opacity-50">Loading student data...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-medium">Student Performance</h1>
        <p className="text-xs opacity-50 mt-0.5">{data?.total_students ?? 0} students across your courses</p>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                {["Student", "Courses", "Progress", "Avg Score", "Quizzes", "Passed"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs opacity-50 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!data?.students?.length ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center opacity-40">No enrolled students yet</td></tr>
              ) : (
                data.students.map((s) => (
                  <tr key={s.student.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]">
                    <td className="px-4 py-3">
                      <p className="font-medium">{s.student.name}</p>
                      <p className="text-xs opacity-40">{s.student.email}</p>
                    </td>
                    <td className="px-4 py-3 text-xs opacity-70 max-w-[150px] truncate">{s.courses.join(", ")}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${s.progress_percent}%` }} />
                        </div>
                        <span className="text-xs text-cyan-500">{s.progress_percent}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.average_score}%</td>
                    <td className="px-4 py-3 whitespace-nowrap">{s.quiz_attempts}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">{s.passed_quizzes}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentPerformance;
