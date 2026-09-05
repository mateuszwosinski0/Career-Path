export async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        return {
            granted: false,
            reason: "unsupported",
        };
    }

    if (Notification.permission === "granted") {
        return {
            granted: true,
        };
    }

    const permission = await Notification.requestPermission();

    return {
        granted: permission === "granted",
        reason: permission,
    };
}

export function showBrowserNotification(title, options = {}) {
    if (!("Notification" in window)) {
        return false;
    }

    if (Notification.permission !== "granted" ) {
        return false;
    }

    new Notification(title,options);

    return true;
}