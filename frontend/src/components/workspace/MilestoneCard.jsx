const MilestoneCard = ({ milestone }) => {

    return (

        <div className="border-l-4 border-green-500 bg-white p-5 rounded">

            <h3 className="font-bold">

                {milestone.title}

            </h3>

            <p>

                ₹ {milestone.amount}

            </p>

            <span className="text-green-600">

                {milestone.status}

            </span>

        </div>

    );

};

export default MilestoneCard;