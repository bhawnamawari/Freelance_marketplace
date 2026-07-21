const EscrowCard = ({ escrow }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold">

                {escrow.project}

            </h2>

            <p className="mt-3">

                Amount : ₹ {escrow.amount}

            </p>

            <p className="mt-2">

                Milestone : {escrow.milestone}

            </p>

            <span className="mt-4 inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                {escrow.status}

            </span>

        </div>

    );

};

export default EscrowCard;