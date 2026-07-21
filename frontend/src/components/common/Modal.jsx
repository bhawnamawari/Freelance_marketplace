const Modal = ({ open, children, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[500px]">
                {children}

                <button
                    onClick={onClose}
                    className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;