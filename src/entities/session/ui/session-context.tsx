import { Accessor, createContext, useContext } from "solid-js";
import type { Session } from "../schemas";

export const SessionContext = createContext<Accessor<Session | undefined>>(
  () => {
    return undefined;
  }
);

export function useSession() {
  return useContext(SessionContext);
}
