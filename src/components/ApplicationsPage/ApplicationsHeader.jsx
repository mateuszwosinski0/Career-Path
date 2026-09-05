import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
function ApplicationsHeader() {
  const {t} = useLanguage();
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm text-gray-600 dark:text-gray-400">
           {t("applications", "description")}
        </h2>

        <Link
          to="/applications/new"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          <Plus size={16} />
{t("applications", "addApplication")}
        </Link>
      </div>
    </header>
  );
}

export default ApplicationsHeader;