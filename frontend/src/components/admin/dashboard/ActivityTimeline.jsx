import {
  FaUserPlus,
  FaWallet,
  FaBriefcase,
  FaTriangleExclamation,
} from "react-icons/fa6";

const iconMap = {
  user: FaUserPlus,
  payment: FaWallet,
  project: FaBriefcase,
  dispute: FaTriangleExclamation,
};

const ActivityTimeline = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Activity Timeline
      </h2>

      <div className="space-y-6">

        {activities.map((activity) => {

          const Icon = iconMap[activity.type];

          return (
            <div
              key={activity._id}
              className="flex gap-4"
            >

              <div className="bg-blue-100 p-3 rounded-full h-fit">

                <Icon className="text-blue-600" />

              </div>

              <div>

                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {activity.description}
                </p>

                <small className="text-gray-400">
                  {activity.time}
                </small>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default ActivityTimeline;