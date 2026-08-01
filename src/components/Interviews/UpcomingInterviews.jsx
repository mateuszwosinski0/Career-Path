import InterviewItem from "@/components/Interviews/InterviewItem"



function UpcomingInterviews({ applications }) {
const upcomingInterviews = applications.filter(
  (application) =>
    application.status === "interview" &&
    application.interview
);

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
     <header className="flex justify-between items-center border-b border-gray-200 pb-2 mb-8 "> 
        <h2 className="text-2xl font-bold">Upcoming Interviews</h2>
        
        </header>
  {upcomingInterviews.length === 0 ? (
  <p className="text-gray-500">
    No upcoming interviews.
  </p>
) : (
  upcomingInterviews.slice(0, 3).map((application) => (
    <InterviewItem
      key={application.id}
      interview={application}
    />
  ))
)}
    </section>
  );
}

export default UpcomingInterviews;