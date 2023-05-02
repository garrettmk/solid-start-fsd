import { api } from "@/shared/services";
import { Code } from "@/shared/ui";
import { onMount } from "solid-js";
import { createRouteAction } from "solid-start";

export function HelloWorld() {
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
