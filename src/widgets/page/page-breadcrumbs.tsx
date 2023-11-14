import { Breadcrumbs, useRouteContext } from "@/shared/ui";
import { For, Show, createMemo } from "solid-js";

/**
 * Generates breadcrumbs from the `RouteContext`.
 * 
 * @returns 
 */
export function PageBreadcrumbs() {
  const route = useRouteContext();
  
  const breadcrumbProps = createMemo(() => {
    const fragments = route.fragments();

    return fragments.map((fragment, index) => ({
      href: index < fragments.length - 1
        ? fragments
            .slice(0, index + 1)
            .map(fragment => fragment.path)
            .join('/')
            .replaceAll('//', '/')
        : undefined,
      children: fragment.title
    }));
  });

  return (
    <Breadcrumbs class="text-lg font-medium">
      <For each={breadcrumbProps()}>
        {(props, index) => (
          <>
            <Breadcrumbs.Item {...props}/>
            <Show when={index() < breadcrumbProps().length - 1}>
              <Breadcrumbs.Separator/>
            </Show>
          </>
        )}
      </For>
    </Breadcrumbs>
  );
}