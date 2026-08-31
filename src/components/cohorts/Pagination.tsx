import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  showingFrom: number;
  showingTo: number;
  total: number;
  itemLabel: string;
  currentPage?: number;
  pages?: number[];
  lastPage?: number;
}

export default function Pagination({
  showingFrom,
  showingTo,
  total,
  itemLabel,
  currentPage = 1,
  pages = [1, 2, 3],
  lastPage = 10,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="text-[10px] text-[#777]">
        Showing {showingFrom} to {showingTo} of {total} {itemLabel}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous page"
          className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc]"
        >
          <ChevronLeft size={14} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={
              page === currentPage
                ? "flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#72a6ff] bg-[#edf4ff] text-[10px] text-[#347aff]"
                : "flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc] text-[10px]"
            }
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          aria-label="Next page"
          className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc]"
        >
          <ChevronRight size={14} />
        </button>

        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-[7px] border border-[#ccc] text-[10px]"
        >
          {lastPage}
        </button>

        <button
          type="button"
          className="flex h-7 items-center gap-2 rounded-[7px] border border-[#ccc] px-2 text-[10px]"
        >
          Last page
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}
