import { For, JSX, createContext, createSignal, createUniqueId, useContext } from "solid-js";
import { Notification } from "../components";


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
 * A context for working with the notifications system.
 */
export type NotificationsContextValue = {
  notify: (notification: NotificationOptions) => string;
  info: (notification: Omit<NotificationOptions, 'type'>) => string;
  success: (notification: Omit<NotificationOptions, 'type'>) => string;
  warning: (notification: Omit<NotificationOptions, 'type'>) => string;
  error: (notification: Omit<NotificationOptions, 'type'>) => string;
  loading: (notification: Omit<NotificationOptions, 'type'>) => string;
  dismiss: (id: string) => void;
}

/*
  * A context for working with the notifications system.
  */
 const NotificationsContext = createContext<NotificationsContextValue>();

/**
 * Helper function for using the `NotificationsContext`.
 * 
 * @returns a `Notifications` store.
 */
export function useNotifications() {
  const notifications = useContext(NotificationsContext);

  if (!notifications)
    throw new Error('No Notifications context');

  return notifications;
}

/**
 * Props for `NotificationProvider`
 */
export type NotificationProviderProps = {
  children: JSX.Element;
}

/**
 * Provides a `Notifications` store to its children.
 * 
 * @param props 
 * @returns 
 */
export function NotificationsProvider(props: NotificationProviderProps) {
  const [notifications, setNotifications] = createSignal<NotificationData[]>([]);

  // General-purpose notification function
  const notify = (notification: NotificationOptions) => {
    const id = createUniqueId();
    const newNotification = { ...notification, id };
  
    setNotifications((c) => ([
        ...c,
        newNotification
    ]));

    return id;
  }

  // Dismiss a notification by id
  const dismiss = (id: string) => {
    setNotifications((c) => c.filter((n) => n.id !== id));
  }

  // A convenience function for creating an info notification
  const info = (notification: Omit<NotificationOptions, 'type'>) => notify({
    type: 'info',
    dismissable: true,
    timeout: 5000,
    ...notification
  });

  // A convenience function for creating a success notification
  const success = (notification: Omit<NotificationOptions, 'type'>) => notify({
    type: 'success',
    dismissable: true,
    timeout: 5000,
    ...notification
  });

  // A convenience function for creating a warning notification
  const warning = (notification: Omit<NotificationOptions, 'type'>) => notify({
    type: 'warning',
    dismissable: true,
    ...notification
  });

  // A convenience function for creating an error notification
  const error = (notification: Omit<NotificationOptions, 'type'>) => notify({
    type: 'error',
    dismissable: true,
    ...notification
  });

  // A convenience function for creating a loading notification
  const loading = (notification: Omit<NotificationOptions, 'type'>) => notify({
    type: 'loading',
    dismissable: false,
    ...notification
  });

  // Put it all together...
  const contextValue: NotificationsContextValue = {
    notify,
    info,
    success,
    warning,
    error,
    loading,
    dismiss
  };

  return (
    <NotificationsContext.Provider value={contextValue} {...props}>
      {props.children}
      <div class="fixed right-4 bottom-4 w-96 flex flex-col gap-4 z-[5000]">
        <For each={notifications()}>
          {(notification) => (
            <Notification {...notification}/>
          )}
        </For>
      </div>
    </NotificationsContext.Provider>
  );
}