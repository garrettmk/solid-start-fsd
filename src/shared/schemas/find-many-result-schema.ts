import { z } from "zod";
import { paginatedResultSchema } from "./paginated-result-schema";
import { searchInputSchema } from "./search-input-schema";
import { sortingInputSchema } from "./sorting-input-schema";

export const findManyResultSchema = z.object({
  data: z.array(z.any()),
  search: searchInputSchema,
  sorting: sortingInputSchema,
  paginated: paginatedResultSchema,
});

export type FindManyResult = z.infer<typeof findManyResultSchema>;