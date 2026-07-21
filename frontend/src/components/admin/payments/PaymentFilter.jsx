const PaymentFilter = ({
  status,
  method,
  date,

  onStatusChange,
  onMethodChange,
  onDateChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3">

      {/* Status */}

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Escrow">Escrow</option>
        <option value="Completed">Completed</option>
        <option value="Refunded">Refunded</option>
      </select>

      {/* Payment Method */}

      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Methods</option>
        <option value="Stripe">Stripe</option>
        <option value="Razorpay">Razorpay</option>
        <option value="PayPal">PayPal</option>
      </select>

      {/* Date */}

      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      />

    </div>
  );
};

export default PaymentFilter;