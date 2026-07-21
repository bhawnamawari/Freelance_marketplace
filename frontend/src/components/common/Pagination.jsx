const Pagination = ({
    page,
    totalPages,
    setPage,
}) => {
    return (
        <div className="flex gap-3 justify-center mt-6">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            <span>
                {page} / {totalPages}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;