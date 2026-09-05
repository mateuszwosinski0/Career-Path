self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      try {
        let data = {
          title: "CareerPath AI",
          body: "You have a new notification.",
          url: "/dashboard",
        };

        if (event.data) {
          try {
            const parsedData = event.data.json();

            data = {
              ...data,
              ...parsedData,
            };
          } catch (error) {
            console.error("[SW] Payload parse error:", error);
          }
        }

        await self.registration.showNotification(data.title, {
          body: data.body,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          data: {
            url: data.url || "/dashboard",
          },
        });
      } catch (error) {
        console.error("[SW] Notification error:", error);
      }
    })()
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url || "/dashboard";

  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            if ("navigate" in client) {
              client.navigate(url);
            }

            return client.focus();
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});