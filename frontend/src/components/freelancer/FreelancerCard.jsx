import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const FreelancerCard = ({ freelancer }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

            <div className="flex items-center gap-4">

                <img
                    src={freelancer.profileImage}
                    alt={freelancer.name}
                    className="w-20 h-20 rounded-full object-cover"
                />

                <div>

                    <h2 className="text-xl font-bold">
                        {freelancer.name}
                    </h2>

                    <p className="text-gray-500">
                        {freelancer.title}
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <FaStar className="text-yellow-500"/>

                        <span>
                            {freelancer.rating}
                        </span>

                    </div>

                </div>

            </div>

            <p className="mt-4 text-gray-600 line-clamp-3">
                {freelancer.bio}
            </p>

            <div className="flex justify-between mt-6">

                <div className="flex items-center gap-2">

                    <FaMapMarkerAlt/>

                    {freelancer.location}

                </div>

                <span className="font-bold text-green-600">

                    ₹{freelancer.hourlyRate}/hr

                </span>

            </div>

            <Link
                to={`/freelancers/${freelancer._id}`}
                className="block mt-6 text-center bg-blue-600 text-white py-3 rounded-lg"
            >
                View Profile
            </Link>

        </div>
    );
};

export default FreelancerCard;