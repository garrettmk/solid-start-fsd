// @refresh reload
import { createClientScope } from "@/app/scopes";
import { QueryClientDependency } from "@/shared/lib";
import { ScopeProvider, Spinner } from "@/shared/ui";
import { QueryClientProvider } from "@tanstack/solid-query";
import { Show, Suspense, createSignal, onMount } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start";
import "./root.css";

export default function Root() {
  const clientScope = createClientScope();
  const [isResolved, setIsResolved] = createSignal(false);

  onMount(async () => {
    await clientScope.resolveAll();
    setIsResolved(true);
  });

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-slate-50 dark:bg-slate-900">
        <Suspense fallback={(
          <div class="flex items-center justify-center h-screen">
            <Spinner size="2xl" />
          </div>
        )}>
          <ErrorBoundary>
            <Show when={isResolved()}>
              <ScopeProvider scope={clientScope}>
                <QueryClientProvider client={clientScope.get(QueryClientDependency)}>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </QueryClientProvider>
              </ScopeProvider>
            </Show>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
