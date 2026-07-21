import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const UsersReport = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Users Report
        </h2>

        <p className="text-gray-500">
          Monthly user registrations
        </p>
      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="users"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default UsersReport;