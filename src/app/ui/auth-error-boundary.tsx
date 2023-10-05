import { useSignOut } from "@/features/session/sign-out";
import { Redirect } from "@/shared/ui";
import { TRPCClientError } from "@trpc/client";
import { ErrorBoundary, JSX } from "solid-js";

/**
 * Props for `AuthErrorBoundary`
 */
export type AuthErrorBoundaryProps = {
  children?: JSX.Element
}

/**
 * An error boundary that will redirect to the sign-in page if the error is an unauthorized error.
 * 
 * @param props 
 * @returns 
 */
export function AuthErrorBoundary(props: AuthErrorBoundaryProps) {
  const signOut = useSignOut();
  const isUnauthorizedError = (error: Error) => error instanceof TRPCClientError && error.message.includes('UNAUTHORIZED');

  return (
    <ErrorBoundary fallback={
      (error) => {
        if (isUnauthorizedError(error)) {
          signOut();
          return <Redirect to="/sign-in"/>
        } else {
          throw error;
        }
      }
    }>
      {props.children}
    </ErrorBoundary>
  );
}