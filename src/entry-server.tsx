import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";
import { getAuthTokensFromRequest } from "@/app/providers/session/lib";
import {
  createSupabaseClient,
  useAuthTokens,
} from "@/shared/services/supabase";
import { redirect } from "solid-start";

export default createHandler(
  ({ forward }) =>
    async (event) => {
      const supabase = createSupabaseClient();
      event.locals.supabase = supabase;

      const tokens = getAuthTokensFromRequest(event.request);
      const user = tokens && (await useAuthTokens(supabase, tokens));
      event.locals.user = user;

      const url = new URL(event.request.url);
      if (!user && url.pathname.startsWith("/app")) return redirect("/sign-in");

      return forward(event);
    },
  renderAsync((event) => <StartServer event={event} />)
);
