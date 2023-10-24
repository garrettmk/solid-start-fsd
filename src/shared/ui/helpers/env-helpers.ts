import { IsClientDependency, IsServerDependency } from "@/shared/lib";
import { useContainer } from "../contexts";

export function useIsClient() {
  return useContainer(IsClientDependency);
}

export function useIsServer() {
  return useContainer(IsServerDependency);
}