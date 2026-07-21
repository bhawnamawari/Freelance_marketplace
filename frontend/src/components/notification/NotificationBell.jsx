import { FaBell } from "react-icons/fa";

const NotificationBell = ({ unreadCount, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="relative p-2 rounded-full hover:bg-gray-100"
        >
            <FaBell className="text-2xl text-gray-700" />

            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </button>
    );
};

export default NotificationBell;