import {
  FaRotate,
  FaFileExport,
  FaUserPlus,
} from "react-icons/fa6";

import FreelancerSearch from "./FreelancerSearch";
import FreelancerFilter from "./FreelancerFilter";

const FreelancerToolbar = ({
  search,
  status,
  skill,
  rating,

  onSearch,
  onStatusChange,
  onSkillChange,
  onRatingChange,

  onRefresh,
  onExport,
  onAddFreelancer,
}) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="flex flex-col xl:flex-row gap-5 justify-between">

        <div className="flex-1">

          <FreelancerSearch
            value={search}
            onChange={onSearch}
          />

        </div>

        <FreelancerFilter
          status={status}
          skill={skill}
          rating={rating}
          onStatusChange={onStatusChange}
          onSkillChange={onSkillChange}
          onRatingChange={onRatingChange}
        />

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-xl px-4 hover:bg-gray-50"
          >
            <FaRotate />
          </button>

          <button
            onClick={onExport}
            className="border rounded-xl px-4 hover:bg-gray-50"
          >
            <FaFileExport />
          </button>

          <button
            onClick={onAddFreelancer}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 flex items-center gap-2"
          >
            <FaUserPlus />

            Add Freelancer

          </button>

        </div>

      </div>

    </div>
  );
};

export default FreelancerToolbar;