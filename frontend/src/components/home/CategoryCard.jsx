const CategoryCard = ({ title, jobs }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition cursor-pointer">

            <h2 className="font-bold text-xl">

                {title}

            </h2>

            <p className="text-gray-500 mt-2">

                {jobs} Jobs

            </p>

        </div>

    );

};

export default CategoryCard;