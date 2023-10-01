import { PaginatedResult, PaginationInput } from "@/shared/schemas";
import clsx from "clsx";
import { list } from "radash";
import { Accessor, For, splitProps } from "solid-js";
import { SizeProp } from "../../helpers";
import { HStack, HStackProps } from "../stacks";
import { PaginationButton } from "./pagination-button";
import { ButtonProps } from "../buttons";
import { clamp } from "@/shared/lib";

/**
 * Props for the Pagination component
 */
export type PaginationProps = HStackProps & {
  pagination?: Accessor<PaginatedResult>;
  onChange?: (pagination: PaginationInput) => void;
  pages?: number;
  size?: SizeProp;
  radius?: SizeProp;
  color?: ButtonProps['color'];
  disabled?: boolean
}

/**
 * A component that handles pagination
 * 
 * @param props 
 * @returns 
 */
export function Pagination(props: PaginationProps) {
  const [, stackProps] = splitProps(props, [
    'class',
    'as',
    'spacing',
    'align',
    'justify',
    'pages',
    'size',
    'pagination',
    'onChange',
    'color',
    'radius',
    'disabled'
  ]);

  const [buttonProps] = splitProps(props, [
    'size',
    'color',
    'radius',
    'disabled'
  ]);

  // Make sure we at least have a default value to work with below
  const value: Accessor<PaginatedResult> = () => props.pagination?.() ?? {
    offset: 0,
    limit: 0,
    total: 0,
  };

  // Calculate the current page by dividing the offset by the limit
  const currentPage = () => {
    const { offset, limit } = value();
    const currentPageIndex = Math.ceil(offset / limit);
    return currentPageIndex + 1;
  }

  // Make a list of page numbers to display
  const pageNumbers = () => {
    const { total, limit } = value();
    const totalPages = Math.ceil(total / limit);
    
    const minLowerBound = Math.max(currentPage() - 2, 1);
    const minUpperBound = Math.max(totalPages - 4, 1);
    const min = Math.min(minLowerBound, minUpperBound);
    
    const maxLowerBound = Math.min(min + 4, totalPages);
    const maxUpperBound = totalPages;
    const max = Math.min(maxLowerBound, maxUpperBound);

    return list(min, max);
  }

  // Handle the "Previous" button click
  const handlePrevious = () => {
    const { offset, limit } = value();
    const previousPageOffset = offset - limit;

    props.onChange?.({
      limit,
      offset: Math.max(previousPageOffset, 0),
    });
  }

  // Handle a click on the "Next" button
  const handleNext = () => {
    const { offset, limit, total } = value();
    const nextPageOffset = offset + limit;
    const lastPageOffset = Math.floor(total / limit) * limit;
    
    props.onChange?.({
      limit,
      offset: Math.min(nextPageOffset, lastPageOffset)
    });
  }

  // Handle a click on a page number
  const handlePage = (page: number) => {
    const { limit } = value();
    const lastPageOffset = Math.floor(value().total / limit) * limit;
    const gotoOffset = clamp((page - 1) * limit, {
      min: 0,
      max: lastPageOffset
    });
    
    props.onChange?.({
      limit,
      offset: gotoOffset,
    });
  }

  return (
    <HStack
      as="nav"
      justify="center"
      spacing="none"
      class={clsx('-space-x-px', props.class)}
      {...stackProps}
    >
      <PaginationButton onClick={handlePrevious} {...buttonProps}>
        Previous
      </PaginationButton>
      <For each={pageNumbers()}>
        {(page) => (
          <PaginationButton
            onClick={() => handlePage(page)}
            isCurrentPage={page === currentPage()}
            {...buttonProps}
          >
            {page}
          </PaginationButton>
        )}
      </For>
      <PaginationButton onClick={handleNext} {...buttonProps}>
        Next
      </PaginationButton>
    </HStack>
  )
}
