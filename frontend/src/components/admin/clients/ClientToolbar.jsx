import {
  FaRotate,
  FaFileExport,
  FaUserPlus,
} from "react-icons/fa6";

import ClientSearch from "./ClientSearch";
import ClientFilter from "./ClientFilter";

const ClientToolbar = ({
  search,
  status,
  company,
  country,

  onSearch,
  onStatusChange,
  onCompanyChange,
  onCountryChange,

  onRefresh,
  onExport,
  onAddClient,
}) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5">

      <div className="flex flex-col xl:flex-row gap-5 justify-between">

        {/* Search */}

        <div className="flex-1">

          <ClientSearch
            value={search}
            onChange={onSearch}
          />

        </div>

        {/* Filters */}

        <ClientFilter
          status={status}
          company={company}
          country={country}
          onStatusChange={onStatusChange}
          onCompanyChange={onCompanyChange}
          onCountryChange={onCountryChange}
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

          <button
            onClick={onAddClient}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 flex items-center gap-2 transition"
          >
            <FaUserPlus />
            Add Client
          </button>

        </div>

      </div>

    </div>
  );
};

export default ClientToolbar;