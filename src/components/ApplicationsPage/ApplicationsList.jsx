import ApplicationRow from "@/components/ApplicationsPage/ApplicationRow";
import { useLanguage } from "@/context/LanguageContext";
function ApplicationsList({
  applications,
  hasApplications,
  onStatusChange,
  onEdit,
  onDelete,
  onOpenDetails,

}) {
  const { t } = useLanguage();
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div>
        <div className="hidden md:grid md:grid-cols-[1.5fr_2fr_1fr_1fr_220px] gap-4 border-b border-gray-200 px-6 py-4 text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <span>{t("applications","company")}</span>
          <span>{t("applications","position")}</span>
          <span>{t("applications","status")}</span>
          <span>{t("applications","applied")}</span>
          <span className="text-right">{t("applications","actions")}</span>
        </div>

      {applications.length === 0 ? (
  <div className="py-12 text-center text-gray-500">
    {hasApplications
      ? t("applications", "noResults")
      : t("applications", "noApplications")}
  </div>
) : (
          applications.map((application) => (
            <ApplicationRow
              key={application.id}
              application={application}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
              onOpenDetails={onOpenDetails}
                
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ApplicationsList;
