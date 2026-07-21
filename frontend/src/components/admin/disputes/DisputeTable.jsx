import DisputeActions from "./DisputeActions";

const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-700";

    case "Under Review":
      return "bg-yellow-100 text-yellow-700";

    case "Resolved":
      return "bg-green-100 text-green-700";

    case "Closed":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const DisputeTable = ({
  disputes = [],
  onView,
  onResolve,
  onClose,
}) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">Dispute ID</th>

              <th className="px-6 py-4">Project</th>

              <th className="px-6 py-4">Client</th>

              <th className="px-6 py-4">Freelancer</th>

              <th className="px-6 py-4">Reason</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Created</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {disputes.length ? (
              disputes.map((dispute) => (
                <tr
                  key={dispute._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium">
                    {dispute.disputeId}
                  </td>

                  <td className="px-6 py-4">
                    {dispute.project}
                  </td>

                  <td className="px-6 py-4">
                    {dispute.client}
                  </td>

                  <td className="px-6 py-4">
                    {dispute.freelancer}
                  </td>

                  <td className="px-6 py-4">
                    {dispute.reason}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        dispute.status
                      )}`}
                    >
                      {dispute.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {dispute.createdAt}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <DisputeActions
                      dispute={dispute}
                      onView={onView}
                      onResolve={onResolve}
                      onClose={onClose}
                    />

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No disputes found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DisputeTable;