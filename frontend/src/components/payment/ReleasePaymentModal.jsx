const ReleasePaymentModal = ({
    open,
    onClose,
    onConfirm
}) => {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-xl p-8 w-96">

                <h2 className="text-2xl font-bold">

                    Release Payment

                </h2>

                <p className="mt-4">

                    Are you sure you want to release this escrow payment?

                </p>

                <div className="flex justify-end gap-4 mt-6">

                    <button
                        onClick={onClose}
                        className="border px-5 py-2 rounded"
                    >

                        Cancel

                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-green-600 text-white px-5 py-2 rounded"
                    >

                        Release

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ReleasePaymentModal;