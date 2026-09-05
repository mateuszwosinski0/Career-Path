import { useState,useRef } from "react";
import { X } from "lucide-react";
import ApplicationForm from "@/components/ApplicationsPage/ApplicationForm";
import { useApplications } from "@/context/ApplicationsContext";
import { useLanguage } from "@/context/LanguageContext";
import useEscapeKey from "@/hooks/useEscapeKey";



function EditApplicationModal({ application, onClose }) {
  const { updateApplication, cancelInterview } = useApplications();
const { t } = useLanguage();
  const [formData, setFormData] = useState({
    company: application.company,
    position: application.position,
    status: application.status,
    appliedAt: application.appliedAt,
    interviewDate: application?.interview?.date ?? "",
interviewTime: application?.interview?.time ?? "",
interviewType: application?.interview?.type ?? "Online",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

   async function handleSubmit(e) {
    e.preventDefault();

    const success = await updateApplication(application.id, formData);

    if (success)
    onClose();
  }

  async function  handleCancelInterview() {
    const success = await cancelInterview(application.id);
    
    if (success) {
      onClose();
    }
  }
const modalRef = useRef(null);
useEscapeKey(onClose);
return (
  <div  className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
    <div ref={modalRef} className="my-4 w-full max-w-lg rounded-xl bg-white p-5 shadow-xl dark:border dark:border-gray-800 dark:bg-gray-900">
      
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
          {t("applications", "editApplication")}
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X size={20} />
        </button>
      </div>

      <ApplicationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel={t("applications", "saveChanges")}
        onCancel={onClose}
        onCancelInterview={
          application.status === "Interview"
          ? handleCancelInterview
          : undefined
        }
      />
    </div>
  </div>
);
}

export default EditApplicationModal;