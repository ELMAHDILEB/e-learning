import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Lock, Bell, GraduationCap, Save, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import { updateProfile, changePassword } from "../../services/profile";
import { saveSession, getStoredToken } from "../../services/auth";
import { getRoleLabel } from "../../utils/roleLabels";

const TABS = ["Personal Info", "Security", "Notifications"];

const Profile = () => {
  const { user, loginSuccess } = useAuth();
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", bio: "", location: "" });
  const [passwords, setPasswords] = useState({ current_password: "", password: "", password_confirmation: "" });
  const [notifications, setNotifications] = useState({ newEnrollment: true, newCourse: true, weeklyReport: true, systemAlerts: true });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setPersonal({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
  const role = getRoleLabel(user?.role?.name);

  const handleSaveProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await updateProfile(personal);
      const token = getStoredToken();
      if (token) loginSuccess(token, data.user);
      saveSession(token, data.user);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (passwords.password !== passwords.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await changePassword(passwords);
      setPasswords({ current_password: "", password: "", password_confirmation: "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex flex-wrap items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden flex-shrink-0">
            {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold">{user?.name}</h2>
            <p className="text-sm text-cyan-500 font-medium">{role}</p>
            <p className="text-sm text-[var(--text)] opacity-50 flex items-center gap-1 mt-0.5">
              <GraduationCap size={13} className="flex-shrink-0" />
              {personal.location || "Institution not set"}
            </p>
            <p className="text-xs text-[var(--text)] opacity-40 mt-1 flex items-center gap-1">
              <Mail size={11} /> {user?.email}
            </p>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>}

      <div className="flex gap-1 bg-[var(--card)] rounded-xl border border-[var(--border)] p-1">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => { setActiveTab(tab); setError(""); }}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${activeTab === tab ? "bg-cyan-500 text-white" : "text-[var(--text)] opacity-50 hover:opacity-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Personal Info" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <GraduationCap size={15} className="text-cyan-500" /> Academic Profile
          </h3>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-50">Full Name</label>
            <input value={personal.name} onChange={(e) => setPersonal((p) => ({ ...p, name: e.target.value }))}
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-50 flex items-center gap-1"><Mail size={11} /> Email</label>
            <input type="email" value={personal.email} onChange={(e) => setPersonal((p) => ({ ...p, email: e.target.value }))}
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-50 flex items-center gap-1"><Phone size={11} /> Phone</label>
            <input value={personal.phone} onChange={(e) => setPersonal((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+212 6 XX XX XX XX"
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-50 flex items-center gap-1"><MapPin size={11} /> Institution / Campus</label>
            <input value={personal.location} onChange={(e) => setPersonal((p) => ({ ...p, location: e.target.value }))}
              placeholder="e.g. Université Hassan II — Casablanca"
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs opacity-50">Bio</label>
            <textarea rows={3} value={personal.bio} onChange={(e) => setPersonal((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Program, level, or academic interests..."
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500 resize-none" />
          </div>
          <SaveButton onSave={handleSaveProfile} saved={saved} loading={loading} />
        </div>
      )}

      {activeTab === "Security" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2"><Lock size={15} className="text-cyan-500" /> Change Password</h3>
          {[["current_password", "Current Password"], ["password", "New Password"], ["password_confirmation", "Confirm New Password"]].map(([key, label]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs opacity-50">{label}</label>
              <input type="password" value={passwords[key]} onChange={(e) => setPasswords((p) => ({ ...p, [key]: e.target.value }))}
                className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
            </div>
          ))}
          <SaveButton onSave={handleSavePassword} saved={saved} loading={loading} label="Update Password" />
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2"><Bell size={15} className="text-cyan-500" /> Notification Preferences</h3>
          <p className="text-xs opacity-40">Platform notifications are managed via the bell icon in the header.</p>
          {[["newEnrollment", "Course Enrollment Updates"], ["newCourse", "New Course Published"], ["weeklyReport", "Weekly Academic Report"], ["systemAlerts", "System Alerts"]].map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <p className="text-sm">{label}</p>
              <button onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                className={`w-10 h-5 rounded-full transition-colors relative ${notifications[key] ? "bg-cyan-500" : "bg-[var(--border)]"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications[key] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SaveButton = ({ onSave, saved, loading, label = "Save Changes" }) => (
  <button onClick={onSave} disabled={loading}
    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors w-fit disabled:opacity-50 ${saved ? "bg-green-500 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}>
    {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
    {saved ? "Saved!" : label}
  </button>
);

export default Profile;
