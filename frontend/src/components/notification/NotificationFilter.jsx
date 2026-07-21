const NotificationFilter = ({ value, onChange }) => {

    return (

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-lg p-2"
        >

            <option value="all">

                All

            </option>

            <option value="unread">

                Unread

            </option>

            <option value="read">

                Read

            </option>

        </select>

    );

};

export default NotificationFilter;