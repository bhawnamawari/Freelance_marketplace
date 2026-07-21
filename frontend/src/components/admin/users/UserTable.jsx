import UserRow from "./UserRow";

const UserTable = ({
  users = [],
  onView,
  onVerify,
  onSuspend,
  onBan,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">Avatar</th>

              <th className="px-6 py-4 text-left">User</th>

              <th className="px-6 py-4 text-left">Role</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">
                Projects
              </th>

              <th className="px-6 py-4 text-left">
                Earnings
              </th>

              <th className="px-6 py-4 text-left">
                Joined
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No users found.
                </td>

              </tr>

            ) : (

              users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  onView={onView}
                  onVerify={onVerify}
                  onSuspend={onSuspend}
                  onBan={onBan}
                  onDelete={onDelete}
                />
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserTable;