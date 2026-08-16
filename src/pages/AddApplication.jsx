import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useApplications } from "@/context/ApplicationsContext";
import ApplicationForm from "@/components/ApplicationsPage/ApplicationForm";

function AddApplication(){
  const {addApplication } = useApplications();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    appliedAt: "",
  });
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData((currentFormData) =>({
      ...currentFormData,
      [name]:value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addApplication(formData);
    navigate("/applications");
  }

return (
  <section className="p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Add application
      </h2>

      <p className="mt-1 text-gray-500 dark:text-gray-400">
        Add a new job application to your tracker.
      </p>

      <ApplicationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitLabel="Save application"
        onCancel={() => navigate("/applications")}
      />
    </div>
  </section>
);
}

export default AddApplication