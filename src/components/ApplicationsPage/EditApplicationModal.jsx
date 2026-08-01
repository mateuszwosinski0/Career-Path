import { useState } from "react";
import { X } from "lucide-react";
import ApplicationForm from "@/components/ApplicationsPage/ApplicationForm";
import { useApplications } from "@/context/ApplicationsContext";

function EditApplicationModal({ application, onClose }) {
  const { updateApplication } = useApplications();

  const [formData, setFormData] = useState({
    company: application.company,
    position: application.position,
    status: application.status,
    appliedAt: application.appliedAt,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    updateApplication(application.id, formData);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-neutral-900 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Edit application</h2>

          <button type="button" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <ApplicationForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitLabel="Save changes"
          onCancel={onClose}
        />
      </div>
    </div>
  );
}

export default EditApplicationModal;