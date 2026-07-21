import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">

            <div className="flex justify-between">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {project.category}
                </span>

                <span className="font-bold text-green-600">
                    ₹ {project.budget}
                </span>

            </div>

            <h2 className="text-2xl font-bold mt-4">
                {project.title}
            </h2>

            <p className="text-gray-500 mt-3 line-clamp-3">
                {project.description}
            </p>

            <div className="flex justify-between mt-5 text-gray-500">

                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {project.location}
                </div>

                <div className="flex items-center gap-2">
                    <FaClock />
                    {project.duration}
                </div>

            </div>

            <Link
                to={`/projects/${project._id}`}
                className="block text-center bg-blue-600 text-white mt-6 py-3 rounded-lg"
            >
                View Details
            </Link>

        </div>
    );
};

export default ProjectCard;