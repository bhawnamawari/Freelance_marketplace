const ProjectFilter = ({
  status,
  category,
  budget,

  onStatusChange,
  onCategoryChange,
  onBudgetChange,
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
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Category */}

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="Mobile Development">Mobile Development</option>
        <option value="UI/UX Design">UI/UX Design</option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Content Writing">Content Writing</option>
        <option value="Digital Marketing">Digital Marketing</option>
      </select>

      {/* Budget */}

      <select
        value={budget}
        onChange={(e) => onBudgetChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Budgets</option>
        <option value="10000">Below ₹10,000</option>
        <option value="50000">₹10,000 - ₹50,000</option>
        <option value="100000">₹50,000 - ₹1,00,000</option>
        <option value="100001">Above ₹1,00,000</option>
      </select>

    </div>
  );
};

export default ProjectFilter;