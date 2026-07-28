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
    <aside className="w-64 flex flex-col p-6 border-r border-gray-200" >
     <Logo/>
      <nav className="flex flex-col gap-2 mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
           className={({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 w-full rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
    isActive
      ? "bg-gray-100 font-semibold"
      : "text-gray-600"
  }`
}
          >
           <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3">
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