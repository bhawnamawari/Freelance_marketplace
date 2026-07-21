import CategoryCard from "./CategoryCard";

const categories = [

    {
        title: "Web Development",
        jobs: 234,
    },

    {
        title: "Graphic Design",
        jobs: 120,
    },

    {
        title: "Content Writing",
        jobs: 310,
    },

    {
        title: "AI & ML",
        jobs: 80,
    },

    {
        title: "Digital Marketing",
        jobs: 155,
    },

    {
        title: "Mobile Apps",
        jobs: 210,
    },

];

const Categories = () => {

    return (

        <section className="py-20 max-w-7xl mx-auto">

            <h2 className="text-4xl font-bold text-center">

                Popular Categories

            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">

                {categories.map((cat) => (

                    <CategoryCard
                        key={cat.title}
                        {...cat}
                    />

                ))}

            </div>

        </section>

    );

};

export default Categories;