const NotificationHeader = ({
    unreadCount,
    onMarkAllRead,
}) => {

    return (

        <div className="flex justify-between items-center mb-5">

            <div>

                <h2 className="text-2xl font-bold">

                    Notifications

                </h2>

                <p className="text-gray-500">

                    {unreadCount} Unread

                </p>

            </div>

            <button
                onClick={onMarkAllRead}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >

                Mark All Read

            </button>

        </div>

    );

};

export default NotificationHeader;