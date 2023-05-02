import { IS_DEV, IS_SERVER } from "@/shared/config";
import { createAPIClient } from "./lib";

export const api = createAPIClient();

if (IS_DEV && !IS_SERVER)
  // @ts-expect-error non-standard
  window.api = api;