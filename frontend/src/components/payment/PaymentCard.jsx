import { FaMoneyBillWave } from "react-icons/fa";

const PaymentCard = ({ payment }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between">

                <div>

                    <h2 className="font-bold text-xl">
                        {payment.project}
                    </h2>

                    <p className="text-gray-500">
                        {payment.client}
                    </p>

                </div>

                <FaMoneyBillWave
                    className="text-3xl text-green-600"
                />

            </div>

            <div className="mt-5">

                <p className="text-3xl font-bold text-green-600">

                    ₹ {payment.amount}

                </p>

            </div>

            <div className="mt-4">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                    {payment.status}

                </span>

            </div>

        </div>
    );
};

export default PaymentCard;