import { SquarePen, Trash2 } from "lucide-react";
import StatusDropdown from "@/components/common/StatusDropDown";
import { formatDate } from "@/utils/formatDate";

function ApplicationRow({
  application,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const { company, position, status, appliedAt } = application;

  return (
    <div
      className="
        border-b border-gray-200 px-4 py-4
        transition-colors last:border-b-0
        hover:bg-gray-50
        dark:border-gray-800 dark:hover:bg-gray-800/50
        sm:px-6
        md:grid
        md:grid-cols-[1.5fr_2fr_1fr_1fr_100px]
        md:items-center
        md:gap-4
      "
    >
      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900 dark:text-gray-100">
              {company}
            </h3>

            <p className="truncate text-sm text-gray-700 dark:text-gray-300">
              {position}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(application)}
              className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              aria-label={`Edit ${company}`}
            >
              <SquarePen size={18} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(application)}
              className="rounded-md p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              aria-label={`Delete ${company}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <StatusDropdown
            value={status}
            onChange={(newStatus) =>
              onStatusChange(application.id, newStatus)
            }
          />

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(appliedAt)}
          </span>
        </div>
      </div>

      {/* Desktop */}
      <span className="hidden font-semibold text-gray-900 dark:text-gray-100 md:block">
        {company}
      </span>

      <span className="hidden text-gray-700 dark:text-gray-300 md:block">
        {position}
      </span>

      <div className="hidden md:block">
        <StatusDropdown
          value={status}
          onChange={(newStatus) =>
            onStatusChange(application.id, newStatus)
          }
        />
      </div>

      <span className="hidden text-gray-500 dark:text-gray-400 md:block">
        {formatDate(appliedAt)}
      </span>

      <div className="hidden items-center justify-end gap-1 md:flex">
        <button
          type="button"
          onClick={() => onEdit(application)}
          className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          aria-label={`Edit ${company}`}
        >
          <SquarePen size={18} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(application)}
          className="rounded-md p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          aria-label={`Delete ${company}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default ApplicationRow;