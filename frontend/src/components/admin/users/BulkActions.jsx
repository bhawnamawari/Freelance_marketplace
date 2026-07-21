import {
  FaCheck,
  FaBan,
  FaTrash,
  FaFileExport,
} from "react-icons/fa6";

const BulkActions = ({
  selectedCount,
  onVerify,
  onSuspend,
  onDelete,
  onExport,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4">

      <h3 className="font-semibold text-blue-700">
        {selectedCount} user(s) selected
      </h3>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={onVerify}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
        >
          <FaCheck />
          Verify
        </button>

        <button
          onClick={onSuspend}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-2"
        >
          <FaBan />
          Suspend
        </button>

        <button
          onClick={onExport}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
        >
          <FaFileExport />
          Export
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
        >
          <FaTrash />
          Delete
        </button>

        <button
          onClick={onClearSelection}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100"
        >
          Clear
        </button>

      </div>

    </div>
  );
};

export default BulkActions;