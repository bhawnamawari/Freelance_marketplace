const DisputeFilter = ({
  status,
  priority,

  onStatusChange,
  onPriorityChange,
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
        <option value="Open">Open</option>
        <option value="Under Review">Under Review</option>
        <option value="Resolved">Resolved</option>
        <option value="Closed">Closed</option>
      </select>

      {/* Priority */}

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

    </div>
  );
};

export default DisputeFilter;