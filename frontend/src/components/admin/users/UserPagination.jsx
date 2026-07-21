import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

const UserPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-10 h-10 rounded-lg border disabled:opacity-40 hover:bg-gray-100 flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg border transition
              ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-10 h-10 rounded-lg border disabled:opacity-40 hover:bg-gray-100 flex items-center justify-center"
        >
          <FaChevronRight />
        </button>

      </div>

    </div>
  );
};

export default UserPagination;