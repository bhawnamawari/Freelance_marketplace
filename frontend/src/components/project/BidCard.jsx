const BidCard = ({ bid }) => {

    return (

        <div className="bg-white shadow rounded-lg p-5">

            <h3 className="font-bold">

                {bid.freelancerName}

            </h3>

            <p className="mt-3 text-gray-600">

                {bid.proposal}

            </p>

            <div className="flex justify-between mt-5">

                <span>

                    ₹ {bid.amount}

                </span>

                <span>

                    {bid.days} Days

                </span>

            </div>

        </div>

    );

};

export default BidCard;