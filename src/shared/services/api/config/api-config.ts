export const API_URL: string =
  import.meta.env?.VITE_API_URL ??
  process.env.VITE_API_URL ??
  "/api";