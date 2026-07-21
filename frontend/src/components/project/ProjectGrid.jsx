import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project) => (

                <ProjectCard
                    key={project._id}
                    project={project}
                />

            ))}

        </div>
    );
};

export default ProjectGrid;