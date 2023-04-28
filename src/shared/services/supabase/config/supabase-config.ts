export const SUPABASE_URL: string =
  import.meta.env?.VITE_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL ??
  "";

export const SUPABASE_ANON_KEY: string =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY ??
  "";

export const SUPABASE_SERVICE_ROLE_KEY: string =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  "";
