import { NavLink } from "react-router-dom";

const SidebarItem = ({
    icon: Icon,
    title,
    to,
}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                ${
                    isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`
            }
        >
            <Icon size={20} />
            <span>{title}</span>
        </NavLink>
    );
};

export default SidebarItem;