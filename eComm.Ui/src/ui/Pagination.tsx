type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePages = (): (number | string)[] => {
    const pages = new Set<number>();

    // Always show first and last pages
    pages.add(1);
    pages.add(totalPages);

    // Show 2 pages before and after current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.add(i);
    }

    const sortedPages = [...pages].sort((a, b) => a - b);
    const visiblePages: (number | string)[] = [];

    sortedPages.forEach((page, index) => {
      if (index > 0) {
        const previousPage = sortedPages[index - 1];

        if (page - previousPage === 2) {
          visiblePages.push(previousPage + 1);
        } else if (page - previousPage > 2) {
          visiblePages.push("...");
        }
      }

      visiblePages.push(page);
    });

    return visiblePages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2 py-6"
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded border px-4 py-2 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {getVisiblePages().map((page, index) =>
        typeof page === "number" ? (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`rounded border px-4 py-2 cursor-pointer ${
              currentPage === page
                ? "bg-indigo-800 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ),
      )}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded border px-4 py-2 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};
