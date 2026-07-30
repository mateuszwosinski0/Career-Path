import ApplicationItem from "@/components/RecentApplications/ApplicationItem"
import { useState } from "react";
const [applications, setApplications] = useState ([
    {
      id: 1,
        company: "Google",
        position: "Frontend Developer",
        status: "Applied",
        appliedAt: "2 Days ago",
    },
      {
        id: 2,
        company: "Google",
        position: "Frontend Developer",
        status: "Applied",
        appliedAt: "2 Days ago",
    },
      {
        id: 3,
        company: "Google",
        position: "Frontend Developer",
        status: "Applied",
        appliedAt: "2 Days ago",
    },
      {
        id: 4,
        company: "Google",
        position: "Frontend Developer",
        status: "Applied",
        appliedAt: "2 Days ago",
    },
])
function handleStatusChange(id, newStatus){
  setApplications(
    applications.map((application) =>{
     return application.id === id
      ?{ ...application, status: newStatus}
      : application
    })
  )
}
function RecentApplications() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
     <header className="flex justify-between items-center border-b border-gray-200 pb-2 mb-8 "> 
        <h2 className="text-2xl font-bold">Recent Applications</h2>
        <button type="button" className="text-gray-500 font-medium">View all</button>
        </header>
        {applications.map((application) => (
  <ApplicationItem 
  key={application.id}
application={application}
onStatusChange={handleStatusChange}
  />
  
  
))}
    </section>
  );
}

export default RecentApplications;