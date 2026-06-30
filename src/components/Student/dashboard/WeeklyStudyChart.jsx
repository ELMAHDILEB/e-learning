import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WeeklyStudyChart = ({ data }) => {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-6">
        Weekly Study Hours
      </h2>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="hours"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyStudyChart;