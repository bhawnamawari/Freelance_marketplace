import {
    FaChartPie,
    FaUsers,
    FaBriefcase,
    FaWallet,
    FaGavel,
    FaBell,
    FaCog,
} from "react-icons/fa";

import SidebarItem from "./SidebarItem";

const AdminSidebar = () => {
    return (
        <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-slate-900 flex-col">

            <div className="h-20 flex items-center justify-center border-b border-slate-700">

                <h1 className="text-2xl font-bold text-white">
                    Freelance Admin
                </h1>

            </div>

            <nav className="flex-1 p-5 space-y-2">

                <SidebarItem
                    icon={FaChartPie}
                    title="Dashboard"
                    to="/admin"
                />

                <SidebarItem
                    icon={FaUsers}
                    title="Users"
                    to="/admin/users"
                />

                <SidebarItem
                    icon={FaBriefcase}
                    title="Projects"
                    to="/admin/projects"
                />

                <SidebarItem
                    icon={FaWallet}
                    title="Payments"
                    to="/admin/payments"
                />

                <SidebarItem
                    icon={FaGavel}
                    title="Disputes"
                    to="/admin/disputes"
                />

                <SidebarItem
                    icon={FaBell}
                    title="Notifications"
                    to="/admin/notifications"
                />

                <SidebarItem
                    icon={FaCog}
                    title="Settings"
                    to="/admin/settings"
                />

            </nav>

        </aside>
    );
};

export default AdminSidebar;