import { supabase } from "@/lib/supabase";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4
  );

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
}

export async function subscribeToPush(userId) {
  if (!("serviceWorker" in navigator)) {
    return {
      data: null,
      error: new Error("Service workers are not supported."),
    };
  }

  if (!("PushManager" in window)) {
    return {
      data: null,
      error: new Error("Push notifications are not supported."),
    };
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    return {
      data: null,
      error: new Error(
        "Notification permission was not granted."
      ),
    };
  }

  const registration = await navigator.serviceWorker.ready;

  let subscription =
    await registration.pushManager.getSubscription();

  if (!subscription) {
    const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

    if (!publicKey) {
      return {
        data: null,
        error: new Error("VAPID public key is missing."),
      };
    }

    subscription =
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          urlBase64ToUint8Array(publicKey),
      });
  }
const subscriptionData = subscription.toJSON();

const { data, error } = await supabase
  .from("push_subscriptions")
  .upsert(
    {
      user_id: userId,
      subscription: subscriptionData,
      endpoint: subscriptionData.endpoint,
    },
    {
      onConflict: "endpoint",
    }
  )
  .select()
  .single();

if (error) {
  console.error(
    "Error saving push subscription:",
    error
  );

  return {
    data: null,
    error,
  };
}

return {
  data,
  error: null,
};
}


