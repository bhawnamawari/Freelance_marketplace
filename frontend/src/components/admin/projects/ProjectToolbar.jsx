import {
  FaRotate,
  FaFileExport,
  FaPlus,
} from "react-icons/fa6";

import ProjectSearch from "./ProjectSearch";
import ProjectFilter from "./ProjectFilter";

const ProjectToolbar = ({
  search,
  status,
  category,
  budget,

  onSearch,
  onStatusChange,
  onCategoryChange,
  onBudgetChange,

  onRefresh,
  onExport,
  onAddProject,
}) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5">

      <div className="flex flex-col xl:flex-row gap-5 justify-between">

        {/* Search */}

        <div className="flex-1">

          <ProjectSearch
            value={search}
            onChange={onSearch}
          />

        </div>

        {/* Filters */}

        <ProjectFilter
          status={status}
          category={category}
          budget={budget}
          onStatusChange={onStatusChange}
          onCategoryChange={onCategoryChange}
          onBudgetChange={onBudgetChange}
        />

        {/* Actions */}

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-xl px-4 hover:bg-gray-100 transition"
            title="Refresh"
          >
            <FaRotate />
          </button>

          <button
            onClick={onExport}
            className="border rounded-xl px-4 hover:bg-gray-100 transition"
            title="Export"
          >
            <FaFileExport />
          </button>

          <button
            onClick={onAddProject}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 flex items-center gap-2 transition"
          >
            <FaPlus />
            Add Project
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProjectToolbar;