import { useState } from "react";
import {
    FaUserCircle,
    FaUser,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

const AdminProfileDropdown = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">

            <button onClick={() => setOpen(!open)}>
                <FaUserCircle size={36} />
            </button>

            {open && (

                <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-lg">

                    <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                        <FaUser />
                        Profile
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                        <FaCog />
                        Settings
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-gray-100">
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>

            )}

        </div>
    );
};

export default AdminProfileDropdown;