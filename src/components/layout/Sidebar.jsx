import { NavLink } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Settings,
  CircleUserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { t } = useLanguage();
 const navItems = [
  {
    name: t("navigation", "dashboard"),
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: t("navigation", "applications"),
    path: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    name: t("navigation", "settings"),
    path: "/settings",
    icon: Settings,
  },
];

  const { profile} = useAuth();

  return (
    <>
    
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300
          dark:border-gray-800 dark:bg-gray-900
          md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
     
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-700/50">
          <Logo />

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

   
        <nav className="flex flex-col gap-2 px-6 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive
                    ? "bg-gray-200 font-semibold dark:bg-gray-800 dark:text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

       
        <div className="mt-auto flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700">
            <CircleUserRound />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {profile?.username}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;