import { Bell, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";


function Header({ setSidebarOpen}) {
    const location = useLocation();

    const pageTitles = {
        "/dashboard": "Dashobard",
        "/applications": "Applications",
        "/applications/new": "Add application",
        "/settings": "Settings",
    };

    const pageTitle = pageTitles[location.pathname] || "CarrerPath";


    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 transition-colors dark:border-gray-800 dark:bg-gray-900 md:px-8">
            <div className="flex items-center gap-3">
                <button type="button" onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
                aria-label="Open menu"
                >
                    <Menu size={22}/>
                </button>
                <h1 className="text-xl font-bold md:text-2xl">
                    {pageTitle}
                </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <form className="relative hidden md:block">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                    <input className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    type="search" placeholder="Search..."/>
                </form>
                <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Notifications">
                    <Bell size={20}/>
                </button>
            </div>
        </header>
    )
}

export default Header;