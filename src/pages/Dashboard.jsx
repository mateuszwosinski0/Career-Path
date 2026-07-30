import RecentApplications from "@/components/RecentApplications/RecentApplications";
import StatCard from "@/components/StatCard";
import { FileText, CalendarDays, BriefcaseBusiness, Star } from 'lucide-react';
const stats = [
  {
    title: "Applications",
    value: 42,
    change: "+12% this month",
    icon: <FileText/>,
  },
  {
    title: "Interviews",
    value: 12,
    change: "+25% this month",
    icon: <CalendarDays/>,
  },
  {
    title: "Offers",
    value: 5,
    change: "+100% this month",
    icon: <BriefcaseBusiness/>,
  },
  {
    title: "Response Rate",
    value: "46%",
    change: "+6% this month",
    icon: <Star/>,
  },
];
function Dashboard() {
  return (
    <section className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Welcome back, Mateusz </h2>
        <p className="mt-1 text-gray-500">Here's what's happening with your job search today.</p>
      </div>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{stats.map((stat) => (
  <StatCard
  key={stat.title}
    title={stat.title}
    value={stat.value}
    change={stat.change}
    icon={stat.icon}
  />
))}
</div>
<RecentApplications />
    </section>
  );
}

export default Dashboard;