import {
  FaUserSlash,
  FaXmark,
} from "react-icons/fa6";

const SuspendUserModal = ({
  open,
  user,
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl max-w-md w-full">

        <div className="p-6 border-b flex justify-between">

          <h2 className="font-semibold text-xl">
            Suspend User
          </h2>

          <button onClick={onClose}>
            <FaXmark />
          </button>

        </div>

        <div className="p-6">

          <div className="flex justify-center mb-5">

            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">

              <FaUserSlash className="text-yellow-600 text-2xl"/>

            </div>

          </div>

          <p className="text-center text-gray-600">
            Suspend
            <strong> {user.name} </strong>
            from using the platform?
          </p>

        </div>

        <div className="flex justify-end gap-3 p-6 border-t">

          <button
            onClick={onClose}
            className="border rounded-lg px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(user)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-5 py-2"
          >
            {loading ? "Suspending..." : "Suspend"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default SuspendUserModal;