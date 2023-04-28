import { Session } from "../schemas";

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
