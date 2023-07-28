// import { IS_CLIENT } from "@/shared/lib";
import { authTokensSchema } from "@/shared/schemas";
import {
  CookieSerializeOptions, parseCookies,
  serializeCookie
} from "./cookies-util";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};


const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Safari/Ephiphany won't set secure cookies on localhost. I *could* secure localhost
// with a certificate, but this is much easier.
const IS_LOCALHOST = typeof window !== "undefined" && window.location.hostname === "localhost";

/**
 * Check storage for authentication tokens
 *
 * @returns true if the storage has auth tokens, false otherwise
 */
export function storageHasAuthTokens(): boolean {
  const cookies = parseCookies(document.cookie);
  return cookies.has(ACCESS_TOKEN_KEY) && cookies.has(REFRESH_TOKEN_KEY);
}

/**
 * Get authentication tokens from storage
 *
 * @returns the authentication tokens from storage, or undefined if none are found
 */
export function getAuthTokensFromStorage(): AuthTokens {
  const cookieString = document.cookie;
  const cookies = parseCookies(cookieString);

  const accessToken = cookies.get(ACCESS_TOKEN_KEY);
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY);

  return authTokensSchema.parse({ accessToken, refreshToken });
}

/**
 * Get authentication tokens from a request
 *
 * @param req a Request object
 * @returns the authentication tokens from the request, or undefined if none are found
 */
export function getAuthTokensFromRequest(req: Request): AuthTokens | undefined {
  const cookieString = req.headers.get("Cookie") ?? "";
  const cookies = parseCookies(cookieString);

  const accessToken = cookies.get(ACCESS_TOKEN_KEY);
  const refreshToken = cookies.get(REFRESH_TOKEN_KEY);

  if (accessToken && refreshToken) return { accessToken, refreshToken };
}

/**
 * Save auth tokens in storage
 *
 * @param tokens the authentication tokens to save in storage
 */
export function saveAuthTokensInStorage(tokens: AuthTokens) {
  const { accessToken, refreshToken } = tokens;
  const options: CookieSerializeOptions = {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    sameSite: "lax",
    secure: !IS_LOCALHOST,
    path: "/",
  };

  document.cookie = serializeCookie(ACCESS_TOKEN_KEY, accessToken, options);
  document.cookie = serializeCookie(REFRESH_TOKEN_KEY, refreshToken, options);
}

/**
 * Remove auth tokens from storage
 */
export function removeAuthTokensFromStorage() {
  const options: CookieSerializeOptions = {
    maxAge: 0,
    sameSite: "lax",
    secure: !IS_LOCALHOST,
    path: "/",
  };

  document.cookie = serializeCookie(ACCESS_TOKEN_KEY, "", options);
  document.cookie = serializeCookie(REFRESH_TOKEN_KEY, "", options);
}