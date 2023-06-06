// @refresh reload
import { ScopeProvider } from "@/shared/ui";
import { Suspense } from "solid-js";
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
import { clientScope } from "@/app/scopes";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-slate-50 dark:bg-slate-900">
        <Suspense>
          <ErrorBoundary>
            <ScopeProvider scope={clientScope}>
              <Routes>
                <FileRoutes />
              </Routes>
            </ScopeProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
