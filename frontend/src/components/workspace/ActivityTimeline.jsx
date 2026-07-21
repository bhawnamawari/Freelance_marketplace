const ActivityTimeline = ({ activities }) => {

    return (

        <div className="space-y-4">

            {activities.map((item) => (

                <div key={item._id} className="border-l-2 border-blue-600 pl-4">

                    <h4 className="font-semibold">
                        {item.title}
                    </h4>

                    <p className="text-gray-500">
                        {item.date}
                    </p>

                </div>

            ))}

        </div>

    );

};

export default ActivityTimeline;