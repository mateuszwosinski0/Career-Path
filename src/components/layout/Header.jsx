import { Bell, Search, Menu } from "lucide-react";
import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import NotificationsDropdown from "@/components/common/NotificationsDropdown"
import { useNotifications } from "@/context/NotificationContext";
function Header({ setSidebarOpen}) {
    const location = useLocation();
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();
        const query = new FormData(event.currentTarget).get("q").trim();
        navigate({
            pathname: "/applications",
            search: query ? `?${createSearchParams({ q: query })}` : "",
        });
    }
const { t } = useLanguage();
   const pageTitles = {
  "/dashboard": t("navigation", "dashboard"),
  "/applications": t("navigation", "applications"),
  "/applications/new": t("applications", "addApplication"),
  "/settings": t("navigation", "settings"),
};

    const pageTitle = pageTitles[location.pathname] || "CarrerPath";

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const {notifications} = useNotifications();

    const unreadCount = notifications.filter(
        (notification) => !notification.is_read
    ).length;
 
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
                <form className="relative hidden md:block" role="search" onSubmit={handleSearch}>
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                    <input className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={`${location.pathname}${location.search}`}
                    name="q"
                    defaultValue={new URLSearchParams(location.search).get("q") || ""}
                    aria-label={t("common", "search")}
                    type="search" placeholder={t("common", "search")}/>
                </form>
                <div className="relative">
                <button onClick={() => setIsNotificationsOpen((current) => !current)}
                type="button" className=" relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Notifications">
                    <Bell size={20}/>
                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                            {unreadCount}
                        </span>
                    )}
                    
                </button>

                {isNotificationsOpen &&
                (
                <NotificationsDropdown
                onClose={() => setIsNotificationsOpen(false)}
                /> )}
                </div>
            </div>
        </header>
        
    )
}

export default Header;
