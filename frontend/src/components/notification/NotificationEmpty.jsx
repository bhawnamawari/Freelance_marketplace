import { FaBellSlash } from "react-icons/fa";

const NotificationEmpty = () => {

    return (

        <div className="text-center py-10">

            <FaBellSlash
                className="mx-auto text-4xl text-gray-400"
            />

            <h3 className="mt-4 text-lg font-semibold">

                No Notifications

            </h3>

            <p className="text-gray-500">

                You're all caught up.

            </p>

        </div>

    );

};

export default NotificationEmpty;