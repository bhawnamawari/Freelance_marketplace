const MilestoneCard = ({ milestone }) => {

    return (

        <div className="border rounded-lg p-5">

            <h3 className="font-bold">

                {milestone.title}

            </h3>

            <p className="mt-2">

                ₹ {milestone.amount}

            </p>

            <span className="text-sm text-green-600">

                {milestone.status}

            </span>

        </div>

    );

};

export default MilestoneCard;