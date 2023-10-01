import { z } from "zod";

/**
 * A Zod validation schema for `SearchInput` objects.
 */
export const searchInputSchema = z.object({
  keywords: z.string().optional()
});

/**
 * A type for `SearchInput` objects.
 */
export type SearchInput = z.infer<typeof searchInputSchema>;

/**
 * A default `SearchInput` object.
 */
export const defaultSearchInput: Readonly<SearchInput> = Object.freeze({});