import {
    FaBars,
    FaSearch,
    FaBell,
} from "react-icons/fa";

import AdminProfileDropdown from "./AdminProfileDropdown";

const AdminNavbar = ({ onMenuClick }) => {
    return (
        <header className="bg-white shadow">

            <div className="h-20 px-6 flex justify-between items-center">

                <div className="flex items-center gap-4">

                    <button
                        className="lg:hidden"
                        onClick={onMenuClick}
                    >
                        <FaBars size={22} />
                    </button>

                    <div className="relative">

                        <FaSearch className="absolute left-3 top-3 text-gray-400" />

                        <input
                            placeholder="Search..."
                            className="border rounded-lg pl-10 pr-4 py-2 w-72"
                        />

                    </div>

                </div>

                <div className="flex items-center gap-6">

                    <button className="relative">

                        <FaBell size={22} />

                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                            3
                        </span>

                    </button>

                    <AdminProfileDropdown />

                </div>

            </div>

        </header>
    );
};

export default AdminNavbar;