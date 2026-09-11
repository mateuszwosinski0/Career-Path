import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useApplications } from "@/context/ApplicationsContext";
import ApplicationForm from "@/components/ApplicationsPage/ApplicationForm";
import { useLanguage } from "@/context/LanguageContext";
function AddApplication(){
  const {addApplication } = useApplications();
  const navigate = useNavigate();
const {t} = useLanguage();
const [formData, setFormData] = useState({
  company: "",
  position: "",
  status: "Applied",
  appliedAt: "",
  offerUrl: "",
  location: "",
workMode: "",
salaryMin: "",
salaryMax: "",
salaryCurrency: "",
salaryPeriod: "",
notes: "",
  interviewDate: "",
  interviewTime: "",
  interviewType: "Online",

});
  function handleChange(e) {
    const {name, value} = e.target;
    setFormData((currentFormData) =>({
      ...currentFormData,
      [name]:value,
    }));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const success = await addApplication(formData);

  if (success) {
    navigate("/applications");
  }
}

return (
  <section className="p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
       {t("applications", "addApplication")}
      </h2>

      <p className="mt-1 text-gray-500 dark:text-gray-400">
        {t("applications","addApplicationDescription")}
      </p>

      <ApplicationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
          submitLabel={t("applications", "addApplication")}
        onCancel={() => navigate("/applications")}
      />
    </div>
  </section>
);
}

export default AddApplication