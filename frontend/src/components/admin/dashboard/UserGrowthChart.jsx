import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const UserGrowthChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-xl font-semibold mb-6">
        User Growth
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Area
            type="monotone"
            dataKey="clients"
            fill="#60a5fa"
            stroke="#2563eb"
          />

          <Area
            type="monotone"
            dataKey="freelancers"
            fill="#4ade80"
            stroke="#16a34a"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default UserGrowthChart;