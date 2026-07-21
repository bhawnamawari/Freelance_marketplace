const NotificationSettings = ({
    email,
    push,
    onChange,
}) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Notification Settings

            </h2>

            <label className="flex justify-between mb-4">

                <span>Email Notifications</span>

                <input
                    type="checkbox"
                    checked={email}
                    onChange={() => onChange("email")}
                />

            </label>

            <label className="flex justify-between">

                <span>Push Notifications</span>

                <input
                    type="checkbox"
                    checked={push}
                    onChange={() => onChange("push")}
                />

            </label>

        </div>

    );

};

export default NotificationSettings;