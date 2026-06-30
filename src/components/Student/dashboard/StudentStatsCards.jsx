import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

const StudentStatsCards = ({ stats = {} }) => {
  const defaultStats = {
    coursesEnrolled: 0,
    averageGrade: 0,
    hoursSpent: 0,
    progressPercentage: 0,
  };

  const data = { ...defaultStats, ...stats };

  const statCards = [
    {
      id: 1,
      label: "Courses Enrolled",
      value: data.coursesEnrolled,
      icon: BookOpen,
      color: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
    {
      id: 2,
      label: "Average Grade",
      value: `${data.averageGrade}%`,
      icon: Award,
      color: "bg-green-500/10",
      textColor: "text-green-500",
    },
    {
      id: 3,
      label: "Hours Spent",
      value: data.hoursSpent,
      icon: Clock,
      color: "bg-purple-500/10",
      textColor: "text-purple-500",
    },
    {
      id: 4,
      label: "Progress",
      value: `${data.progressPercentage}%`,
      icon: TrendingUp,
      color: "bg-cyan-500/10",
      textColor: "text-cyan-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--text)] opacity-60 mb-2">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-[var(--text)]">
                  {card.value}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon size={24} className={card.textColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentStatsCards;
