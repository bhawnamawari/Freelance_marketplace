const FreelancerCard = ({ freelancer }) => {

    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <img
                src={freelancer.image}
                alt=""
                className="w-20 h-20 rounded-full mx-auto"
            />

            <h3 className="text-xl font-bold text-center mt-4">

                {freelancer.name}

            </h3>

            <p className="text-center text-gray-500">

                {freelancer.skill}

            </p>

            <button className="w-full mt-5 bg-blue-600 text-white py-2 rounded">

                View Profile

            </button>

        </div>

    );

};

export default FreelancerCard;