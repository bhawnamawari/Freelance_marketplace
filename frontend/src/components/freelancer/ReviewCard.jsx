import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {

    return (

        <div className="bg-white p-5 rounded-xl shadow">

            <div className="flex justify-between">

                <h3 className="font-bold">

                    {review.clientName}

                </h3>

                <div className="flex items-center gap-2">

                    <FaStar className="text-yellow-500"/>

                    {review.rating}

                </div>

            </div>

            <p className="mt-4 text-gray-600">

                {review.comment}

            </p>

        </div>

    );

};

export default ReviewCard;