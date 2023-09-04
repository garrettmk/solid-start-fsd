import { JSX } from "solid-js";
import { createStore } from "solid-js/store";

/**
 * Options for creating a notification.
 */
export type NotificationOptions = {
  type?: 'info' | 'success' | 'warning' | 'error' | 'loading';
  dismissable?: boolean;
  timeout?: number;
  message: JSX.Element | string | (() => JSX.Element | string);
  body?: JSX.Element | string | (() => JSX.Element | string);
}

/**
 * Notification options plus an id.
 */
export type NotificationData = NotificationOptions & { id: string };

/**
 * A SolidJS store that manages notifications.
 */
export type Notifications = {
  notifications: NotificationData[];
  notify: (notification: NotificationOptions) => string;
  dismiss: (id: string) => void;
}

/**
 * A helper function that creates a `Notifications` store. This is used by
 * `NotificationsProvider` to create the store that is provided to its children.
 * 
 * @returns a `Notifications` store.
 */
export function createNotifications(): Notifications {
  const [notifications, setState] = createStore({
    notifications: [] as NotificationData[],

    notify: (notification: NotificationOptions) => {
      const id = (new Date()).getTime().toString(16);
      const newNotification = { ...notification, id };
    
      setState('notifications', (c) => ([
          ...c,
          newNotification
      ]));

      return id;
    },

    dismiss: (id: string) => {
      setState('notifications', (c) => c.filter((n) => n.id !== id));
    }
  });

  return notifications;
}
