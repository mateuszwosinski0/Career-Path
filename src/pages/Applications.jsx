import ApplicationsHeader from "@/components/ApplicationsPage/ApplicationsHeader";
import ApplicationsToolbar from "@/components/ApplicationsPage/ApplicationsToolbar";
import ApplicationsList from "@/components/ApplicationsPage/ApplicationsList";
import { useApplications } from "@/context/ApplicationsContext";
import { useEffect, useState } from "react";
import EditApplicationModal from "@/components/ApplicationsPage/EditApplicationModal";
import DeleteApplicationModal from "@/components/ApplicationsPage/DeleteApplicationModal";
import ScheduleInterviewModal from "@/components/ApplicationsPage/ScheduleInterviewModal";
import { useSearchParams } from "react-router-dom";
import ApplicationsListSkeleton from "@/components/ApplicationsPage/ApplicationsLIstSkeleton";


function Applications() {
  const { applications, handleStatusChange, deleteApplication, scheduleInterview,loading  } = useApplications();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

  function setSearchTerm(value) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set("q", value);
      else next.delete("q");
      return next;
    }, { replace: true });
  }
  const [filterTerm, setFilterTerm] = useState("All");
  const [sortTerm, setSortTerm] = useState("Newest");

  const filteredApplications = applications.filter((application) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(search) ||
      application.position.toLowerCase().includes(search);

    const matchesStatus =
      filterTerm === "All" || application.status === filterTerm;

    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications];

  if (sortTerm === "Company-A-Z") {
    sortedApplications.sort((a, b) =>
      a.company.localeCompare(b.company)
    );
  }

  if (sortTerm === "Company-Z-A") {
    sortedApplications.sort((a, b) =>
      b.company.localeCompare(a.company)
    );
  }

  if (sortTerm === "Newest") {
    sortedApplications.sort(
      (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
    );
  }

  if (sortTerm === "Oldest") {
    sortedApplications.sort(
      (a, b) => new Date(a.appliedAt) - new Date(b.appliedAt)
    );
  }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  function handleEditApplication(application) {
    setSelectedApplication(application);
    setIsEditModalOpen(true);
  }

  const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
  const [applicationToDelete, setAplicationToDelete] = useState(null);

  function handeleDeleteClick(application){
    setAplicationToDelete(application);
    setIsDeleteModalOpen(true);
  }

  const [interviewApplication, setInterviewApplication] = useState(null);
function handleApplicationStatusChange(id,newStatus) {
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



const highlightId = searchParams.get("highlight")

useEffect(() => {
  if (!highlightId) return;

  const timeout = setTimeout(() => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      next.delete("highlight");
      return next;
    }, { replace: true });
  }, 3000);

  return () => clearTimeout(timeout);
}, [highlightId, setSearchParams]);




  return (
    <section className="p-4 md:p-8">
      <ApplicationsHeader />

      <ApplicationsToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
        sortTerm={sortTerm}
        setSortTerm={setSortTerm}
      />
      
      {loading ? (
        <ApplicationsListSkeleton/>
      ): (

      
      <ApplicationsList
        applications={sortedApplications}
          hasApplications={applications.length > 0}
        onStatusChange={handleApplicationStatusChange}
        onEdit={handleEditApplication}
        onDelete={handeleDeleteClick}
        highlightId={highlightId}
          
      />
      )}
      {isEditModalOpen && selectedApplication && (
        <EditApplicationModal
        application={selectedApplication}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedApplication(null);
        }} 

        />
      )}


      {isDeleteModalOpen && applicationToDelete && (
        <DeleteApplicationModal
        application={applicationToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAplicationToDelete(null);
        }}
        onConfirm={() => {
          deleteApplication(applicationToDelete.id);
          setIsDeleteModalOpen(false);
          setAplicationToDelete(null);
        }}
        />
      )}

      {interviewApplication && (
        <ScheduleInterviewModal
        application={interviewApplication}
        onClose={() => setInterviewApplication(null)}
          onSave={async(interviewData) =>{
            const success = await scheduleInterview(
              interviewApplication.id,
              interviewData
            );
            if (success){
              setInterviewApplication(null);
            }
          }}
          />
        
      )}
    </section>
  );
}

export default Applications;
