import ApplicationItem from "@/components/RecentApplications/ApplicationItem"
import { Link } from "react-router-dom";
function RecentApplications({ applications, onStatusChange}){


  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6">
     <header className="flex justify-between items-center border-b border-gray-200 pb-2 mb-8 "> 
        <h2 className="text-2xl font-bold">Recent Applications</h2>
        <Link to="/Applications" className="text-gray-500 font-medium">View all </Link>
        </header>
        {applications.slice(0, 3).map((application) => (
  <ApplicationItem 
  key={application.id}
application={application}
onStatusChange={onStatusChange}
  />
  
  
))}
    </section>
  );
}

export default RecentApplications;