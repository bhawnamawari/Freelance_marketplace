import Button from "../common/Button";

const ProjectDetails = ({ project }) => {

    return (

        <div className="bg-white rounded-xl shadow p-8">

            <h1 className="text-4xl font-bold">
                {project.title}
            </h1>

            <p className="mt-6 text-gray-600">
                {project.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div>
                    <strong>Budget</strong>
                    <p>₹ {project.budget}</p>
                </div>

                <div>
                    <strong>Deadline</strong>
                    <p>{project.deadline}</p>
                </div>

                <div>
                    <strong>Category</strong>
                    <p>{project.category}</p>
                </div>

                <div>
                    <strong>Experience</strong>
                    <p>{project.experience}</p>
                </div>

            </div>

            <Button className="mt-8">
                Apply Now
            </Button>

        </div>

    );

};

export default ProjectDetails;