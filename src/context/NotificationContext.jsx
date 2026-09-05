import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";


const NotificationsContext = createContext();

function NotificationsProvider({ children }) {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  async function fetchNotifications() {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        application:applications!notifications_application_id_fkey (
          company,
          position
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications", error);
      setLoading(false);
      return;
    }

    setNotifications(data);
    setLoading(false);
  }

  fetchNotifications();
}, [user]);

    useEffect(() => {
      if (!user) return;

      const channel = supabase
      .channel(`notifications-${user.id}`)
     .on(
  "postgres_changes",
  {
    event: "INSERT",
    schema: "public",
    table: "notifications",
    filter: `user_id=eq.${user.id}`,
  },
  async (payload) => {
    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        application:applications!notifications_application_id_fkey (
          company,
          position
        )
      `)
      .eq("id", payload.new.id)
      .single();

    if (error) {
      console.error("Error fetching realtime notification:", error);
      return;
    }

    setNotifications((currentNotifications) => [
      data,
      ...currentNotifications,
    ]);
  }
)
      .on(
  "postgres_changes",
  {
    event: "UPDATE",
    schema: "public",
    table: "notifications",
    filter: `user_id=eq.${user.id}`,
  },
 (payload) => {
  setNotifications((currentNotifications) =>
    currentNotifications.map((notification) =>
      notification.id === payload.new.id
        ? {
            ...notification,
            ...payload.new,
          }
        : notification
    )
  );
}
)
      .subscribe();

      return() => {
        supabase.removeChannel(channel);
      };
    }, [user]);


   async function markAsRead(notificationId) {
  if (!user) return;

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error marking notification as read:", error);
    return;
  }

  setNotifications((currentNotifications) =>
    currentNotifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, is_read: true }
        : notification
    )
  );
}
    async function markAllAsRead() {
  if (!user) return;

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) {
    console.error("Error marking all notifications as read:", error);
    return;
  }

  setNotifications((currentNotifications) =>
    currentNotifications.map((notification) => ({
      ...notification,
      is_read: true,
    }))
  );
}

async function deleteNotification(notificationId) {
  if (!user) return;

  const {error} = await supabase
  .from("notifications")
  .delete()
  .eq("id", notificationId)
  .eq("user_id", user.id);

  if(error) {
    console.error("Error deleting notification:", error);
    return;
  }

  setNotifications((currentNotifications) =>
  currentNotifications.filter(
  (notification) => notification.id !== notificationId
  )
  );
}

async function clearAllNotifications() {
  if (!user) return;

  const {error} = await supabase
  .from("notifications")
  .delete()
  .eq("user_id", user.id);

  if (error) {
    console.error("Error clearing notifications", error);
    return;
  }
  setNotifications([]);
}


  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

function useNotifications() {
  return useContext(NotificationsContext);
}

export {
  NotificationsProvider,
  useNotifications,
};