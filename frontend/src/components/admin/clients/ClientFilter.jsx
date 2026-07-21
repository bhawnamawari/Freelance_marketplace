const ClientFilter = ({
  status,
  company,
  country,

  onStatusChange,
  onCompanyChange,
  onCountryChange,
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
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Suspended">Suspended</option>
      </select>

      {/* Company */}

      <input
        type="text"
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
        placeholder="Company"
        className="border rounded-xl px-4 py-3"
      />

      {/* Country */}

      <input
        type="text"
        value={country}
        onChange={(e) => onCountryChange(e.target.value)}
        placeholder="Country"
        className="border rounded-xl px-4 py-3"
      />

    </div>
  );
};

export default ClientFilter;