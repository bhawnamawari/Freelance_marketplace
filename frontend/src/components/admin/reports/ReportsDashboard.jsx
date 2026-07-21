import RevenueReport from "./RevenueReport";
import UsersReport from "./UsersReport";
import ProjectsReport from "./ProjectsReport";
import PaymentsReport from "./PaymentsReport";

const ReportsDashboard = ({
  revenue,
  users,
  projects,
  payments,
}) => {
  return (
    <div className="space-y-6">

      <RevenueReport data={revenue} />

      <UsersReport data={users} />

      <ProjectsReport data={projects} />

      <PaymentsReport data={payments} />

    </div>
  );
};

export default ReportsDashboard;