import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

const PaymentPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">

      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-10 h-10 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
        >
          <FaChevronLeft className="mx-auto" />
        </button>

        {Array.from(
          { length: totalPages },
          (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-10 h-10 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-10 h-10 border rounded-lg disabled:opacity-40 hover:bg-gray-100"
        >
          <FaChevronRight className="mx-auto" />
        </button>

      </div>

    </div>
  );
};

export default PaymentPagination;