import { APIClientDependency } from "@/shared/lib";
import { Code, useContainer } from "@/shared/ui";
import { onMount } from "solid-js";
import { createRouteAction } from "solid-start";

export function HelloWorld() {
  const api = useContainer(APIClientDependency);
  const [result, getResult] = createRouteAction(() =>
    api.debug.helloWorld.query()
  );

  onMount(() => {
    getResult();
  });

  if (result.pending) return <div>Loading...</div>;
  else
    return <Code class="inline-block">{JSON.stringify(result, null, 2)}</Code>;
}
