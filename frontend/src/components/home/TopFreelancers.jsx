import FreelancerCard from "./FreelancerCard";

const freelancers = [

    {
        name: "John",
        skill: "React Developer",
        image: "/user.png",
    },

    {
        name: "Sarah",
        skill: "UI Designer",
        image: "/user.png",
    },

    {
        name: "Alex",
        skill: "Node Developer",
        image: "/user.png",
    },

];

const TopFreelancers = () => {

    return (

        <section className="py-20 max-w-7xl mx-auto">

            <h2 className="text-4xl font-bold text-center">

                Top Freelancers

            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-12">

                {freelancers.map((item, index) => (

                    <FreelancerCard
                        key={index}
                        freelancer={item}
                    />

                ))}

            </div>

        </section>

    );

};

export default TopFreelancers;