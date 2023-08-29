import { z } from "zod";

export const paginationSchema = z.object({
  offset: z.number().int().min(0),
  count: z.number().int().min(1)
});

export const paginatedSchema = z.object({
  offset: z.number().int().min(0),
  count: z.number().int().min(0),
  total: z.number().int().min(0)
});