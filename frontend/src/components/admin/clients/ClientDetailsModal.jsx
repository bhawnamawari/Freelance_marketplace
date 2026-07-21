import { FaXmark } from "react-icons/fa6";

const ClientDetailsModal = ({
  open,
  client,
  onClose,
}) => {
  if (!open || !client) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-5 overflow-auto">

      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div className="flex items-center gap-5">

            <img
              src={client.avatar}
              alt={client.name}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>

              <h2 className="text-2xl font-bold">
                {client.name}
              </h2>

              <p className="text-gray-500">
                {client.email}
              </p>

              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {client.status}
              </span>

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

          {/* Basic Information */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Basic Information
              </h3>

              <div className="space-y-2">

                <p><strong>Name:</strong> {client.name}</p>

                <p><strong>Email:</strong> {client.email}</p>

                <p><strong>Phone:</strong> {client.phone}</p>

                <p><strong>Country:</strong> {client.country}</p>

                <p><strong>Joined:</strong> {client.joinedAt}</p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Company
              </h3>

              <div className="space-y-2">

                <p><strong>Company:</strong> {client.company}</p>

                <p><strong>Website:</strong> {client.website}</p>

                <p><strong>Industry:</strong> {client.industry}</p>

                <p><strong>Employees:</strong> {client.employees}</p>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid md:grid-cols-4 gap-5">

            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-gray-500">Projects Posted</p>
              <h2 className="text-2xl font-bold">
                {client.projectsPosted}
              </h2>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-gray-500">Total Spent</p>
              <h2 className="text-2xl font-bold">
                ₹{client.totalSpent}
              </h2>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5">
              <p className="text-gray-500">Active Projects</p>
              <h2 className="text-2xl font-bold">
                {client.activeProjects}
              </h2>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <p className="text-gray-500">Completed</p>
              <h2 className="text-2xl font-bold">
                {client.completedProjects}
              </h2>
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

                    <th className="text-left p-3">Title</th>

                    <th className="text-left p-3">Budget</th>

                    <th className="text-left p-3">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {client.projects?.map((project) => (

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

export default ClientDetailsModal;