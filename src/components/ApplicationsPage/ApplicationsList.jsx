import ApplicationRow from "@/components/ApplicationsPage/ApplicationRow";

function ApplicationsList({
  applications,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div>
        <div className="hidden md:grid md:grid-cols-[1.5fr_2fr_1fr_1fr_100px] gap-4 border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <span>Company</span>
          <span>Position</span>
          <span>Status</span>
          <span>Applied</span>
          <span className="text-right">Actions</span>
        </div>

        {applications.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No applications found.
          </div>
        ) : (
          applications.map((application) => (
            <ApplicationRow
              key={application.id}
              application={application}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ApplicationsList;