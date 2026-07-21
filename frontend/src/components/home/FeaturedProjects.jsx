import ProjectCard from "./ProjectCard";

const projects = [

    {
        title: "React Developer Needed",
        description: "Build an Ecommerce Website",
        budget: 25000,
    },

    {
        title: "UI Designer",
        description: "Design Landing Page",
        budget: 12000,
    },

];

const FeaturedProjects = () => {

    return (

        <section className="bg-gray-100 py-20">

            <div className="max-w-7xl mx-auto">

                <h2 className="text-4xl font-bold text-center">

                    Featured Projects

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

                    {projects.map((p, index) => (

                        <ProjectCard
                            key={index}
                            project={p}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

};

export default FeaturedProjects;