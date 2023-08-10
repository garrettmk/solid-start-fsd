import { APIClientDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";
import { Accessor, createResource } from "solid-js";

export function useUser(id: Accessor<string | undefined>) {
  const api = useContainer(APIClientDependency);

  return createResource(id, async (id) => {
    return api.users.viewUser.query(id);
  });
}