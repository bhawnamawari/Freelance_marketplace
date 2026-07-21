const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Verified: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Suspended: "bg-orange-100 text-orange-700",
  Banned: "bg-red-100 text-red-700",
  Inactive: "bg-gray-100 text-gray-700",
};

const UserStatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] || statusStyles.Inactive
      }`}
    >
      {status}
    </span>
  );
};

export default UserStatusBadge;