import { Component, For, JSX, createContext, createSignal, createUniqueId, mergeProps, useContext } from "solid-js";
import { Dynamic } from "solid-js/web";

/**
 * Options for creating a notification.
 */
export type NotificationOptions = {
  onClose: () => void;
}

/**
 * A `Component` type for notifications
 */
export type NotificationComponent<P extends NotificationOptions = NotificationOptions> = Component<P>;

/**
 * Context for working with notifications
 */
export type NotificationContextValue = {
  notify: <P extends NotificationOptions>(component: NotificationComponent<P>, props?: P) => string;
  dismiss: (id: string) => void;
}


export const NotificationsContext = createContext<NotificationContextValue>();


/**
 * Hook for using the `NotificationContext`
 * 
 * @returns 
 */
export function useNotificationContext() {
  const value = useContext(NotificationsContext);

  if (!value)
    throw new Error('No notification context');

  return value;
}

/**
 * Convenience hook for creating notifications.
 * 
 * @param component 
 * @param props 
 * @returns 
 */
export function useNotification<P extends NotificationOptions>(component: NotificationComponent<P>, props?: Partial<P>) {
  const context = useNotificationContext();
  const [getId, setId] = createSignal<string>();
  
  const notify = (p?: Partial<P>) => {
    const id = context.notify(component, mergeProps(props, p) as P);
    setId(id);
  };
  
  const dismiss = () => {
    const id = getId();
    
    if (id)
      context.dismiss(id);
    
    setId();
  };

  return [notify, dismiss] as const;
}

/**
 * Props for `NotificationProvider`
 */
export type NotificationProviderProps = {
  children?: JSX.Element
}

/**
 * A provider for a `NotificationContext`. Renders notifications in the bottom-right corner
 * of the screen, on top of its children.
 * 
 * @param props 
 * @returns 
 */
export function NotificationProvider(props: NotificationProviderProps) {
  const [notifications, setNotifications] = createSignal<[string, NotificationComponent<any>][]>([]);

  const dismiss = (id: string) => {
    setNotifications(c => c.filter(([notificationId]) => notificationId !== id));
  }

  const notify = <P extends NotificationOptions>(component: NotificationComponent<P>, props?: P) => {
    const id = createUniqueId();
    const defaultProps: NotificationOptions = {
      onClose: () => dismiss(id),
    };
    
    const componentWithProps = (p?: P) => component(mergeProps(defaultProps, props, p) as P);

    setNotifications(c => ([
      ...c,
      [id, componentWithProps]
    ]));

    return id;
  }

  const contextValue: NotificationContextValue = {
    notify,
    dismiss
  }

  return (
    <NotificationsContext.Provider value={contextValue}>
      {props.children}
      <div class="fixed right-4 bottom-4 w-96 flex flex-col gap-4 z-[5000]">
        <For each={notifications()}>
          {([id, component]) => (
            <Dynamic component={component} key={id}/>
          )}
        </For>
      </div>
    </NotificationsContext.Provider>
  );
}