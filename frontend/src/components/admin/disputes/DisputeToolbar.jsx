import {
  FaRotate,
  FaFileExport,
} from "react-icons/fa6";

import DisputeSearch from "./DisputeSearch";
import DisputeFilter from "./DisputeFilter";

const DisputeToolbar = ({
  search,
  status,
  priority,

  onSearch,
  onStatusChange,
  onPriorityChange,

  onRefresh,
  onExport,
}) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="flex flex-col xl:flex-row gap-5 justify-between">

        {/* Search */}

        <div className="flex-1">

          <DisputeSearch
            value={search}
            onChange={onSearch}
          />

        </div>

        {/* Filters */}

        <DisputeFilter
          status={status}
          priority={priority}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
        />

        {/* Actions */}

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-xl px-4 hover:bg-gray-100 transition"
            title="Refresh"
          >
            <FaRotate />
          </button>

          <button
            onClick={onExport}
            className="border rounded-xl px-4 hover:bg-gray-100 transition"
            title="Export"
          >
            <FaFileExport />
          </button>

        </div>

      </div>

    </div>
  );
};

export default DisputeToolbar;