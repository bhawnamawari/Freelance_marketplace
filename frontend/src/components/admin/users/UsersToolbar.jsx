import {
  FaRotate,
  FaFileExport,
  FaUserPlus,
} from "react-icons/fa6";

import UserSearch from "./UserSearch";
import UserFilter from "./UserFilter";

const UsersToolbar = ({
  search,
  role,
  status,
  onSearch,
  onRoleChange,
  onStatusChange,
  onRefresh,
  onExport,
  onAddUser,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      <div className="flex flex-col xl:flex-row gap-5 justify-between">

        <div className="flex-1">

          <UserSearch
            value={search}
            onChange={onSearch}
          />

        </div>

        <UserFilter
          role={role}
          status={status}
          onRoleChange={onRoleChange}
          onStatusChange={onStatusChange}
        />

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="px-4 py-3 rounded-xl border hover:bg-gray-50"
          >
            <FaRotate />
          </button>

          <button
            onClick={onExport}
            className="px-4 py-3 rounded-xl border hover:bg-gray-50"
          >
            <FaFileExport />
          </button>

          <button
            onClick={onAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaUserPlus />

            Add User

          </button>

        </div>

      </div>

    </div>
  );
};

export default UsersToolbar;