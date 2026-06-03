import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const EnrollmentChart = ({ data }) => (
  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
    <p className="text-sm font-medium mb-4">Monthly Enrollments & Revenue</p>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--border)" />
        <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="var(--border)" />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="var(--border)" />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar yAxisId="left" dataKey="enrollments" fill="#0891b2" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default EnrollmentChart;