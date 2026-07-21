import { FaEye } from "react-icons/fa6";

const RecentUsers = ({ users = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

      <div className="flex items-center justify-between p-6 border-b">

        <h2 className="text-xl font-semibold">
          Recent Users
        </h2>

        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>

      </div>

      <div className="divide-y">

        {users.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No users found.
          </div>

        ) : (

          users.map((user) => (

            <div
              key={user._id}
              className="flex items-center justify-between p-5 hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>

                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {user.role}
                  </span>

                </div>

              </div>

              <button className="text-blue-600 hover:text-blue-800">
                <FaEye />
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default RecentUsers;