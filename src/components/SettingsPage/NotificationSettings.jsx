import { useAuth } from "@/context/AuthContext";
import { subscribeToPush} from "@/utils/pushNotifications";
import { useLanguage } from "@/context/LanguageContext";


function NotificationSettings({ profile }) {
  const { user, updateNotificationSettings } = useAuth();
const {t} = useLanguage();

const notificationOptions = [
  {
    id: "reminders",
    title: t("settings", "applicationReminders"),
    description: t(
      "settings",
      "applicationRemindersDescription"
    ),
  },
  {
    id: "browser",
    title: t("settings", "browserNotifications"),
    description: t(
      "settings",
      "browserNotificationsDescription"
    ),
  },
  {
    id: "email",
    title: t("settings", "emailNotifications"),
    description: t(
      "settings",
      "emailNotificationsDescription"
    ),
  },
];

async function handleToggle(id) {
  if (id === "browser" && !profile?.browser_notifications) {
    if (!user) return;

    const { error } = await subscribeToPush(user.id);

    if (error) {
      console.error("Push subscription error:", error);
      return;
    }
  }

  const settings = {
    email: profile?.email_notifications ?? true,
    browser: profile?.browser_notifications ?? false,
    reminders: profile?.application_reminders ?? true,
  };

  settings[id] = !settings[id];

  const { error } = await updateNotificationSettings(settings);

  if (error) {
    console.error("Notification settings error:", error);
  }
}


const visibleNotificationOptions =
  profile?.application_reminders
    ? notificationOptions
    : notificationOptions.filter(
        (option) => option.id === "reminders"
      );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-2">
       <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
  {t("settings", "notifications")}
</h2>

<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
  {t("settings", "notificationsDescription")}
</p>
      </div>

      <div>
        {visibleNotificationOptions.map((option) => {
         const isEnabled =
  option.id === "email"
    ? profile?.email_notifications
    : option.id === "browser"
      ? profile?.browser_notifications
      : profile?.application_reminders;

          return (
            <div
  key={option.id}
  className={`flex items-center justify-between gap-6 border-b border-gray-200 py-5 last:border-b-0 dark:border-gray-800 ${
    option.id !== "reminders"
      ? "ml-4 border-l-2 border-l-gray-200 pl-4 dark:border-l-gray-700"
      : ""
  }`}
>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {option.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              </div>

            <button
  type="button"
  role="switch"
  aria-checked={isEnabled}
   aria-label={option.title}
  onClick={() => handleToggle(option.id)}
  className={`
    relative h-7 w-12 shrink-0 rounded-full
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/30
    ${isEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"}
  `}
>
  <span
    className={`
      absolute left-1 top-1
      h-5 w-5 rounded-full bg-white shadow-sm
      transition-transform duration-200
      ${isEnabled ? "translate-x-5" : "translate-x-0"}
    `}
  />
</button>


            </div>
            
          );
        })}
      </div>
    </section>
  );
}

export default NotificationSettings;