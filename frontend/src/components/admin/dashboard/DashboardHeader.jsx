import { FaArrowsRotate } from "react-icons/fa6";

const DashboardHeader = ({
  admin,
  onRefresh,
}) => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">

            Welcome back,
            <span className="text-blue-600">
              {" "}
              {admin?.name || "Admin"}
            </span>

          </h1>

          <p className="text-gray-500 mt-2">
            {today}
          </p>

        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          <FaArrowsRotate />

          Refresh Dashboard

        </button>

      </div>

    </div>
  );
};

export default DashboardHeader;