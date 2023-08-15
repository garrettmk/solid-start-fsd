import { AuthUserDependency, RequestURLDependency, makeRequestScope, makeRouteRequestScope } from "@/app/server";
import { redirect } from "solid-start";
import { StartServer, createHandler, renderAsync } from "solid-start/entry-server";
import { APIURLDependency, AppURLDependency, SignInURLDependency } from "@/shared/lib";
import { Scope } from 'tidi';

export default createHandler(
  ({ forward }) =>
    async (event) => {
      const requestScope = await makeRequestScope(event);
      const isAuthenticated = await isAuthenticatedRequest(requestScope);
      const isApp = await isAppRequest(requestScope);
      const isAPI = await isAPIRequest(requestScope);
      const signInURL = await requestScope.resolve(SignInURLDependency);

      if (!isAuthenticated && isApp)
        return redirect(signInURL);

      event.locals.scope = isAPI
        ? requestScope
        : await makeRouteRequestScope(requestScope);

      return forward(event);
    },
  renderAsync((event) => <StartServer event={event} />)
);


async function isAuthenticatedRequest(scope: Scope) {
  return Boolean(await scope.resolve(AuthUserDependency));
}

async function isAppRequest(scope: Scope) {
  const requestURL = await scope.resolve(RequestURLDependency);
  const appURL = await scope.resolve(AppURLDependency);

  return requestURL.pathname.startsWith(appURL);
}

async function isAPIRequest(scope: Scope) {
  const requestURL = await scope.resolve(RequestURLDependency);
  const apiURL = await scope.resolve(APIURLDependency);

  return requestURL.pathname.startsWith(apiURL);
}