import { FaTriangleExclamation } from "react-icons/fa6";

const RecentDisputes = ({ disputes = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

      <div className="flex justify-between p-6 border-b">

        <h2 className="text-xl font-semibold">
          Recent Disputes
        </h2>

        <button className="text-blue-600">
          View All
        </button>

      </div>

      <div className="divide-y">

        {disputes.map((item) => (

          <div
            key={item._id}
            className="flex justify-between p-5"
          >

            <div className="flex gap-4">

              <FaTriangleExclamation
                className="text-red-500 mt-1"
              />

              <div>

                <h3 className="font-semibold">
                  {item.project}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.client} vs {item.freelancer}
                </p>

              </div>

            </div>

            <span className="text-sm font-medium text-red-600">
              {item.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentDisputes;