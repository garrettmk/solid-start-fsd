import { z } from "zod";
import { defaultSortingInput, sortingInputSchema } from "./sorting-input-schema";
import { defaultPaginationInput, paginationInputSchema } from "./pagination-input-schema";
import { defaultSearchInput, searchInputSchema } from "./search-input-schema";

/**
 * A schema for validating a `FindManyInput` object.
 */
export const findManyInputSchema = z.object({
  search: searchInputSchema.optional(),
  sorting: sortingInputSchema.optional(),
  pagination: paginationInputSchema.optional()
});

/**
 * A type for a `FindManyInput` object.
 */
export type FindManyInput = z.input<typeof findManyInputSchema>;

/**
 * A default value for a `FindManyInput` object.
 */
export const defaultFindManyInput: FindManyInput = {
  search: defaultSearchInput,
  sorting: defaultSortingInput,
  pagination: defaultPaginationInput
};