const UserForm = ({ form, onChange }) => (
  <div className="flex flex-col gap-3">
    {[
      ["Name", "name", "text", "Ahmed Benali"],
      ["Email", "email", "email", "ahmed@example.com"],
    ].map(([label, key, type, placeholder]) => (
      <div key={key}>
        <label className="block text-xs text-[var(--text)] opacity-50 mb-1">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => onChange(key, e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
        />
      </div>
    ))}
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-xs text-[var(--text)] opacity-50 mb-1">Role</label>
        <select
          value={form.role}
          onChange={(e) => onChange("role", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors cursor-pointer"
        >
          <option>Admin</option>
          <option>Instructor</option>
          <option>Student</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-[var(--text)] opacity-50 mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => onChange("status", e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors cursor-pointer"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>
  </div>
);

export default UserForm;