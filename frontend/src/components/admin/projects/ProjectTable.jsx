import ProjectActions from "./ProjectActions";

const getStatusClass = (status) => {
  switch (status) {
    case "Open":
      return "bg-blue-100 text-blue-700";

    case "In Progress":
      return "bg-yellow-100 text-yellow-700";

    case "Completed":
      return "bg-green-100 text-green-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const ProjectTable = ({
  projects = [],
  onView,
  onApprove,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">Project</th>

              <th className="px-6 py-4">Client</th>

              <th className="px-6 py-4">Freelancer</th>

              <th className="px-6 py-4">Budget</th>

              <th className="px-6 py-4">Deadline</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {projects.length ? (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div>

                      <h3 className="font-semibold">
                        {project.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {project.category}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {project.client}
                  </td>

                  <td className="px-6 py-4">
                    {project.freelancer || "-"}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{project.budget}
                  </td>

                  <td className="px-6 py-4">
                    {project.deadline}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-center">

                    <ProjectActions
                      project={project}
                      onView={onView}
                      onApprove={onApprove}
                      onCancel={onCancel}
                      onDelete={onDelete}
                    />

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No projects found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProjectTable;