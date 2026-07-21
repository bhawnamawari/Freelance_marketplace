import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RevenueReport = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex justify-between items-center mb-5">

        <div>

          <h2 className="text-xl font-semibold">
            Revenue Report
          </h2>

          <p className="text-gray-500">
            Monthly platform earnings
          </p>

        </div>

      </div>

      <div className="h-96">

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RevenueReport;