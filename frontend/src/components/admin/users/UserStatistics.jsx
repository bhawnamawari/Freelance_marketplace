import {
  FaUsers,
  FaUserTie,
  FaUserShield,
  FaUserCheck,
  FaBan,
  FaUserClock,
} from "react-icons/fa6";

import StatCard from "../dashboard/StatCard";

const UserStatistics = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      <StatCard
        title="Total Users"
        value={stats.total}
        icon={FaUsers}
        color="bg-blue-500"
      />

      <StatCard
        title="Clients"
        value={stats.clients}
        icon={FaUserTie}
        color="bg-green-500"
      />

      <StatCard
        title="Freelancers"
        value={stats.freelancers}
        icon={FaUserCheck}
        color="bg-purple-500"
      />

      <StatCard
        title="Admins"
        value={stats.admins}
        icon={FaUserShield}
        color="bg-orange-500"
      />

      <StatCard
        title="Suspended"
        value={stats.suspended}
        icon={FaBan}
        color="bg-red-500"
      />

      <StatCard
        title="Pending Verification"
        value={stats.pending}
        icon={FaUserClock}
        color="bg-yellow-500"
      />

    </div>
  );
};

export default UserStatistics;