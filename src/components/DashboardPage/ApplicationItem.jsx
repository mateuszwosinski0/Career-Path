import StatusDropdown from "@/components/common/StatusDropDown";
import { formatDate } from "@/utils/formatDate";

function ApplicationItem({ application, onStatusChange }) {
  const { company, position, status, appliedAt } = application;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5 transition-colors dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {company}
        </h3>

        <StatusDropdown
          value={status}
          onChange={(newStatus) =>
            onStatusChange(application.id, newStatus)
          }
        />
      </div>

      <p className="text-base font-bold text-gray-800 dark:text-gray-200">
        {position}
      </p>

      <span className="text-sm text-gray-500 dark:text-gray-400">
        {formatDate(appliedAt)}
      </span>
    </div>
  );
}

export default ApplicationItem;