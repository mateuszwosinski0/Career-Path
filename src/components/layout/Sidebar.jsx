import { NavLink } from "react-router-dom";
import Logo from "@/components/layout/Logo";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Settings,
 CircleUserRound,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: BriefcaseBusiness,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 shrink-0 min-h-screen flex flex-col  border-r border-gray-200" >
      <div className="flex items-center px-6 border-b border-gray-200  h-16">
     <Logo/>
     </div>
      <nav className="flex flex-col gap-2 px-6 py-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
           className={({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 w-full rounded-lg transition-colors duration-200 hover:bg-gray-200 ${
    isActive
      ? "bg-gray-200 font-semibold"
      : "text-gray-600"
  }`
}
          >
           <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-6 py-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border">
          <CircleUserRound/>
           </div>

           <div className="flex flex-col">
            <p className="text-sm font-semibold">Mateusz</p>
            <p className="text-xs text-gray-500">Free plan</p>
           </div>
        </div> 
    </aside>
  );
}

export default Sidebar;