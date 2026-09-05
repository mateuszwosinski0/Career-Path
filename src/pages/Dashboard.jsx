import UpcomingInterviews from "@/components/DashboardPage/UpcomingInterviews";
import RecentApplications from "@/components/DashboardPage/RecentApplications";
import StatCard from "@/components/DashboardPage/StatCard";
import { FileText, CalendarDays, BriefcaseBusiness, Star } from 'lucide-react';
import { useApplications } from "@/context/ApplicationsContext";
import { useState } from "react";
import ScheduleInterviewModal from "@/components/ApplicationsPage/ScheduleInterviewModal";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { StatsSkeleton, DashboardContentSkeleton } from "@/components/DashboardPage/DashboardSkeleton";

function Dashboard() {
  const {t} = useLanguage();
const {applications, handleStatusChange, scheduleInterview, loading} = useApplications();

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
    title: t("dashboard", "applications"),
    value: applicationCount,
    change: t("dashboard", "applicationsChange"),
    icon: <FileText />,
  },
  {
    title: t("dashboard", "interviews"),
    value: InterviewCount,
    change: t("dashboard", "interviewsChange"),
    icon: <CalendarDays />,
  },
  {
    title: t("dashboard", "offers"),
    value: offersCount,
    change: t("dashboard", "offersChange"),
    icon: <BriefcaseBusiness />,
  },
  {
    title: t("dashboard", "responseRate"),
    value: `${responseRate}%`,
    change: t("dashboard", "responseRateChange"),
    icon: <Star />,
  },
];
  return (
    
    <section className="p-4 md:p-8">
   
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 md:text-2xl">{t("dashboard", "title")} {profile?.username} </h2>
        <p className="mt-1 font-bold text-gray-500 dark:text-gray-400 md:text-base">{t("dashboard", "description")}</p>
      </div>

   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
  {loading ? (
    <StatsSkeleton />
  ) : (
    stats.map((stat) => (
      <StatCard
        key={stat.title}
        stat={stat}
      />
    ))
  )}
</div>
{loading ? (
  <DashboardContentSkeleton />
) : (
  <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 xl:mt-8 xl:grid-cols-2">
    <RecentApplications 
      applications={applications}
      onStatusChange={handleDashboardStatusChange}
    />

    <UpcomingInterviews
      applications={applications}
    />
  </div>
)}

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

