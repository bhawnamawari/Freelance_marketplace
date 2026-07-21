import {
  FaEnvelope,
  FaBriefcase,
  FaWallet,
  FaCalendarAlt,
} from "react-icons/fa";

import UserAvatar from "./UserAvatar";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

const UserCard = ({
  user,
  onView,
  onVerify,
  onSuspend,
  onBan,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          <UserAvatar
            avatar={user.avatar}
            name={user.name}
            online={user.online}
            verified={user.verified}
          />

          <div>

            <h3 className="text-lg font-semibold">
              {user.name}
            </h3>

            <p className="text-sm text-gray-500">
              {user.role}
            </p>

          </div>

        </div>

        <UserActions
          onView={() => onView(user)}
          onVerify={() => onVerify(user)}
          onSuspend={() => onSuspend(user)}
          onBan={() => onBan(user)}
          onDelete={() => onDelete(user)}
        />

      </div>

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex items-center gap-2">
          <FaEnvelope className="text-gray-500" />
          {user.email}
        </div>

        <div className="flex items-center gap-2">
          <FaBriefcase className="text-gray-500" />
          {user.projects} Projects
        </div>

        <div className="flex items-center gap-2">
          <FaWallet className="text-gray-500" />
          ₹{user.earnings}
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-gray-500" />
          Joined {user.joinedAt}
        </div>

      </div>

      <div className="mt-5">

        <UserStatusBadge status={user.status} />

      </div>

    </div>
  );
};

export default UserCard;