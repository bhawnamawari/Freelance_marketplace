const FreelancerFilter = ({
  status,
  skill,
  rating,
  onStatusChange,
  onSkillChange,
  onRatingChange,
}) => {
  return (
    <div className="flex flex-wrap gap-3">

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

      <select
        value={skill}
        onChange={(e) => onSkillChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Skills</option>
        <option value="React">React</option>
        <option value="Node.js">Node.js</option>
        <option value="Angular">Angular</option>
        <option value="Vue">Vue</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
      </select>

      <select
        value={rating}
        onChange={(e) => onRatingChange(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Ratings</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐ & Above</option>
        <option value="3">⭐⭐⭐ & Above</option>
      </select>

    </div>
  );
};

export default FreelancerFilter;