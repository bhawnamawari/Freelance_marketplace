const NotificationCard = ({ notification }) => {

    return (

        <div
            className={`rounded-lg shadow p-5 ${
                notification.read
                    ? "bg-white"
                    : "bg-blue-50"
            }`}
        >

            <h3 className="font-bold">

                {notification.title}

            </h3>

            <p className="mt-2 text-gray-600">

                {notification.message}

            </p>

            <small className="text-gray-400">

                {notification.createdAt}

            </small>

        </div>

    );

};

export default NotificationCard;