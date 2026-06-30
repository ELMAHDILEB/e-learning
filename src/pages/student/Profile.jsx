import { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Bell,
  Shield,
  Save,
} from "lucide-react";

const TABS = ["Personal Info", "Security", "Notifications", "Preferences"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [avatar, setAvatar] = useState(null);
  const [personal, setPersonal] = useState({
    firstName: "Ahmed",
    lastName: "Benali",
    email: "ahmed.student@learnova.com",
    phone: "+212 6 12 34 56 78",
    bio: "Computer Science student passionate about web development, AI, and online learning.",
    location: "Casablanca, Morocco",
    education: "Bachelor of Computer Science",
    learningGoal: "Become a Full Stack MERN Developer",
    role: "Student",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    newUser: true,
    newCourse: true,
    coursePublished: false,
    weeklyReport: true,
    systemAlerts: true,
    emailDigest: false,
  });
  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "Africa/Casablanca",
    dateFormat: "DD/MM/YYYY",
    currency: "USD",
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header Card */}
      <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-cyan-500 flex items-center justify-center text-white text-2xl font-semibold overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                "AB"
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-600 transition-colors">
              <Camera size={12} className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold">
              {personal.firstName} {personal.lastName}
            </h2>
            <p className="text-sm text-[var(--text)] opacity-50">
              {personal.role} • {personal.education}
            </p>
            <p className="text-xs text-[var(--text)] opacity-40 mt-1">
              {personal.email}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-500">
            {personal.role}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--card)] rounded-xl border border-[var(--border)] p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? "bg-cyan-500 text-white"
                : "text-[var(--text)] opacity-50 hover:opacity-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Info */}
      {activeTab === "Personal Info" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Shield size={15} className="text-cyan-500" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
            ].map(([key, label]) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs text-[var(--text)] opacity-50">
                  {label}
                </label>
                <input
                  value={personal[key]}
                  onChange={(e) =>
                    setPersonal((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text)] opacity-50 flex items-center gap-1">
              <Mail size={11} /> Email
            </label>
            <input
              value={personal.email}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, email: e.target.value }))
              }
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text)] opacity-50 flex items-center gap-1">
              <Phone size={11} /> Phone
            </label>
            <input
              value={personal.phone}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, phone: e.target.value }))
              }
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[var(--text)] opacity-50 flex items-center gap-1">
                <MapPin size={11} /> Location
              </label>
              <input
                value={personal.location}
                onChange={(e) =>
                  setPersonal((p) => ({ ...p, location: e.target.value }))
                }
                className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[var(--text)] opacity-50">
                Education Level
              </label>
              <input
                value={personal.education}
                onChange={(e) =>
                  setPersonal((p) => ({ ...p, education: e.target.value }))
                }
                placeholder="Bachelor, Master..."
                className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text)] opacity-50">
              Learning Goal
            </label>
            <input
              value={personal.learningGoal}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, learningGoal: e.target.value }))
              }
              placeholder="Become a Full Stack Developer"
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--text)] opacity-50">Bio</label>
            <textarea
              rows={3}
              value={personal.bio}
              onChange={(e) =>
                setPersonal((p) => ({ ...p, bio: e.target.value }))
              }
              className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors resize-none"
            />
          </div>
          <SaveButton onSave={handleSave} saved={saved} />
        </div>
      )}

      {/* Security */}
      {activeTab === "Security" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Lock size={15} className="text-cyan-500" /> Change Password
          </h3>
          {[
            ["current", "Current Password"],
            ["new", "New Password"],
            ["confirm", "Confirm New Password"],
          ].map(([key, label]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs text-[var(--text)] opacity-50">
                {label}
              </label>
              <input
                type="password"
                value={passwords[key]}
                onChange={(e) =>
                  setPasswords((p) => ({ ...p, [key]: e.target.value }))
                }
                className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          ))}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-xs text-yellow-500">
              Password must be at least 8 characters, include uppercase,
              lowercase, and a number.
            </p>
          </div>
          <SaveButton
            onSave={handleSave}
            saved={saved}
            label="Update Password"
          />
        </div>
      )}

      {/* Notifications */}
      {activeTab === "Notifications" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Bell size={15} className="text-cyan-500" /> Notification
            Preferences
          </h3>
          {[
            [
              "newUser",
              "New User Registration",
              "Get notified when a new user signs up",
            ],
            [
              "newCourse",
              "New Course Submitted",
              "Get notified when an instructor submits a course",
            ],
            [
              "coursePublished",
              "Course Published",
              "Get notified when a course goes live",
            ],
            [
              "weeklyReport",
              "Weekly Report",
              "Receive a weekly summary of platform activity",
            ],
            [
              "systemAlerts",
              "System Alerts",
              "Critical system and security alerts",
            ],
            [
              "emailDigest",
              "Email Digest",
              "Daily email digest of all activity",
            ],
          ].map(([key, label, desc]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm">{label}</p>
                <p className="text-xs text-[var(--text)] opacity-40">{desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications((n) => ({ ...n, [key]: !n[key] }))
                }
                className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${notifications[key] ? "bg-cyan-500" : "bg-[var(--border)]"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications[key] ? "left-5" : "left-0.5"}`}
                />
              </button>
            </div>
          ))}
          <SaveButton onSave={handleSave} saved={saved} />
        </div>
      )}

      {/* Preferences */}
      {activeTab === "Preferences" && (
        <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 flex flex-col gap-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Globe size={15} className="text-cyan-500" /> Platform Preferences
          </h3>
          {[
            [
              "language",
              "Language",
              ["English", "Arabic", "French", "Spanish"],
            ],
            [
              "timezone",
              "Timezone",
              [
                "Africa/Casablanca",
                "Europe/Paris",
                "America/New_York",
                "Asia/Dubai",
              ],
            ],
            [
              "dateFormat",
              "Date Format",
              ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
            ],
            ["currency", "Currency", ["USD", "EUR", "MAD", "GBP"]],
          ].map(([key, label, options]) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs text-[var(--text)] opacity-50">
                {label}
              </label>
              <select
                value={preferences[key]}
                onChange={(e) =>
                  setPreferences((p) => ({ ...p, [key]: e.target.value }))
                }
                className="px-3 py-2 text-sm rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
              >
                {options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
          <SaveButton onSave={handleSave} saved={saved} />
        </div>
      )}
    </div>
  );
};

const SaveButton = ({ onSave, saved, label = "Save Changes" }) => (
  <button
    onClick={onSave}
    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors w-fit ${
      saved
        ? "bg-green-500 text-white"
        : "bg-cyan-500 hover:bg-cyan-600 text-white"
    }`}
  >
    <Save size={14} />
    {saved ? "Saved!" : label}
  </button>
);

export default Profile;
