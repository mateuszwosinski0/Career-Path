import InterviewItem from "@/components/DashboardPage/InterviewItem";
import { useLanguage } from "@/context/LanguageContext";
function UpcomingInterviews({ applications }) {
const now = new Date();

const upcomingInterviews = applications
  .filter((application) => {
    if (
      application.status !== "Interview" ||
      !application.interview?.at
    ) {
      return false;
    }

    const interviewDate = new Date(application.interview.at);

    return interviewDate >= now;
  })
  .sort(
    (a, b) =>
      new Date(a.interview.at) - new Date(b.interview.at)
  )
  .slice(0,3);
const {t} = useLanguage();
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
      <header className="mb-8 border-b border-gray-200 pb-2 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("dashboard", "upcomingInterviews")}
        </h2>
      </header>

      {upcomingInterviews.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
           {t("dashboard", "noUpcomingInterviews")}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
        {upcomingInterviews.map((application) => (
          <InterviewItem
            key={application.id}
            application={application}
          />
        ))}
        </div>
      )}
    </section>
  );
}

export default UpcomingInterviews;
