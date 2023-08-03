import { APIClientDependency } from "@/shared/lib";
import { useContainer } from "@/shared/ui";
import { Accessor, createResource } from "solid-js";

export function useUserProfile(id: Accessor<string>) {
  const client = useContainer(APIClientDependency);
  
  return createResource(id, (id) => {
    return client.userProfiles.viewProfile.query(id);
  });
}
