import UserAvatar from "./UserAvatar";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

const UserRow = ({
  user,
  onView,
  onVerify,
  onSuspend,
  onBan,
  onDelete,
}) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">

      <td className="px-6 py-4">
        <UserAvatar
          avatar={user.avatar}
          name={user.name}
          verified={user.verified}
          online={user.online}
        />
      </td>

      <td className="px-6 py-4">
        <div>

          <h3 className="font-semibold">
            {user.name}
          </h3>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

        </div>
      </td>

      <td className="px-6 py-4">
        {user.role}
      </td>

      <td className="px-6 py-4">
        <UserStatusBadge status={user.status} />
      </td>

      <td className="px-6 py-4">
        {user.projects}
      </td>

      <td className="px-6 py-4">
        ₹{user.earnings}
      </td>

      <td className="px-6 py-4">
        {user.joinedAt}
      </td>

      <td className="px-6 py-4">
        <UserActions
          onView={() => onView(user)}
          onVerify={() => onVerify(user)}
          onSuspend={() => onSuspend(user)}
          onBan={() => onBan(user)}
          onDelete={() => onDelete(user)}
        />
      </td>

    </tr>
  );
};

export default UserRow;