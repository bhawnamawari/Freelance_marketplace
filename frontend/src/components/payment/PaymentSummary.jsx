const PaymentSummary = ({ summary }) => {

    return (

        <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white shadow rounded-xl p-6">

                <h3>Total Earnings</h3>

                <h2 className="text-3xl font-bold">

                    ₹ {summary.total}

                </h2>

            </div>

            <div className="bg-white shadow rounded-xl p-6">

                <h3>Pending</h3>

                <h2 className="text-3xl font-bold">

                    ₹ {summary.pending}

                </h2>

            </div>

            <div className="bg-white shadow rounded-xl p-6">

                <h3>Released</h3>

                <h2 className="text-3xl font-bold">

                    ₹ {summary.released}

                </h2>

            </div>

            <div className="bg-white shadow rounded-xl p-6">

                <h3>Withdrawn</h3>

                <h2 className="text-3xl font-bold">

                    ₹ {summary.withdrawn}

                </h2>

            </div>

        </div>

    );

};

export default PaymentSummary;