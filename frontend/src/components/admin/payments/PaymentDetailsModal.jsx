import { FaXmark } from "react-icons/fa6";

const PaymentDetailsModal = ({
  open,
  payment,
  onClose,
}) => {
  if (!open || !payment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5">

      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Payment Details
            </h2>

            <p className="text-gray-500 mt-1">
              Transaction ID : {payment.transactionId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <FaXmark size={22} />
          </button>

        </div>

        <div className="p-6 space-y-8">

          {/* Payment Information */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Payment Information
              </h3>

              <div className="space-y-3">

                <p><strong>Amount:</strong> ₹{payment.amount}</p>

                <p><strong>Status:</strong> {payment.status}</p>

                <p><strong>Method:</strong> {payment.method}</p>

                <p><strong>Date:</strong> {payment.date}</p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Project Information
              </h3>

              <div className="space-y-3">

                <p><strong>Project:</strong> {payment.project}</p>

                <p><strong>Client:</strong> {payment.client}</p>

                <p><strong>Freelancer:</strong> {payment.freelancer}</p>

              </div>

            </div>

          </div>

          {/* Payment Summary */}

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-green-50 rounded-xl p-5">

              <p className="text-gray-500">
                Total Paid
              </p>

              <h2 className="text-2xl font-bold">
                ₹{payment.amount}
              </h2>

            </div>

            <div className="bg-blue-50 rounded-xl p-5">

              <p className="text-gray-500">
                Platform Fee
              </p>

              <h2 className="text-2xl font-bold">
                ₹{payment.platformFee}
              </h2>

            </div>

            <div className="bg-yellow-50 rounded-xl p-5">

              <p className="text-gray-500">
                Freelancer Receives
              </p>

              <h2 className="text-2xl font-bold">
                ₹{payment.freelancerAmount}
              </h2>

            </div>

          </div>

          {/* Milestones */}

          <div>

            <h3 className="font-semibold mb-4">
              Milestones
            </h3>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left p-3">Milestone</th>

                    <th className="text-left p-3">Amount</th>

                    <th className="text-left p-3">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {payment.milestones?.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b"
                    >

                      <td className="p-3">
                        {item.title}
                      </td>

                      <td className="p-3">
                        ₹{item.amount}
                      </td>

                      <td className="p-3">
                        {item.status}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Timeline */}

          <div>

            <h3 className="font-semibold mb-4">
              Payment Timeline
            </h3>

            <div className="space-y-4">

              {payment.timeline?.map((event) => (

                <div
                  key={event._id}
                  className="border-l-4 border-blue-500 pl-4"
                >

                  <h4 className="font-semibold">
                    {event.title}
                  </h4>

                  <p className="text-gray-500">
                    {event.date}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentDetailsModal;