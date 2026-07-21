import {
  FaBan,
  FaXmark,
} from "react-icons/fa6";

const BanUserModal = ({
  open,
  user,
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-md">

        <div className="flex justify-between items-center p-6 border-b">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">

              <FaBan className="text-red-600 text-xl" />

            </div>

            <h2 className="text-xl font-semibold">
              Ban User
            </h2>

          </div>

          <button onClick={onClose}>
            <FaXmark size={20} />
          </button>

        </div>

        <div className="p-6">

          <p className="text-gray-600">
            Are you sure you want to permanently ban
            <span className="font-semibold">
              {" "}{user.name}
            </span>
            ?
          </p>

        </div>

        <div className="flex justify-end gap-3 p-6 border-t">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onConfirm(user)}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Banning..." : "Ban User"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default BanUserModal;