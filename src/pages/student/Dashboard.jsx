import { useState, useEffect } from "react";
import { BookOpen, CheckCircle, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import PageLoading from "../../components/UI/PageLoading.jsx";
import { getStudentDashboard } from "../../services/dashboard";

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentDashboard()
      .then(({ data: d }) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoading lines={4} />;
  }

  const cards = [
    { label: "Enrolled Courses", value: data?.enrolled_courses ?? 0, icon: BookOpen, color: "cyan" },
    { label: "Completed Lessons", value: data?.completed_lessons ?? 0, icon: CheckCircle, color: "green" },
    { label: "Average Score", value: `${data?.average_score ?? 0}%`, icon: Target, color: "amber" },
    { label: "Quiz Attempts", value: data?.total_attempts ?? 0, icon: TrendingUp, color: "purple" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-medium">My Dashboard</h1>
        <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">Track your learning progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="ui-card bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[var(--text)] opacity-50">{label}</span>
              <div className={`p-2 rounded-lg bg-${color}-500/10`}>
                <Icon size={16} className={`text-${color}-500`} />
              </div>
            </div>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="ui-card bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
        <h2 className="text-sm font-medium mb-3">Recent Quiz Scores</h2>
        {data?.recent_scores?.length ? (
          <div className="flex flex-col gap-2">
            {data.recent_scores.map((score, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-sm">{score.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${score.passed ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                  {score.score}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--text)] opacity-40">No quiz attempts yet. <Link to="/student/courses" className="text-cyan-500 hover:underline">Browse courses</Link></p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
