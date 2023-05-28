import { Session } from "../schemas/session-schema";

export interface SessionDataProps {
  session?: Session;
}

export function SessionData(props: SessionDataProps) {
  return (
    <pre>
      {props.session ? JSON.stringify(props.session, null, 2) : "undefined"}
    </pre>
  );
}
