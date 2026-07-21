import PaymentActions from "./PaymentActions";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Escrow":
      return "bg-blue-100 text-blue-700";

    case "Refunded":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PaymentTable = ({
  payments = [],
  onView,
  onRelease,
  onRefund,
}) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">Transaction ID</th>

              <th className="px-6 py-4">Project</th>

              <th className="px-6 py-4">Client</th>

              <th className="px-6 py-4">Freelancer</th>

              <th className="px-6 py-4">Amount</th>

              <th className="px-6 py-4">Method</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Date</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.length ? (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {payment.transactionId}
                  </td>

                  <td className="px-6 py-4">
                    {payment.project}
                  </td>

                  <td className="px-6 py-4">
                    {payment.client}
                  </td>

                  <td className="px-6 py-4">
                    {payment.freelancer}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{payment.amount}
                  </td>

                  <td className="px-6 py-4">
                    {payment.method}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {payment.date}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <PaymentActions
                      payment={payment}
                      onView={onView}
                      onRelease={onRelease}
                      onRefund={onRefund}
                    />

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={9}
                  className="py-10 text-center text-gray-500"
                >
                  No payments found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PaymentTable;