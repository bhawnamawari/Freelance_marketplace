const TransactionCard = ({ transaction }) => {

    return (

        <div className="bg-white shadow rounded-xl p-5 flex justify-between">

            <div>

                <h3 className="font-bold">

                    {transaction.title}

                </h3>

                <small>

                    {transaction.date}

                </small>

            </div>

            <div className="text-right">

                <p className="font-bold">

                    ₹ {transaction.amount}

                </p>

                <span>

                    {transaction.status}

                </span>

            </div>

        </div>

    );

};

export default TransactionCard;