import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisVertical,
  FaEye,
  FaUserSlash,
  FaUserCheck,
  FaTrash,
} from "react-icons/fa6";

const ClientActions = ({
  client,
  onView,
  onActivate,
  onSuspend,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const actions = [
    {
      label: "View Details",
      icon: FaEye,
      onClick: () => onView(client),
    },
    {
      label: "Activate",
      icon: FaUserCheck,
      onClick: () => onActivate(client),
    },
    {
      label: "Suspend",
      icon: FaUserSlash,
      onClick: () => onSuspend(client),
    },
    {
      label: "Delete",
      icon: FaTrash,
      onClick: () => onDelete(client),
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">

          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.label}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${
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

export default ClientActions;