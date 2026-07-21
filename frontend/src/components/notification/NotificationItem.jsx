import { FaCircle } from "react-icons/fa";

const NotificationItem = ({ notification }) => {

    return (

        <div className="flex gap-4 p-4 hover:bg-gray-100 cursor-pointer border-b">

            {!notification.read && (
                <FaCircle
                    className="text-blue-500 mt-2"
                    size={10}
                />
            )}

            <div className="flex-1">

                <h3 className="font-semibold">

                    {notification.title}

                </h3>

                <p className="text-gray-600 text-sm">

                    {notification.message}

                </p>

                <small className="text-gray-400">

                    {notification.createdAt}

                </small>

            </div>

        </div>

    );

};

export default NotificationItem;