import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const WeeklyUsersChart = ({ data }) => (
  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
    <p className="text-sm font-medium mb-4">New Users / Week</p>
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="var(--border)" />
        <YAxis tick={{ fontSize: 11 }} stroke="var(--border)" />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        <Line type="monotone" dataKey="users" stroke="#0891b2" strokeWidth={2} dot={{ r: 3, fill: "#0891b2" }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklyUsersChart;