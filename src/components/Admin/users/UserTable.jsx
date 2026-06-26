import { Mail, Pencil, Trash2 } from "lucide-react";

const roleBadge = {
  Admin: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",
  Instructor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400",
  Student: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
};

const statusBadge = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Inactive: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
};

const UserTable = ({ users, total, page, totalPages, onEdit, onDelete, onNext, onPrev }) => (
  <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
    <div className="overflow-x-auto w-full">
      <table className="min-w-[650px] w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
            {["#", "User", "Role", "Status", "Joined", "Actions"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[var(--text)] opacity-50 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-[var(--text)] opacity-40">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-[var(--bg)] transition-colors">
                <td className="px-4 py-3 text-xs text-[var(--text)] opacity-40">{user.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 min-w-[32px] rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text)] whitespace-nowrap">{user.name}</p>
                      <p className="text-xs text-[var(--text)] opacity-50 flex items-center gap-1 whitespace-nowrap">
                        <Mail size={10} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleBadge[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-[var(--text)] opacity-50 whitespace-nowrap">
                  {user.joined}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1.5 rounded-lg border border-[var(--border)] text-cyan-500 hover:bg-cyan-500/10 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-1.5 rounded-lg border border-[var(--border)] text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
  <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
  <p className="text-xs text-[var(--text)] opacity-50">
    Showing {Math.min((page - 1) * 5 + 1, total)}–{Math.min(page * 5, total)} of {total}
  </p>
  <div className="flex gap-2">
    <button onClick={onPrev} disabled={page === 1}
      className="px-3 py-1 text-xs rounded-md border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--bg)] transition-colors">
      Prev
    </button>
    <button onClick={onNext} disabled={page === totalPages}
      className="px-3 py-1 text-xs rounded-md border border-[var(--border)] disabled:opacity-30 hover:bg-[var(--bg)] transition-colors">
      Next
    </button>
  </div>
</div>
  </div>
);

export default UserTable;