import { isServer } from "solid-js/web";

export const IS_SERVER = Boolean(import.meta.env.SSR);
export const IS_CLIENT = !isServer;

export const APP_MODE: string =
  import.meta.env.MODE ??
  process.env.NODE_ENV ??
  "development";

export const IS_DEV: boolean =
  import.meta.env.DEV ??
  process.env.NODE_ENV === "development";

export const IS_PRODUCTION: boolean =
  import.meta.env.PROD ??
  process.env.NODE_ENV === "production";

export const API_URL: string =
  import.meta.env.VITE_API_URL ??
  process.env.API_URL ??
  "/api";
