import { mergeProps } from "solid-js";
import { NotificationProps, Notification } from "./notification";
import { Code, Error } from "../text";

const defaultProps = {
  type: 'error',
  dismissable: false
} as const;

/**
 * Props for `ErrorNotification`
 */
export type ErrorNotificationProps = Omit<NotificationProps, 'type'> & {
  error: Error
};

/**
 * A `Notification` for displaying errors.
 * 
 * @param props 
 * @returns 
 */
export function ErrorNotification(props: ErrorNotificationProps) {
  const propsWithDefaults = mergeProps(defaultProps, props);

  return (
    <Notification {...propsWithDefaults} body={() => (
      <Code>
        <Error>
          {props.error.message}
        </Error>
      </Code>
    )}/>
  );
}