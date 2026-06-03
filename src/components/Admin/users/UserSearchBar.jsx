import { Search } from "lucide-react";

const UserSearchBar = ({ search, onSearch, roleFilter, onRoleChange }) => {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={onSearch}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text)] placeholder:opacity-40 outline-none focus:border-cyan-500 transition-colors"
        />
      </div>
      <select
        value={roleFilter}
        onChange={onRoleChange}
        className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors cursor-pointer"
      >
        <option value="All">All Roles</option>
        <option value="Admin">Admin</option>
        <option value="Instructor">Instructor</option>
        <option value="Student">Student</option>
      </select>
    </div>
  );
};

export default UserSearchBar;