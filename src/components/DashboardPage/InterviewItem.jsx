import { formatDate } from "@/utils/formatDate";

function InterviewItem({ application }) {
  const {
    company,
    position,
    interview: interviewDetails,
  } = application;

  const { date, time, type } = interviewDetails;

  const formattedTime = time?.slice(0, 5);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 transition-colors dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">
            {company}
          </h3>

          <p className="mt-1 text-gray-700 dark:text-gray-300">
            {position}
          </p>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {formatDate(date)} · {formattedTime}
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300">
          {type}
        </span>
      </div>
    </div>
  );
}

export default InterviewItem;