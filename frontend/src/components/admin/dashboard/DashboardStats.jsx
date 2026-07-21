import {
  FaUsers,
  FaUserTie,
  FaBriefcase,
  FaWallet,
  FaHandshake,
  FaMoneyCheckDollar,
  FaTriangleExclamation,
  FaChartLine,
} from "react-icons/fa6";

import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        icon={FaUsers}
        color="bg-blue-500"
        change="+8.2%"
      />

      <StatCard
        title="Freelancers"
        value={stats.freelancers}
        icon={FaUserTie}
        color="bg-green-500"
        change="+12%"
      />

      <StatCard
        title="Projects"
        value={stats.projects}
        icon={FaBriefcase}
        color="bg-purple-500"
        change="+5%"
      />

      <StatCard
        title="Revenue"
        value={`₹${stats.revenue}`}
        icon={FaWallet}
        color="bg-yellow-500"
        change="+15%"
      />

      <StatCard
        title="Escrow"
        value={`₹${stats.escrow}`}
        icon={FaHandshake}
        color="bg-cyan-500"
        change="+7%"
      />

      <StatCard
        title="Withdrawals"
        value={stats.withdrawals}
        icon={FaMoneyCheckDollar}
        color="bg-indigo-500"
        change="-2%"
        isPositive={false}
      />

      <StatCard
        title="Open Disputes"
        value={stats.disputes}
        icon={FaTriangleExclamation}
        color="bg-red-500"
        change="+1"
        isPositive={false}
      />

      <StatCard
        title="Growth"
        value={`${stats.growth}%`}
        icon={FaChartLine}
        color="bg-emerald-500"
        change="+18%"
      />

    </div>
  );
};

export default DashboardStats;