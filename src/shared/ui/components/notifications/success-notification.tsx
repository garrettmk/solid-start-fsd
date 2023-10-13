import { mergeProps } from "solid-js";
import { Notification, NotificationProps } from "./notification";

const defaultProps = {
  type: 'success',
  dismissable: true,
  timeout: 5000 
} as const;

/**
 * Props for `SuccessNotification`
 */
export type SuccessNotificationProps = Omit<NotificationProps, 'type'>;

/**
 * A notification for showing success messages.
 * 
 * @param props 
 * @returns 
 */
export function SuccessNotification(props: SuccessNotificationProps) {
  const propsWithDefaults = mergeProps(defaultProps, props);

  return <Notification {...propsWithDefaults}/>;
}