import { FaXmark } from "react-icons/fa6";

const DisputeDetailsModal = ({
  open,
  dispute,
  onClose,
}) => {
  if (!open || !dispute) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-5">

      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              Dispute #{dispute.disputeId}
            </h2>

            <p className="text-gray-500">
              {dispute.project}
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <FaXmark size={22} />
          </button>

        </div>

        <div className="p-6 space-y-8">

          {/* Basic Information */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Dispute Information
              </h3>

              <div className="space-y-2">

                <p><strong>Status:</strong> {dispute.status}</p>

                <p><strong>Priority:</strong> {dispute.priority}</p>

                <p><strong>Created:</strong> {dispute.createdAt}</p>

                <p><strong>Reason:</strong> {dispute.reason}</p>

              </div>

            </div>

            <div className="bg-gray-50 rounded-xl p-5">

              <h3 className="font-semibold mb-4">
                Participants
              </h3>

              <div className="space-y-2">

                <p><strong>Client:</strong> {dispute.client}</p>

                <p><strong>Freelancer:</strong> {dispute.freelancer}</p>

                <p><strong>Project:</strong> {dispute.project}</p>

              </div>

            </div>

          </div>

          {/* Description */}

          <div>

            <h3 className="font-semibold mb-3">
              Description
            </h3>

            <div className="bg-gray-50 rounded-xl p-5">
              {dispute.description}
            </div>

          </div>

          {/* Evidence */}

          <div>

            <h3 className="font-semibold mb-4">
              Evidence
            </h3>

            <div className="space-y-3">

              {dispute.evidence?.length ? (
                dispute.evidence.map((file) => (
                  <a
                    key={file._id}
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    {file.name}
                  </a>
                ))
              ) : (
                <p className="text-gray-500">
                  No evidence uploaded.
                </p>
              )}

            </div>

          </div>

          {/* Resolution */}

          <div className="bg-green-50 rounded-xl p-5">

            <h3 className="font-semibold mb-3">
              Resolution
            </h3>

            <p>
              <strong>Decision:</strong>{" "}
              {dispute.decision || "Pending"}
            </p>

            <p className="mt-3">
              <strong>Admin Notes:</strong>
            </p>

            <p className="mt-2 text-gray-600">
              {dispute.adminNotes || "No notes yet."}
            </p>

          </div>

          {/* Timeline */}

          <div>

            <h3 className="font-semibold mb-4">
              Activity Timeline
            </h3>

            <div className="space-y-4">

              {dispute.timeline?.map((item) => (

                <div
                  key={item._id}
                  className="border-l-4 border-blue-500 pl-4"
                >

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DisputeDetailsModal;