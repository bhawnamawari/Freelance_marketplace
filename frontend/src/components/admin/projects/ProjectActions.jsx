import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisVertical,
  FaEye,
  FaCircleCheck,
  FaBan,
  FaTrash,
} from "react-icons/fa6";

const ProjectActions = ({
  project,
  onView,
  onApprove,
  onCancel,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
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

  const actions = [
    {
      label: "View Details",
      icon: FaEye,
      action: () => onView(project),
    },
    {
      label: "Approve",
      icon: FaCircleCheck,
      action: () => onApprove(project),
    },
    {
      label: "Cancel Project",
      icon: FaBan,
      action: () => onCancel(project),
    },
    {
      label: "Delete",
      icon: FaTrash,
      danger: true,
      action: () => onDelete(project),
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
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border shadow-lg z-50">

          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${
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

export default ProjectActions;