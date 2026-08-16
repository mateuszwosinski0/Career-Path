import UpcomingInterviews from "@/components/DashboardPage/UpcomingInterviews";
import RecentApplications from "@/components/DashboardPage/RecentApplications";
import StatCard from "@/components/DashboardPage/StatCard";
import { FileText, CalendarDays, BriefcaseBusiness, Star } from 'lucide-react';
import { useApplications } from "@/context/ApplicationsContext";
import { useState } from "react";
import ScheduleInterviewModal from "@/components/ApplicationsPage/ScheduleInterviewModal";
import { useAuth } from "@/context/AuthContext";



function Dashboard() {
const {applications, handleStatusChange, scheduleInterview} = useApplications();

const {profile} = useAuth();
const [interviewApplication, setInterviewApplication] = useState(null);

function handleDashboardStatusChange(id, newStatus) {
  const selectedApplication = applications.find(
    (application) => application.id === id
  );

  if (!selectedApplication) return;

  if (newStatus === "Interview") {
    setInterviewApplication(selectedApplication);
    return;
  }

  handleStatusChange(id,newStatus);
}
const applicationCount = applications.length;

const InterviewCount = applications.filter(
(application) => application.status === "Interview"
).length;

const offersCount = applications.filter(
  (application) => application.status === "Offer"
).length

const responseCount = applications.filter(
  (application) =>
    application.status === "Interview" ||
  application.status === "Offer" ||
  application.status === "Rejected"
).length

const responseRate = applicationCount === 0
? 0
: Math.round((responseCount / applicationCount ) * 100);

const stats = [
  {
    title: "Applications", 
    value: applicationCount,
    change: "Total applications",
    icon: <FileText/>,
  },
  {
    title: "Interviews",
    value: InterviewCount,
    change: "Current interviews",
    icon: <CalendarDays/>,
  },
  {
    title: "Offers",
    value: offersCount,
    change: "Received offers",
    icon: <BriefcaseBusiness/>,
  },
  {
    title: "Response Rate",
    value: `${responseRate}%`,
    change: "Appllications with response",
    icon: <Star/>,
  },
];
  return (
    <section className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl">Welcome back, {profile?.username} </h2>
        <p className="mt-1 font-bold text-gray-500 dark:text-gray-400 md:text-base">Here's what's happening with your job search today.</p>
      </div>

   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
{stats.map((stat) => (
  <StatCard
  key={stat.title}
    stat={stat}
  />
))}
</div>
<div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 xl:mt-8 xl:grid-cols-2">
<RecentApplications 
applications={applications}
onStatusChange={handleDashboardStatusChange}
/>
<UpcomingInterviews
applications={applications}
/>
</div>

{interviewApplication && (
  <ScheduleInterviewModal
  application={interviewApplication}
  onClose={() => setInterviewApplication(null)}
    onSave={async (interviewDate) => {
      const success = await scheduleInterview(
        interviewApplication.id,
        interviewDate
      );
      if (success) {
        setInterviewApplication(null);
      }
    }}
    />
  
)}
    </section>
  );
}

export default Dashboard;

