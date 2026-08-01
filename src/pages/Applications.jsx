import ApplicationsHeader from "@/components/ApplicationsPage/ApplicationsHeader";
import ApplicationsToolbar from "@/components/ApplicationsPage/ApplicationsToolbar";
import ApplicationsList from "@/components/ApplicationsPage/ApplicationsList";
import { useApplications } from "@/context/ApplicationsContext";
import { useState } from "react";
import EditApplicationModal from "@/components/ApplicationsPage/EditApplicationModal";


function Applications() {
  const { applications, handleStatusChange, deleteApplication } = useApplications();

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

  return (
    <section className="p-8">
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
        onStatusChange={handleStatusChange}
        onEdit={handleEditApplication}
        onDelete={deleteApplication}
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
    </section>
  );
}

export default Applications;