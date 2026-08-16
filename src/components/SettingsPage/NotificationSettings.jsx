const notificationOptions = [
  {
    id: "email",
    title: "Email notifications",
    description: "Receive updates by email.",
  },
  {
    id: "browser",
    title: "Browser notifications",
    description: "Show browser notifications.",
  },
  {
    id: "reminders",
    title: "Application reminders",
    description: "Get reminders about pending applications.",
  },
];

function NotificationSettings({
  notifications,
  setNotifications,
}) {
  function handleToggle(id) {
    setNotifications((currentNotifications) => ({
      ...currentNotifications,
      [id]: !currentNotifications[id],
    }));
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-2">
       <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
  Notifications
</h2>

<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
  Choose how you would like to receive updates.
</p>
      </div>

      <div>
        {notificationOptions.map((option) => {
          const isEnabled = notifications[option.id];

          return (
            <div
              key={option.id}
              className="flex items-center justify-between gap-6 border-b border-gray-200 py-5 last:border-b-0 dark:border-gray-800"
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