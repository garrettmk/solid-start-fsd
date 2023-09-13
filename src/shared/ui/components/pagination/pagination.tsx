import { Paginated } from "@/shared/schemas";
import clsx from "clsx";
import { list } from "radash";
import { Accessor, For, splitProps } from "solid-js";
import { SizeProp } from "../../helpers";
import { HStack, HStackProps } from "../stacks";
import { PaginationButton } from "./pagination-button";

export type PaginationProps = HStackProps & {
  value?: Accessor<Paginated>;
  onChange?: (paginated: Paginated) => void;
  pages?: number;
  size?: SizeProp
}

export function Pagination(props: PaginationProps) {
  const [, stackProps] = splitProps(props, [
    'class',
    'as',
    'spacing',
    'align',
    'justify',
    'pages',
    'size',
    'value',
    'onChange',
  ]);

  // Make sure we at least have a default value to work with below
  const value: Accessor<Paginated> = () => props.value?.() ?? {
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
    const { offset, limit, total } = value();
    props.onChange?.({
      limit,
      total,
      offset: Math.max(offset - limit, 0),
    });
  }

  // Handle a click on the "Next" button
  const handleNext = () => {
    const { offset, limit, total } = value();
    props.onChange?.({
      limit,
      total,
      offset: Math.min(offset + limit, Math.floor(total / limit) * limit),
    });
  }

  // Handle a click on a page number
  const handlePage = (page: number) => {
    const { limit, total } = value();
    props.onChange?.({
      limit,
      total,
      offset: (page - 1) * limit,
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
      <PaginationButton onClick={handlePrevious} size={props.size}>
        Previous
      </PaginationButton>
      <For each={pageNumbers()}>
        {(page) => (
          <PaginationButton
            onClick={() => handlePage(page)}
            size={props.size}
            isCurrentPage={page === currentPage()}
          >
            {page}
          </PaginationButton>
        )}
      </For>
      <PaginationButton onClick={handleNext} size={props.size}>
        Next
      </PaginationButton>
    </HStack>
  )
}
