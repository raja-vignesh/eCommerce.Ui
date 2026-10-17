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
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 py-6"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded border px-4 py-2 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded border px-4 py-2 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
      >
        Next
      </button>
    </nav>
  );
};
