import { FaXmark } from "react-icons/fa6";

const ProjectDetailsModal = ({
  open,
  project,
  onClose,
}) => {
  if (!open || !project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5">

      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              {project.title}
            </h2>

            <p className="text-gray-500 mt-1">
              {project.category}
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <FaXmark size={22} />
          </button>

        </div>

        <div className="p-6 space-y-8">

          {/* Project Information */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Project Information
              </h3>

              <div className="space-y-3">

                <p><strong>Title:</strong> {project.title}</p>

                <p><strong>Category:</strong> {project.category}</p>

                <p><strong>Status:</strong> {project.status}</p>

                <p><strong>Budget:</strong> ₹{project.budget}</p>

                <p><strong>Deadline:</strong> {project.deadline}</p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Client & Freelancer
              </h3>

              <div className="space-y-3">

                <p><strong>Client:</strong> {project.client}</p>

                <p><strong>Freelancer:</strong> {project.freelancer || "-"}</p>

                <p><strong>Created:</strong> {project.createdAt}</p>

                <p><strong>Updated:</strong> {project.updatedAt}</p>

              </div>

            </div>

          </div>

          {/* Description */}

          <div>

            <h3 className="font-semibold mb-3">
              Description
            </h3>

            <div className="bg-gray-50 rounded-xl p-5">
              {project.description}
            </div>

          </div>

          {/* Skills */}

          <div>

            <h3 className="font-semibold mb-3">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {project.skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

          {/* Milestones */}

          <div>

            <h3 className="font-semibold mb-4">
              Milestones
            </h3>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left p-3">Title</th>

                    <th className="text-left p-3">Amount</th>

                    <th className="text-left p-3">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {project.milestones?.map((milestone) => (

                    <tr
                      key={milestone._id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {milestone.title}
                      </td>

                      <td className="p-3">
                        ₹{milestone.amount}
                      </td>

                      <td className="p-3">
                        {milestone.status}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Attachments */}

          <div>

            <h3 className="font-semibold mb-4">
              Attachments
            </h3>

            <div className="space-y-3">

              {project.attachments?.length ? (
                project.attachments.map((file) => (
                  <a
                    key={file._id}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    {file.name}
                  </a>
                ))
              ) : (
                <p className="text-gray-500">
                  No attachments.
                </p>
              )}

            </div>

          </div>

          {/* Payment Summary */}

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-green-50 rounded-xl p-5">

              <p className="text-gray-500">
                Total Budget
              </p>

              <h2 className="text-2xl font-bold">
                ₹{project.budget}
              </h2>

            </div>

            <div className="bg-yellow-50 rounded-xl p-5">

              <p className="text-gray-500">
                Released
              </p>

              <h2 className="text-2xl font-bold">
                ₹{project.releasedAmount}
              </h2>

            </div>

            <div className="bg-red-50 rounded-xl p-5">

              <p className="text-gray-500">
                Remaining
              </p>

              <h2 className="text-2xl font-bold">
                ₹{project.remainingAmount}
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProjectDetailsModal;