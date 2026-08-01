import ApplicationRow from "@/components/ApplicationsPage/ApplicationRow"
function ApplicationsList( {applications, onStatusChange, onEdit}) {

  return(
    <section className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_60px] gap-4 border-b border-gray-200 px-6 py-3 text-sm font-medium text-gray-500">
         <span>Company</span>
         <span>Position</span>
         <span>Status</span>
         <span>Applied</span>
         <span className="text-right">Actions</span>
        </div>

         <div>
                 {applications.map((application) => (
  <ApplicationRow 
  key={application.id}
application={application}
onStatusChange={onStatusChange}
onEdit={onEdit}
  />
                )) }
        </div>
    </section>
  )

}

export default ApplicationsList