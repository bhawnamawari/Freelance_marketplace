import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";

const NotificationList = ({ notifications }) => {

    if (!notifications.length)
        return <NotificationEmpty />;

    return (

        <div className="max-h-96 overflow-y-auto">

            {notifications.map((item) => (

                <NotificationItem
                    key={item._id}
                    notification={item}
                />

            ))}

        </div>

    );

};

export default NotificationList;