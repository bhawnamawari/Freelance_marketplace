import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    message,
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="text-xl font-bold mb-5">
                {message}
            </h2>

            <div className="flex gap-3">
                <Button onClick={onConfirm}>
                    Yes
                </Button>

                <Button
                    className="bg-red-600"
                    onClick={onClose}
                >
                    No
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDialog;