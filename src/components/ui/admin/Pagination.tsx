import React from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  showingFrom: number
  showingTo: number
  totalCount: number
  pageSize: number
  onPageSizeChange: (size: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  showingFrom,
  showingTo,
  totalCount,
  pageSize,
  onPageSizeChange,
}) => {
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 py-2">
      <p className="text-sm text-admin-ash-3 order-2 sm:order-1">
        Showing {showingFrom} to {showingTo} of {totalCount}
      </p>

      <div className="flex items-center gap-2 order-1 sm:order-2 flex-wrap justify-center">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-admin-ash-6 text-admin-ash-2 disabled:opacity-40 hover:bg-admin-ash-7/60 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
              page === n
                ? 'border-admin-info/40 bg-admin-info-light text-admin-info'
                : 'border-admin-ash-6 text-admin-ash-2 hover:bg-admin-ash-7/60'
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-admin-ash-6 text-admin-ash-2 disabled:opacity-40 hover:bg-admin-ash-7/60 transition-colors"
        >
          <ChevronRight size={16} />
        </button>

        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-9 appearance-none rounded-lg border border-admin-ash-6 bg-white pl-3 pr-7 text-sm font-medium text-admin-ash-2 outline-none cursor-pointer"
          >
            {[6, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-admin-ash-3" />
        </div>

        <div className="relative">
          <select
            value={page}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="h-9 appearance-none rounded-lg border border-admin-ash-6 bg-white pl-3 pr-7 text-sm font-medium text-admin-ash-2 outline-none cursor-pointer"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n === totalPages ? 'Last page' : `Page ${n}`}</option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-admin-ash-3" />
        </div>
      </div>
    </div>
  )
}

export default Pagination
