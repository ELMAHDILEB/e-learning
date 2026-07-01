import { TrendingUp, TrendingDown } from "lucide-react";

const iconColors = {
  cyan: "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
  green: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
};

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {stats.map(({ label, value, trend, up, icon: Icon, color }) => (
      <div key={label} className="ui-card bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconColors[color]}`}>
            <Icon size={18} />
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1
            ${up
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
            }`}>
            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {trend}
          </span>
        </div>
        <div>
          <p className="text-2xl font-medium">{value}</p>
          <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">{label}</p>
        </div>
      </div>
    ))}
  </div>
);

export default StatsCards;