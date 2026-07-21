import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisVertical,
  FaEye,
  FaMoneyBillTransfer,
  FaRotateLeft,
} from "react-icons/fa6";

const PaymentActions = ({
  payment,
  onView,
  onRelease,
  onRefund,
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

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

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
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border z-50">

          <button
            onClick={() => {
              onView(payment);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
          >
            <FaEye />
            View Details
          </button>

          <button
            onClick={() => {
              onRelease(payment);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
          >
            <FaMoneyBillTransfer />
            Release Payment
          </button>

          <button
            onClick={() => {
              onRefund(payment);
              setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600"
          >
            <FaRotateLeft />
            Refund
          </button>

        </div>
      )}
    </div>
  );
};

export default PaymentActions;