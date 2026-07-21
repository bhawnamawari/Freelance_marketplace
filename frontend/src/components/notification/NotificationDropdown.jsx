import NotificationList from "./NotificationList";

const NotificationDropdown = ({
    notifications,
    open,
    onClose,
}) => {

    if (!open) return null;

    return (

        <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-xl border z-50">

            <div className="flex justify-between items-center p-4 border-b">

                <h2 className="font-bold text-lg">

                    Notifications

                </h2>

                <button
                    onClick={onClose}
                    className="text-gray-500"
                >
                    ✕
                </button>

            </div>

            <NotificationList notifications={notifications} />

        </div>

    );

};

export default NotificationDropdown;