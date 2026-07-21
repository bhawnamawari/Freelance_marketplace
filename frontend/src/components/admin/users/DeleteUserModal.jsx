import {
  FaTrash,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";

const DeleteUserModal = ({
  open,
  user,
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">

      <div className="bg-white rounded-2xl max-w-md w-full">

        <div className="p-6 border-b flex justify-between">

          <h2 className="font-semibold text-xl">
            Delete User
          </h2>

          <button onClick={onClose}>
            <FaXmark />
          </button>

        </div>

        <div className="p-6 text-center">

          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center">

            <FaTriangleExclamation className="text-red-600 text-2xl"/>

          </div>

          <p className="mt-5 text-gray-600">
            This action cannot be undone.
          </p>

          <p className="mt-2 font-semibold">
            Delete {user.name}?
          </p>

        </div>

        <div className="border-t p-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border rounded-lg px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(user)}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 py-2 flex items-center gap-2"
          >
            <FaTrash />
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteUserModal;