import { createContext, splitProps, useContext } from "solid-js";

/**
 * Describes a route fragment.
 */
export type RouteFragment = {
  path: string;
  title: string;
}

/**
 * Checks if a value is a route fragment.
 * 
 * @param value 
 * @returns 
 */
export function isRouteFragment(value: any): value is RouteFragment {
  return typeof value === 'object' &&
    typeof value.path === 'string' &&
    typeof value.title === 'string';
}

/**
 * The route context.
 */
export type RouteContextValue = {
  relativeUrl: (path: string) => string;
  fragments: () => Partial<RouteFragment>[];
};

/**
 * The route context.
 */
export const RouteContext = createContext<RouteContextValue>();

/**
 * Convenience hook for using the route context.
 * 
 * @returns 
 */
export function useRouteContext() {
  const context = useContext(RouteContext);

  if (!context)
    throw new Error('No Route context');

  return context;
}

/**
 * Props for the `RouteProvider` component.
 */
export type RouteProviderProps = Partial<RouteFragment> & {
  children: any;
}

/**
 * Provides a route context to its children.
 * 
 * @param props 
 * @returns 
 */
export function RouteProvider(props: RouteProviderProps) {
  const [routeProps] = splitProps(props, ['path', 'title']);
  const parent = useContext(RouteContext);

  const relativeUrl = (path: string) => {
    return [
      parent?.relativeUrl(''),
      routeProps.path,
      path
    ]
    .filter(Boolean)
    .join('/')
    .replaceAll('//', '/');
  }

  const fragments = () => {
    const parentFragments = parent?.fragments() ?? [];
    return [...parentFragments, routeProps].filter(isRouteFragment);
  }

  return (
    <RouteContext.Provider value={{ relativeUrl, fragments }}>
      {props.children}
    </RouteContext.Provider>
  );
}