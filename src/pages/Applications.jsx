import ApplicationsHeader from "@/components/ApplicationsPage/ApplicationsHeader";
import ApplicationsToolbar from "@/components/ApplicationsPage/ApplicationsToolbar";
import ApplicationsList from "@/components/ApplicationsPage/ApplicationsList";
import { useApplications } from "@/context/ApplicationsContext";
import { useState } from "react";
import EditApplicationModal from "@/components/ApplicationsPage/EditApplicationModal";
import DeleteApplicationModal from "@/components/ApplicationsPage/DeleteApplicationModal";
import ScheduleInterviewModal from "@/components/ApplicationsPage/ScheduleInterviewModal";



function Applications() {
  const { applications, handleStatusChange, deleteApplication, scheduleInterview } = useApplications();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("All");
  const [sortTerm, setSortTerm] = useState("Newest");

  const filteredApplications = applications.filter((application) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      application.company.toLowerCase().includes(search) ||
      application.position.toLowerCase().includes(search);

    const matchesStatus =
      filterTerm === "All" || application.status === filterTerm;

    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications];

  if (sortTerm === "Company A-Z") {
    sortedApplications.sort((a, b) =>
      a.company.localeCompare(b.company)
    );
  }

  if (sortTerm === "Company Z-A") {
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

      <ApplicationsList
        applications={sortedApplications}
        onStatusChange={handleApplicationStatusChange}
        onEdit={handleEditApplication}
        onDelete={handeleDeleteClick}
      />
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