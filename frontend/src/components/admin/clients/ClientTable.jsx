import ClientActions from "./ClientActions";

const ClientTable = ({
  clients = [],
  onView,
  onActivate,
  onSuspend,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr className="text-left text-sm font-semibold text-gray-700">

              <th className="px-6 py-4">Client</th>

              <th className="px-6 py-4">Company</th>

              <th className="px-6 py-4">Projects</th>

              <th className="px-6 py-4">Total Spent</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Joined</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {clients.length ? (
              clients.map((client) => (
                <tr
                  key={client._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-4">

                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>

                        <h3 className="font-semibold">
                          {client.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {client.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {client.company || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {client.projectsPosted}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{client.totalSpent}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        client.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : client.status === "Suspended"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {client.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">
                    {client.joinedAt}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <ClientActions
                      client={client}
                      onView={onView}
                      onActivate={onActivate}
                      onSuspend={onSuspend}
                      onDelete={onDelete}
                    />

                  </td>

                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No clients found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ClientTable;