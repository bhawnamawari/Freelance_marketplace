import {
  FaRotate,
  FaFileExport,
} from "react-icons/fa6";

import PaymentSearch from "./PaymentSearch";
import PaymentFilter from "./PaymentFilter";

const PaymentToolbar = ({
  search,
  status,
  method,
  date,

  onSearch,
  onStatusChange,
  onMethodChange,
  onDateChange,

  onRefresh,
  onExport,
}) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5">

      <div className="flex flex-col xl:flex-row gap-5 justify-between">

        {/* Search */}

        <div className="flex-1">

          <PaymentSearch
            value={search}
            onChange={onSearch}
          />

        </div>

        {/* Filters */}

        <PaymentFilter
          status={status}
          method={method}
          date={date}
          onStatusChange={onStatusChange}
          onMethodChange={onMethodChange}
          onDateChange={onDateChange}
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
            title="Export Payments"
          >
            <FaFileExport />
          </button>

        </div>

      </div>

    </div>
  );
};

export default PaymentToolbar;