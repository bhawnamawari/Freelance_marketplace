import { FaUsersSlash } from "react-icons/fa6";

const EmptyUsers = ({
  title = "No Users Found",
  subtitle = "There are currently no users available.",
  action,
  actionText = "Refresh",
}) => {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12">

      <div className="flex flex-col items-center text-center">

        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">

          <FaUsersSlash
            size={45}
            className="text-gray-400"
          />

        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="mt-2 text-gray-500 max-w-md">
          {subtitle}
        </p>

        {action && (
          <button
            onClick={action}
            className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            {actionText}
          </button>
        )}

      </div>

    </div>
  );
};

export default EmptyUsers;