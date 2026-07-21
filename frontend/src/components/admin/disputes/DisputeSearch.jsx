import { FaSearch } from "react-icons/fa";

const DisputeSearch = ({
  value,
  onChange,
  placeholder = "Search by dispute ID, project, client or freelancer...",
}) => {
  return (
    <div className="relative w-full">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default DisputeSearch;