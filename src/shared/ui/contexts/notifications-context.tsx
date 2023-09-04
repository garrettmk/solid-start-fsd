import { For, JSX, createContext, useContext } from "solid-js";
import { Notifications, createNotifications } from "../helpers";
import { Notification } from "../components";


/**
 * A context that provides a `Notifications` store.
 */
export const NotificationsContext = createContext<Notifications>({} as Notifications);

/**
 * Helper function for using the `NotificationsContext`.
 * 
 * @returns a `Notifications` store.
 */
export function useNotifications() {
  return useContext(NotificationsContext);
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
  const notifications = createNotifications();

  // @ts-expect-error idk
  window.notifications = notifications;

  return (
    <NotificationsContext.Provider value={notifications} {...props}>
      {props.children}
      <div class="fixed right-4 bottom-4 w-96 flex flex-col gap-4 z-[5000]">
        <For each={notifications.notifications}>
          {(notification) => (
            <Notification {...notification}/>
          )}
        </For>
      </div>
    </NotificationsContext.Provider>
  );
}