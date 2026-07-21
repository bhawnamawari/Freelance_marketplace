import {
  FaUserPlus,
  FaBullhorn,
  FaFileExport,
  FaUsers,
  FaWallet,
  FaGear,
} from "react-icons/fa6";

const actions = [
  {
    title: "Add Admin",
    icon: FaUserPlus,
    color: "bg-blue-500",
    onClick: () => {},
  },
  {
    title: "Broadcast",
    icon: FaBullhorn,
    color: "bg-green-500",
    onClick: () => {},
  },
  {
    title: "Export Report",
    icon: FaFileExport,
    color: "bg-purple-500",
    onClick: () => {},
  },
  {
    title: "Users",
    icon: FaUsers,
    color: "bg-orange-500",
    onClick: () => {},
  },
  {
    title: "Payments",
    icon: FaWallet,
    color: "bg-cyan-500",
    onClick: () => {},
  },
  {
    title: "Settings",
    icon: FaGear,
    color: "bg-slate-600",
    onClick: () => {},
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              onClick={action.onClick}
              className="border rounded-xl p-5 hover:shadow-md transition-all group"
            >

              <div
                className={`w-14 h-14 rounded-xl ${action.color}
                flex items-center justify-center text-white mx-auto`}
              >

                <Icon size={24} />

              </div>

              <p className="mt-4 font-semibold group-hover:text-blue-600">

                {action.title}

              </p>

            </button>

          );

        })}

      </div>

    </div>
  );
};

export default QuickActions;