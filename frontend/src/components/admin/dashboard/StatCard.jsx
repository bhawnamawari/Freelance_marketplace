import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  change,
  isPositive = true,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {value}
          </h2>

          {change && (
            <div
              className={`flex items-center gap-1 mt-3 text-sm font-medium ${
                isPositive
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {isPositive ? (
                <FaArrowTrendUp />
              ) : (
                <FaArrowTrendDown />
              )}

              <span>{change}</span>
            </div>
          )}

        </div>

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-white ${color}`}
        >
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
};

export default StatCard;