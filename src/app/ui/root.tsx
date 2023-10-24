// @refresh reload
import { createClientContainer } from "@/app/containers";
import { QueryClientDependency } from "@/shared/lib";
import { ContainerProvider, Spinner } from "@/shared/ui";
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
import { AuthErrorBoundary } from "./auth-error-boundary";

export default function Root() {
  const clientContainer = createClientContainer();
  const [isResolved, setIsResolved] = createSignal(false);

  onMount(async () => {
    await clientContainer.resolveAll();
    setIsResolved(true);
  });

  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-slate-50 dark:bg-slate-900 w-screen h-screen">
        <Suspense fallback={(
          <div class="flex items-center justify-center h-screen">
            <Spinner size="2xl" />
          </div>
        )}>
          <ErrorBoundary>
            <Show when={isResolved()}>
              <ContainerProvider container={clientContainer}>
                <AuthErrorBoundary>
                  <QueryClientProvider client={clientContainer.get(QueryClientDependency)}>
                    <Routes>
                      <FileRoutes />
                    </Routes>
                  </QueryClientProvider>
                </AuthErrorBoundary>
              </ContainerProvider>
            </Show>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
