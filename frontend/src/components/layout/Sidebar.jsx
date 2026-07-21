import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaClipboardList,
    FaBriefcase,
    FaWallet,
    FaCog,
} from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-slate-900 text-white p-5">

            <h1 className="text-2xl font-bold mb-10">
                Dashboard
            </h1>

            <div className="space-y-5">

                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-3"
                >
                    <FaHome />
                    Home
                </NavLink>

                <NavLink
                    to="/dashboard/projects"
                    className="flex items-center gap-3"
                >
                    <FaClipboardList />
                    Projects
                </NavLink>

                <NavLink
                    to="/dashboard/tasks"
                    className="flex items-center gap-3"
                >
                    <FaBriefcase />
                    Tasks
                </NavLink>

                <NavLink
                    to="/dashboard/payments"
                    className="flex items-center gap-3"
                >
                    <FaWallet />
                    Payments
                </NavLink>

                <NavLink
                    to="/dashboard/settings"
                    className="flex items-center gap-3"
                >
                    <FaCog />
                    Settings
                </NavLink>

            </div>

        </aside>
    );
};

export default Sidebar;