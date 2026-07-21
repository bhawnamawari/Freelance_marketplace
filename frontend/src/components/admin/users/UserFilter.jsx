const UserFilter = ({
  role,
  status,
  onRoleChange,
  onStatusChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4">

      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >

        <option value="">All Roles</option>
        <option value="Admin">Admin</option>
        <option value="Client">Client</option>
        <option value="Freelancer">Freelancer</option>

      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >

        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Verified">Verified</option>
        <option value="Pending">Pending</option>
        <option value="Suspended">Suspended</option>
        <option value="Banned">Banned</option>

      </select>

    </div>
  );
};

export default UserFilter;