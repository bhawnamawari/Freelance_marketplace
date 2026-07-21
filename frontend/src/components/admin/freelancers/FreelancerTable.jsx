import FreelancerActions from "./FreelancerActions";

const FreelancerTable = ({
  freelancers = [],
  onView,
  onVerify,
  onSuspend,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">Freelancer</th>

              <th className="px-6 py-4">Skills</th>

              <th className="px-6 py-4">Rating</th>

              <th className="px-6 py-4">Projects</th>

              <th className="px-6 py-4">Earnings</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Joined</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {freelancers.length > 0 ? (

              freelancers.map((freelancer) => (

                <tr
                  key={freelancer._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {freelancer.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {freelancer.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex flex-wrap gap-2">

                      {freelancer.skills
                        ?.slice(0, 3)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    ⭐ {freelancer.rating}

                  </td>

                  <td className="px-6 py-4">

                    {freelancer.completedProjects}

                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">

                    ₹{freelancer.earnings}

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        freelancer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : freelancer.status === "Suspended"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {freelancer.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {freelancer.joinedAt}

                  </td>

                  <td className="px-6 py-4 text-center">

                    <FreelancerActions
                      freelancer={freelancer}
                      onView={onView}
                      onVerify={onVerify}
                      onSuspend={onSuspend}
                      onDelete={onDelete}
                    />

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No freelancers found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default FreelancerTable;