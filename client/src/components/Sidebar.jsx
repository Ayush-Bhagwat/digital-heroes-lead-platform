import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar({ logout }) {
  const Item = ({ icon: Icon, title, active }) => (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  );

  return (
    <aside className="w-72 bg-white shadow-xl min-h-screen border-r flex flex-col">

      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-700">
          Digital Heroes
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          CRM Dashboard
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Item
          icon={LayoutDashboard}
          title="Dashboard"
          active
        />

        <Item
          icon={Users}
          title="Leads"
        />

        <Item
          icon={BarChart3}
          title="Analytics"
        />

        <Item
          icon={Settings}
          title="Settings"
        />

      </nav>

      <div className="p-4 border-t">

        <button
          onClick={logout}
          className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}