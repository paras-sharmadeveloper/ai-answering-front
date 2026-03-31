import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "users", label: "Users", icon: "👥" },
  { key: "ai-agent", label: "AI Agent", icon: "🤖" },
  { key: "phone-numbers", label: "Phone Numbers", icon: "📞" },
  { key: "call-logs", label: "Call Logs", icon: "📝" },
  { key: "analytics", label: "Analytics", icon: "📊" },
  { key: "workflows", label: "Workflows", icon: "🔁" },
  { key: "billing", label: "Billing", icon: "💳" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-[#e5e7eb] bg-white p-5 text-sm shadow-sm">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2 rounded-lg bg-[#f3f4f6] px-3 py-3">
        <div className="grid h-8 w-8 place-items-center rounded bg-green-500 text-base font-bold text-white">
          V
        </div>
        <div>
          <div className="font-bold">Vernal</div>
          <div className="text-xs text-[#6b7280]">AI Voice Platform</div>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const path = `/admin/${item.key}`;
          const active = location.pathname === path;

          return (
            <button
              key={item.key}
              onClick={() => navigate(path)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                active
                  ? "bg-[#eff6ff] text-[#1d4ed8]"
                  : "text-[#4b5563] hover:bg-[#f3f4f6]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-5 right-5">
        <button
          onClick={() => navigate("/signin")}
          className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
