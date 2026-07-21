const ProjectCard = ({ project }) => {

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="font-bold text-xl">

                {project.title}

            </h2>

            <p className="mt-4 text-gray-500">

                {project.description}

            </p>

            <div className="mt-5 flex justify-between">

                <span>

                    ₹ {project.budget}

                </span>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">

                    View

                </button>

            </div>

        </div>

    );

};

export default ProjectCard;