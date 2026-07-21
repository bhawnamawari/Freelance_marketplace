import { useState } from "react";
import {
  FaEllipsisVertical,
  FaEye,
  FaUserCheck,
  FaUserSlash,
  FaBan,
  FaTrash,
} from "react-icons/fa6";

const UserActions = ({
  onView,
  onVerify,
  onSuspend,
  onBan,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      label: "View",
      icon: FaEye,
      onClick: onView,
    },
    {
      label: "Verify",
      icon: FaUserCheck,
      onClick: onVerify,
    },
    {
      label: "Suspend",
      icon: FaUserSlash,
      onClick: onSuspend,
    },
    {
      label: "Ban",
      icon: FaBan,
      onClick: onBan,
    },
    {
      label: "Delete",
      icon: FaTrash,
      onClick: onDelete,
      danger: true,
    },
  ];

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50">

          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                onClick={() => {
                  action.onClick?.();
                  setOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-100 ${
                  action.danger
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                <Icon />
                {action.label}
              </button>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default UserActions;