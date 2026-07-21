import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const PaymentsReport = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <div className="mb-5">

        <h2 className="text-xl font-semibold">
          Payments Report
        </h2>

        <p className="text-gray-500">
          Payment trends
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              fill="#10b98133"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default PaymentsReport;