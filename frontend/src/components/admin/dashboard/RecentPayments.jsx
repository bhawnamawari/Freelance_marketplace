import { FaMoneyBillWave } from "react-icons/fa";

const statusColor = {
  Released: "text-green-600",
  Pending: "text-orange-500",
  Escrow: "text-blue-600",
  Refunded: "text-red-600",
};

const RecentPayments = ({ payments = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

      <div className="flex justify-between items-center p-6 border-b">

        <h2 className="text-xl font-semibold">
          Recent Payments
        </h2>

        <button className="text-blue-600">
          View All
        </button>

      </div>

      <div className="divide-y">

        {payments.map((payment) => (

          <div
            key={payment._id}
            className="flex justify-between items-center p-5"
          >

            <div className="flex items-center gap-4">

              <div className="bg-blue-100 p-3 rounded-full">

                <FaMoneyBillWave className="text-blue-600" />

              </div>

              <div>

                <h3 className="font-semibold">
                  {payment.transactionId}
                </h3>

                <p className="text-sm text-gray-500">
                  {payment.project}
                </p>

              </div>

            </div>

            <div className="text-right">

              <h3 className="font-bold">
                ₹{payment.amount}
              </h3>

              <span
                className={`text-sm ${
                  statusColor[payment.status]
                }`}
              >
                {payment.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentPayments;