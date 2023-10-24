import { AuthUserDependency, RequestURLDependency, makeRequestContainer, makeRouteRequestContainer } from "@/app/server";
import { redirect } from "solid-start";
import { StartServer, createHandler, renderAsync } from "solid-start/entry-server";
import { APIURLDependency, AppURLDependency, SignInURLDependency } from "@/shared/lib";
import { Container } from 'tidi';

export default createHandler(
  ({ forward }) =>
    async (event) => {
      const requestContainer = await makeRequestContainer(event);
      const isAuthenticated = await isAuthenticatedRequest(requestContainer);
      const isApp = await isAppRequest(requestContainer);
      const isAPI = await isAPIRequest(requestContainer);
      const signInURL = await requestContainer.resolve(SignInURLDependency);

      if (!isAuthenticated && isApp)
        return redirect(signInURL);

      event.locals.container = isAPI
        ? requestContainer
        : await makeRouteRequestContainer(requestContainer);

      return forward(event);
    },
  renderAsync((event) => <StartServer event={event} />)
);


async function isAuthenticatedRequest(container: Container) {
  return Boolean(await container.resolve(AuthUserDependency));
}

async function isAppRequest(container: Container) {
  const requestURL = await container.resolve(RequestURLDependency);
  const appURL = await container.resolve(AppURLDependency);

  return requestURL.pathname.startsWith(appURL);
}

async function isAPIRequest(container: Container) {
  const requestURL = await container.resolve(RequestURLDependency);
  const apiURL = await container.resolve(APIURLDependency);

  return requestURL.pathname.startsWith(apiURL);
}