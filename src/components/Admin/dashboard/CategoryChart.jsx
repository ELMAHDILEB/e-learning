import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PIE_COLORS = ["#0891b2", "#8b5cf6", "#f59e0b", "#10b981"];

const CategoryChart = ({ data }) => (
  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
    <p className="text-sm font-medium mb-4">Course Categories</p>
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          dataKey="value"
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default CategoryChart;