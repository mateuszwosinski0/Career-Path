import InterviewItem from "@/components/DashboardPage/InterviewItem";

function UpcomingInterviews({ applications }) {
  const upcomingInterviews = applications.filter(
    (application) =>
      application.status === "Interview" &&
      application.interview?.date
  )
  .sort((a,b) => {
    const dateA = new Date(
      `${a.interview.date}T${a.interview.time || "00:00"}`
    );
    const dateB = new Date(
      `${b.interview.date}T${b.interview.time || "00:00"}`
    );
    return dateA - dateB;
  });

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 transition-colors dark:border-gray-800 dark:bg-gray-900">
      <header className="mb-8 border-b border-gray-200 pb-2 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Upcoming Interviews
        </h2>
      </header>

      {upcomingInterviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No upcoming interviews.
        </p>
      ) : (
        upcomingInterviews.map((application) => (
          <InterviewItem
            key={application.id}
            application={application}
          />
        ))
      )}
    </section>
  );
}

export default UpcomingInterviews;