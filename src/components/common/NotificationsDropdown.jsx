import { useNotifications } from "@/context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState} from "react";
import { Trash2 } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapeKey from "@/hooks/useEscapeKey";
function NotificationsDropdown({ onClose }) {
  const { notifications, loading, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications, } =
    useNotifications();

  const { t, language } = useLanguage();

  const localeMap = {
    en: "en-US",
    pl: "pl-PL",
    es: "es-ES",
  };

  function formatNotificationDate(date) {
  const notificationDate = new Date(date);
  const now = new Date();

  const diffInSeconds = Math.round(
    (notificationDate.getTime() - now.getTime()) / 1000
  );

  const formatter = new Intl.RelativeTimeFormat(
    localeMap[language],
    {
      numeric: "auto",
    }
  );

  if (Math.abs(diffInSeconds) < 60) {
    return formatter.format(diffInSeconds, "second");
  }

  const diffInMinutes = Math.round(diffInSeconds / 60);

  if (Math.abs(diffInMinutes) < 60) {
    return formatter.format(diffInMinutes, "minute");
  }

  const diffInHours = Math.round(diffInMinutes / 60);

  if (Math.abs(diffInHours) < 24) {
    return formatter.format(diffInHours, "hour");
  }

  const diffInDays = Math.round(diffInHours / 24);

  if (Math.abs(diffInDays) < 7) {
    return formatter.format(diffInDays, "day");
  }

  return notificationDate.toLocaleString(localeMap[language], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const [, setTick] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setTick((current) => current + 1);
  }, 60_000);

  return () => {
    clearInterval(interval);
  };
}, []);
 

   const hasUnread = notifications.some(
  (notification) => !notification.is_read
);

const navigate = useNavigate();

async function handleNotificationClick(notification) {
  if (!notification.is_read) {
    await markAsRead(notification.id);
  }

  onClose();

  if (notification.application_id) {
    navigate(
  `/applications?details=${encodeURIComponent(notification.application_id)}`,
);
  }
}


function getNotificationText(notification) {
   if (
    notification.type === "interview_reminder" &&
    notification.application
  ) {
    return {
      title: t("notifications", "upcomingInterview"),
      body: t("notifications", "interviewReminder")
        .replace("{company}", notification.application.company)
        .replace("{position}", notification.application.position),
    };
  }

  return {
    title: notification.title,
    body: notification.body,
  };
}
const dropDownRef = useRef(null);

useClickOutside(dropDownRef, onClose);
useEscapeKey(onClose);
  

  return (
     <div ref={dropDownRef} className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
  <div className="flex items-center justify-between gap-4">
    <h3 className="font-semibold text-gray-900 dark:text-white">
      {t("notifications", "title")}
    </h3>

    {notifications.length > 0 && (
      <button
        type="button"
        onClick={clearAllNotifications}
        className="shrink-0 pr-1 text-xs font-medium text-red-500 transition-colors hover:text-red-600"
      >
        {t("notifications", "clearAll")}
      </button>
    )}
  </div>

  {hasUnread && (
    <button
      type="button"
      onClick={markAllAsRead}
      className="mt-1.5 text-xs font-medium text-blue-500 transition-colors hover:text-blue-600"
    >
      {t("notifications", "markAllAsRead")}
    </button>
  )}
</div>
 {loading ? (
<p className="mt-3 text-sm text-gray-500">
 {t("notifications", "loading")}
      </p>
  ) : notifications.length === 0 ? (
  <p className="mt-3 text-sm text-gray-500">
 {t("notifications", "noNotifications")}
   </p>
 ) : (
  <div className="mt-3 flex flex-col gap-3">
   {notifications.map((notification) => {
  const text = getNotificationText(notification);

  return (
    <div
      onClick={() => handleNotificationClick(notification)}
      key={notification.id}
      className={`cursor-pointer rounded-lg border p-3 ${
        notification.is_read
          ? "border-gray-200 dark:border-gray-800"
          : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20"
      }`}
    >
  <div className="flex items-start justify-between gap-3">
  <div className="min-w-0 flex-1">
    <p className="font-semibold text-gray-900 dark:text-white">
      {text.title}
    </p>

    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
      {text.body}
    </p>

    <p className="mt-2 text-xs text-gray-400">
      {formatNotificationDate(notification.created_at)}
    </p>
  </div>

  <button
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      deleteNotification(notification.id);
    }}
    className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
    aria-label={t("notifications", "deleteNotification")}
  >
    <Trash2 size={15} />
  </button>
</div>
    </div>
  );
})}
</div>
 )
                        
    }

    </div>
  );
}

export default NotificationsDropdown;