import { useState, useRef, useEffect } from "react";
import {
  FaEllipsisVertical,
  FaEye,
  FaUserCheck,
  FaUserSlash,
  FaTrash,
} from "react-icons/fa6";

const FreelancerActions = ({
  freelancer,
  onView,
  onVerify,
  onSuspend,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const menuItems = [
    {
      label: "View Details",
      icon: FaEye,
      action: () => onView(freelancer),
    },
    {
      label: "Verify",
      icon: FaUserCheck,
      action: () => onVerify(freelancer),
    },
    {
      label: "Suspend",
      icon: FaUserSlash,
      action: () => onSuspend(freelancer),
    },
    {
      label: "Delete",
      icon: FaTrash,
      action: () => onDelete(freelancer),
      danger: true,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg z-50">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition ${
                  item.danger
                    ? "text-red-600"
                    : "text-gray-700"
                }`}
              >
                <Icon />
                {item.label}
              </button>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default FreelancerActions;