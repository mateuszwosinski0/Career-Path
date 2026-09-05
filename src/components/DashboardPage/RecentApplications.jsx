import ApplicationItem from "@/components/DashboardPage/ApplicationItem";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
function RecentApplications({ applications, onStatusChange }) {
  const {t} = useLanguage();
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
      <header className="mb-8 flex items-center justify-between border-b border-gray-200 pb-2 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("dashboard", "recentApplications")}
        </h2>

        <Link
          to="/applications"
          className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          {t("dashboard", "viewAll")}
        </Link>
      </header>
         {applications.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
  {t("applications", "noApplications")}
  </div>
  ) : (
      applications.slice(0, 3).map((application) => (
        <ApplicationItem
          key={application.id}
          application={application}
          onStatusChange={onStatusChange}
        />
      )
      ))}
      
    </section>
  );
}

export default RecentApplications;