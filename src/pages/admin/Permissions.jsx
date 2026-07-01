import { useState, useEffect } from "react";
import { Shield, Save, CheckCircle } from "lucide-react";
import {
  getPermissions,
  updateRolePermissions,
  ROLE_LABELS,
} from "../../services/permissions";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await getPermissions();
      setPermissions(data.permissions);
      setRoles(data.roles);
      const initial = {};
      data.roles.forEach((role) => {
        initial[role.id] = [...role.permission_ids];
      });
      setDraft(initial);
      setError("");
    } catch {
      setError("Failed to load permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const togglePermission = (roleId, permissionId) => {
    setDraft((prev) => {
      const current = prev[roleId] || [];
      const next = current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId];
      return { ...prev, [roleId]: next };
    });
    setSaved(null);
  };

  const handleSave = async (roleId) => {
    setSaving(roleId);
    try {
      await updateRolePermissions(roleId, draft[roleId] || []);
      setSaved(roleId);
      setTimeout(() => setSaved(null), 2000);
      await load();
    } catch {
      setError("Failed to save permissions.");
    } finally {
      setSaving(null);
    }
  };

  const isDirty = (roleId) => {
    const original = roles.find((r) => r.id === roleId)?.permission_ids || [];
    const current = draft[roleId] || [];
    if (original.length !== current.length) return true;
    return !original.every((id) => current.includes(id));
  };

  if (loading) {
    return <p className="text-sm text-[var(--text)] opacity-50">Loading permissions...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-medium flex items-center gap-2">
          <Shield size={18} className="text-cyan-500" />
          Role Permissions
        </h1>
        <p className="text-xs text-[var(--text)] opacity-50 mt-0.5">
          Configure what each role can do in the platform
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{ROLE_LABELS[role.name] || role.name}</p>
                <p className="text-[10px] opacity-40 uppercase tracking-wide">{role.name}</p>
              </div>
              <button
                onClick={() => handleSave(role.id)}
                disabled={saving === role.id || !isDirty(role.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-40 transition-colors"
              >
                {saved === role.id ? (
                  <><CheckCircle size={12} /> Saved</>
                ) : saving === role.id ? (
                  "Saving..."
                ) : (
                  <><Save size={12} /> Save</>
                )}
              </button>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {permissions.map((perm) => {
                const checked = (draft[role.id] || []).includes(perm.id);
                return (
                  <label
                    key={perm.id}
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--bg)] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(role.id, perm.id)}
                      className="mt-0.5 accent-cyan-500"
                    />
                    <div>
                      <p className="text-sm">{perm.name}</p>
                      <p className="text-[10px] opacity-40 font-mono">{perm.slug}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--border)]">
          <p className="text-sm font-medium">Permission Matrix</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                <th className="text-left px-4 py-2 text-xs opacity-50">Permission</th>
                {roles.map((role) => (
                  <th key={role.id} className="text-center px-4 py-2 text-xs opacity-50 whitespace-nowrap">
                    {ROLE_LABELS[role.name] || role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {permissions.map((perm) => (
                <tr key={perm.id} className="hover:bg-[var(--bg)]">
                  <td className="px-4 py-2">
                    <p className="text-xs font-medium">{perm.name}</p>
                    <p className="text-[10px] opacity-40 font-mono">{perm.slug}</p>
                  </td>
                  {roles.map((role) => (
                    <td key={role.id} className="px-4 py-2 text-center">
                      {(draft[role.id] || []).includes(perm.id) ? (
                        <CheckCircle size={14} className="inline text-green-500" />
                      ) : (
                        <span className="opacity-20">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
