import { FaXmark } from "react-icons/fa6";

const FreelancerDetailsModal = ({
  open,
  freelancer,
  onClose,
}) => {
  if (!open || !freelancer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-5 overflow-auto">

      <div className="bg-white rounded-2xl w-full max-w-5xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div className="flex gap-5 items-center">

            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>

              <h2 className="text-2xl font-bold">
                {freelancer.name}
              </h2>

              <p className="text-gray-500">
                {freelancer.email}
              </p>

              <div className="flex gap-2 mt-3">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {freelancer.status}
                </span>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  ⭐ {freelancer.rating}
                </span>

              </div>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <FaXmark size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-8">

          {/* Overview */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Basic Information
              </h3>

              <div className="space-y-3">

                <p><strong>Username:</strong> {freelancer.username}</p>

                <p><strong>Country:</strong> {freelancer.country}</p>

                <p><strong>Experience:</strong> {freelancer.experience}</p>

                <p><strong>Hourly Rate:</strong> ₹{freelancer.hourlyRate}/hr</p>

                <p><strong>Joined:</strong> {freelancer.joinedAt}</p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Statistics
              </h3>

              <div className="space-y-3">

                <p><strong>Completed Projects:</strong> {freelancer.completedProjects}</p>

                <p><strong>Total Earnings:</strong> ₹{freelancer.earnings}</p>

                <p><strong>Active Contracts:</strong> {freelancer.activeContracts}</p>

                <p><strong>Completion Rate:</strong> {freelancer.completionRate}%</p>

              </div>

            </div>

          </div>

          {/* Skills */}

          <div>

            <h3 className="font-semibold mb-4">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {freelancer.skills?.map(skill => (

                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

          {/* Portfolio */}

          <div>

            <h3 className="font-semibold mb-4">
              Portfolio
            </h3>

            <div className="grid md:grid-cols-3 gap-5">

              {freelancer.portfolio?.map(item => (

                <div
                  key={item._id}
                  className="border rounded-xl overflow-hidden"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-4">

                    <h4 className="font-semibold">
                      {item.title}
                    </h4>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Recent Projects */}

          <div>

            <h3 className="font-semibold mb-4">
              Recent Projects
            </h3>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left p-3">
                      Project
                    </th>

                    <th className="text-left p-3">
                      Budget
                    </th>

                    <th className="text-left p-3">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {freelancer.projects?.map(project => (

                    <tr
                      key={project._id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {project.title}
                      </td>

                      <td className="p-3">
                        ₹{project.budget}
                      </td>

                      <td className="p-3">
                        {project.status}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FreelancerDetailsModal;