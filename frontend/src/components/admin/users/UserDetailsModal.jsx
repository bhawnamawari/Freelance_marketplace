import { useState } from "react";
import {
  FaXmark,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaCalendarDays,
  FaUserShield,
  FaBriefcase,
  FaWallet,
  FaStar,
  FaClipboardCheck,
} from "react-icons/fa6";

const tabs = [
  "Overview",
  "Projects",
  "Portfolio",
  "Reviews",
  "Wallet",
  "Reports",
  "Activity",
];

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-gray-50 rounded-xl p-4 border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="text-white text-xl" />
      </div>
    </div>
  </div>
);

const UserDetailsModal = ({ open, user, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center py-10 px-4">
        <div className="bg-white rounded-3xl w-full max-w-7xl shadow-xl">
          {/* Header */}

          <div className="border-b p-8 flex justify-between">
            <div className="flex gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
              />

              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>

                <p className="text-gray-500 mt-2">{user.role}</p>

                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {user.status}
                  </span>

                  {user.verified && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100"
            >
              <FaXmark size={22} />
            </button>
          </div>

          {/* Tabs */}

          <div className="border-b px-8">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-5 whitespace-nowrap border-b-2 transition ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}

          <div className="p-8 space-y-8">
            {activeTab === "Overview" && (
              <>
                {/* Statistics */}

                <div className="grid lg:grid-cols-4 gap-5">
                  <StatCard
                    icon={FaBriefcase}
                    title="Projects"
                    value={user.projects}
                    color="bg-blue-600"
                  />

                  <StatCard
                    icon={FaWallet}
                    title="Earnings"
                    value={`₹${user.earnings}`}
                    color="bg-green-600"
                  />

                  <StatCard
                    icon={FaStar}
                    title="Rating"
                    value={user.rating}
                    color="bg-yellow-500"
                  />

                  <StatCard
                    icon={FaClipboardCheck}
                    title="Completed"
                    value={user.completedProjects}
                    color="bg-purple-600"
                  />
                </div>

                {/* Personal Info */}

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-5">
                      Personal Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Name</span>

                        <strong>{user.name}</strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Username</span>

                        <strong>{user.username}</strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Gender</span>

                        <strong>{user.gender}</strong>
                      </div>

                      <div className="flex justify-between">
                        <span>Role</span>

                        <strong>{user.role}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-5">
                      Contact Information
                    </h3>

                    <div className="space-y-5">
                      <div className="flex gap-3">
                        <FaEnvelope className="mt-1" />

                        <div>
                          <p className="text-gray-500">Email</p>

                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <FaPhone className="mt-1" />

                        <div>
                          <p className="text-gray-500">Phone</p>

                          <p>{user.phone}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <FaLocationDot className="mt-1" />

                        <div>
                          <p className="text-gray-500">Location</p>

                          <p>{user.location}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <FaCalendarDays className="mt-1" />

                        <div>
                          <p className="text-gray-500">Joined</p>

                          <p>{user.joinedAt}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <FaUserShield className="mt-1" />

                        <div>
                          <p className="text-gray-500">Account Status</p>

                          <p>{user.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Skills */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-5">Skills</h3>

                  <div className="flex flex-wrap gap-3">
                    {user.skills?.length ? (
                      user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added.</p>
                    )}
                  </div>
                </div>
              </>
            )}
            {activeTab === "Portfolio" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Portfolio</h2>

                {user.portfolio?.length ? (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {user.portfolio.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-2xl overflow-hidden bg-white shadow-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-52 w-full object-cover"
                        />

                        <div className="p-5">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>

                          <p className="text-gray-500 mt-2">
                            {item.description}
                          </p>

                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 mt-4 inline-block"
                          >
                            View Project
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Portfolio is empty.</p>
                )}
              </div>
            )}

            {activeTab === "Projects" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Recent Projects</h2>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-4">Project</th>
                        <th className="text-left p-4">Client</th>
                        <th className="text-left p-4">Budget</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Deadline</th>
                      </tr>
                    </thead>

                    <tbody>
                      {user.projectsList?.map((project) => (
                        <tr key={project._id} className="border-b">
                          <td className="p-4">{project.title}</td>

                          <td className="p-4">{project.client}</td>

                          <td className="p-4">₹{project.budget}</td>

                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                              {project.status}
                            </span>
                          </td>

                          <td className="p-4">{project.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-5">
                    Active Contracts
                  </h3>

                  <div className="space-y-4">
                    {user.contracts?.length ? (
                      user.contracts.map((contract) => (
                        <div
                          key={contract._id}
                          className="border rounded-xl p-4 bg-white flex justify-between items-center"
                        >
                          <div>
                            <h4 className="font-semibold">{contract.title}</h4>

                            <p className="text-gray-500">{contract.client}</p>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">₹{contract.amount}</p>

                            <p className="text-sm text-blue-600">
                              {contract.status}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No active contracts.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Client Reviews</h2>

                <div className="space-y-5">
                  {user.reviews?.length ? (
                    user.reviews.map((review) => (
                      <div key={review._id} className="border rounded-2xl p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{review.client}</h3>

                            <p className="text-gray-500">{review.project}</p>
                          </div>

                          <div className="font-bold text-yellow-500">
                            ⭐ {review.rating}
                          </div>
                        </div>

                        <p className="mt-4 text-gray-600">{review.comment}</p>

                        <p className="mt-3 text-sm text-gray-400">
                          {review.date}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Wallet" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Wallet & Earnings</h2>

                <div className="grid md:grid-cols-4 gap-5">
                  <div className="bg-green-50 rounded-xl p-5 border">
                    <p className="text-gray-500">Available Balance</p>
                    <h3 className="text-3xl font-bold text-green-600">
                      ₹{user.wallet?.available || 0}
                    </h3>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5 border">
                    <p className="text-gray-500">Escrow Balance</p>
                    <h3 className="text-3xl font-bold text-blue-600">
                      ₹{user.wallet?.escrow || 0}
                    </h3>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-5 border">
                    <p className="text-gray-500">Lifetime Earnings</p>
                    <h3 className="text-3xl font-bold text-purple-600">
                      ₹{user.wallet?.lifetime || 0}
                    </h3>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-5 border">
                    <p className="text-gray-500">Withdrawn</p>
                    <h3 className="text-3xl font-bold text-orange-600">
                      ₹{user.wallet?.withdrawn || 0}
                    </h3>
                  </div>
                </div>

                <div className="bg-white border rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Transaction</th>
                        <th className="text-left p-4">Amount</th>
                        <th className="text-left p-4">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {user.wallet?.transactions?.length ? (
                        user.wallet.transactions.map((tx) => (
                          <tr key={tx._id} className="border-b">
                            <td className="p-4">{tx.date}</td>

                            <td className="p-4">{tx.title}</td>

                            <td className="p-4 font-semibold">₹{tx.amount}</td>

                            <td className="p-4">
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="text-center p-8 text-gray-500"
                          >
                            No wallet transactions.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "Reports" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Reports Against User</h2>

                {user.reports?.length ? (
                  <div className="space-y-5">
                    {user.reports.map((report) => (
                      <div
                        key={report._id}
                        className="border rounded-2xl p-6 bg-white"
                      >
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{report.reason}</h3>

                            <p className="text-gray-500">
                              Reported By : {report.reportedBy}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              report.status === "Resolved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>

                        <p className="mt-4">{report.description}</p>

                        <div className="mt-4 text-sm text-gray-400">
                          {report.date}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    No reports found.
                  </div>
                )}
              </div>
            )}
            {activeTab === "Activity" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Account Activity
                </h2>

                <div className="space-y-5">
                  {user.activities?.length ? (
                    user.activities.map((activity) => (
                      <div
                        key={activity._id}
                        className="flex gap-5 border rounded-xl p-5"
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          {activity.icon}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{activity.title}</h3>

                          <p className="text-gray-600 mt-1">
                            {activity.description}
                          </p>

                          <div className="mt-2 text-sm text-gray-400">
                            {activity.date}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      No recent activity.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
