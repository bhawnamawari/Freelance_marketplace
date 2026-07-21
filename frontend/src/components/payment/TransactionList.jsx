import TransactionCard from "./TransactionCard";

const TransactionList = ({ transactions }) => {

    return (

        <div className="space-y-4">

            {transactions.map(item => (

                <TransactionCard
                    key={item._id}
                    transaction={item}
                />

            ))}

        </div>

    );

};

export default TransactionList;