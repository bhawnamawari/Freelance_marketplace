import { FaEye } from "react-icons/fa6";

const statusColor = {
  Open: "bg-green-100 text-green-700",
  Ongoing: "bg-blue-100 text-blue-700",
  Completed: "bg-gray-100 text-gray-700",
  Cancelled: "bg-red-100 text-red-700",
};

const RecentProjects = ({ projects = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

      <div className="flex justify-between items-center p-6 border-b">

        <h2 className="text-xl font-semibold">
          Recent Projects
        </h2>

        <button className="text-blue-600">
          View All
        </button>

      </div>

      <div className="divide-y">

        {projects.map((project) => (

          <div
            key={project._id}
            className="p-5 flex justify-between items-center"
          >

            <div>

              <h3 className="font-semibold">
                {project.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {project.client}
              </p>

              <div className="flex gap-3 mt-2">

                <span className="text-sm font-medium">
                  ₹{project.budget}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusColor[project.status]
                  }`}
                >
                  {project.status}
                </span>

              </div>

            </div>

            <FaEye className="text-blue-600 cursor-pointer" />

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentProjects;