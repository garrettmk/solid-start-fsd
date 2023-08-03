import { z } from "zod";

export const resourceReturnSchema = z.tuple([
  z.function(),
  z.object({
    refetch: z.function(),
    mutate: z.function(),
  })
]);