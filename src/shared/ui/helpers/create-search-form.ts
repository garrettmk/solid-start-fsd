import { UseCreateFormOptions, useCreateForm } from "./use-create-form";
import { SearchInput } from "@/shared/schemas";

/**
 * A convenience function for creating a Form for a SearchInput data.
 * 
 * @param options 
 * @returns 
 */
export function createSearchForm(options: Omit<UseCreateFormOptions<SearchInput>, 'validate'> = {}) {
  return useCreateForm<SearchInput>(options);
}