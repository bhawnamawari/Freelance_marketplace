import {
  FaUserCheck,
  FaXmark,
} from "react-icons/fa6";

const VerifyUserModal = ({
  open,
  user,
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">

      <div className="bg-white rounded-2xl max-w-md w-full">

        <div className="p-6 border-b flex justify-between">

          <h2 className="font-semibold text-xl">
            Verify User
          </h2>

          <button onClick={onClose}>
            <FaXmark />
          </button>

        </div>

        <div className="p-6 text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">

            <FaUserCheck className="text-green-600 text-2xl"/>

          </div>

          <p className="mt-5 text-gray-600">
            Verify
            <strong> {user.name}</strong>
            ?
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
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-2"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default VerifyUserModal;