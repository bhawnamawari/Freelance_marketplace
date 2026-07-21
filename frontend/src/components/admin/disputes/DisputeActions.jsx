import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisVertical,
  FaEye,
  FaCheck,
  FaScaleBalanced,
} from "react-icons/fa6";

const DisputeActions = ({
  dispute,
  onView,
  onResolve,
  onClose,
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

  return (
    <div
      className="relative"
      ref={menuRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <FaEllipsisVertical />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border shadow-lg z-50">

          <button
            onClick={() => {
              onView(dispute);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
          >
            <FaEye />
            View Details
          </button>

          <button
            onClick={() => {
              onResolve(dispute);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
          >
            <FaScaleBalanced />
            Resolve
          </button>

          <button
            onClick={() => {
              onClose(dispute);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-green-600"
          >
            <FaCheck />
            Close Case
          </button>

        </div>
      )}

    </div>
  );
};

export default DisputeActions;