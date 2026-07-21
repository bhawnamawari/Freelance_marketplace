import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import RevenueChart from "./RevenueChart";
import UserGrowthChart from "./UserGrowthChart";
import ProjectStatusChart from "./ProjectStatusChart";
import EarningsChart from "./EarningsChart";
import RecentUsers from "./RecentUsers";
import RecentProjects from "./RecentProjects";
import RecentPayments from "./RecentPayments";
import RecentDisputes from "./RecentDisputes";
import ActivityTimeline from "./ActivityTimeline";
import QuickActions from "./QuickActions";

const DashboardOverview = ({
  admin,
  stats,
  revenueData,
  growthData,
  projectStatusData,
  earningsData,
  users,
  projects,
  payments,
  disputes,
  activities,
  onRefresh,
}) => {
  return (
    <div className="space-y-6">

      <DashboardHeader
        admin={admin}
        onRefresh={onRefresh}
      />

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <RevenueChart data={revenueData} />
        </div>

        <ProjectStatusChart
          data={projectStatusData}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <UserGrowthChart
          data={growthData}
        />

        <EarningsChart
          data={earningsData}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentUsers users={users} />

        <RecentProjects
          projects={projects}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentPayments
          payments={payments}
        />

        <RecentDisputes
          disputes={disputes}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">

          <ActivityTimeline
            activities={activities}
          />

        </div>

        <QuickActions />

      </div>

    </div>
  );
};

export default DashboardOverview;