import DropDown from "@/components/common/Dropdown";
import { useLanguage } from "@/context/LanguageContext";
import { getTodayDate } from "@/utils/applicationDates";
function ApplicationForm({
    formData,
    handleChange,
    handleSubmit,
    submitLabel,
    onCancel,
    onCancelInterview
}){

  const { t } = useLanguage();

  const inputClassName =
  "rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100";

return(
<form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        {t("applications", "formCompany")}
        <input className={inputClassName} type="text" name="company" required value={formData.company} onChange={handleChange}/>
      </label>

      <label className="flex flex-col gap-2">
         {t("applications", "formPosition")}

        <input className={inputClassName} type="text" name="position" required value={formData.position} onChange={handleChange}/>
      </label>
      
      <label className="flex flex-col gap-2">
       {t("applications", "formStatus")}
       <DropDown
  value={formData.status}
  onChange={(value) =>
    handleChange({
      target: {
        name: "status",
        value,
      },
    })
  }
  options={[
  {
    value: "Applied",
    label: t("applications", "statusApplied"),
  },
  {
    value: "Interview",
    label: t("applications", "statusInterview"),
  },
  {
    value: "Offer",
    label: t("applications", "statusOffer"),
  },
  {
    value: "Rejected",
    label: t("applications", "statusRejected"),
  },
  ]}
/>
      </label>

      <label className="flex flex-col gap-2">
         {t("applications", "formAppliedDate")}
        <input className={inputClassName} type="date" name="appliedAt" required value={formData.appliedAt} onChange={handleChange} max={getTodayDate()}/>
      </label>

      <label className="flex flex-col gap-2 md:col-span-2">
  {t("applications", "formOfferUrl")}

  <input
    type="url"
    name="offerUrl"
    value={formData.offerUrl}
    onChange={handleChange}
    placeholder="https://..."
    className={inputClassName}
  />
</label>
<label className="flex flex-col gap-2">
  {t("applications", "formLocation")}

  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    className={inputClassName}
  />
</label>

<label className="flex flex-col gap-2">
  {t("applications", "formWorkMode")}

  <DropDown
    value={formData.workMode}
    onChange={(value) =>
      handleChange({
        target: {
          name: "workMode",
          value,
        },
      })
    }
    options={[
      {
        value: "",
        label: t("applications", "notSpecified"),
      },
      {
        value: "Remote",
        label: t("applications", "workModeRemote"),
      },
      {
        value: "Hybrid",
        label: t("applications", "workModeHybrid"),
      },
      {
        value: "On-site",
        label: t("applications", "workModeOnSite"),
      },
    ]}
  />
</label>
      
      {[
  { name: "salaryMin", label: "formSalaryMin" },
  { name: "salaryMax", label: "formSalaryMax" },
].map((field) => (
  <label key={field.name} className="flex flex-col gap-2">
    {t("applications", field.label)}

    <input
      type="number"
      name={field.name}
      value={formData[field.name]}
      onChange={handleChange}
      min="0"
      step="0.01"
      className={inputClassName}
    />
  </label>
))}

<label className="flex flex-col gap-2">
  {t("applications", "formSalaryCurrency")}

  <DropDown
    value={formData.salaryCurrency}
    onChange={(value) =>
      handleChange({
        target: { name: "salaryCurrency", value },
      })
    }
    options={[
      { value: "", label: t("applications", "notSpecified") },
      { value: "PLN", label: "PLN" },
      { value: "EUR", label: "EUR" },
      { value: "USD", label: "USD" },
      { value: "GBP", label: "GBP" },
    ]}
  />
</label>

<label className="flex flex-col gap-2">
  {t("applications", "formSalaryPeriod")}

  <DropDown
    value={formData.salaryPeriod}
    onChange={(value) =>
      handleChange({
        target: { name: "salaryPeriod", value },
      })
    }
    options={[
      { value: "", label: t("applications", "notSpecified") },
      { value: "Monthly", label: t("applications", "salaryMonthly") },
      { value: "Hourly", label: t("applications", "salaryHourly") },
      { value: "Yearly", label: t("applications", "salaryYearly") },
    ]}
  />
</label>

<label className="flex flex-col gap-2 md:col-span-2">
  {t("applications", "formNotes")}

  <textarea
    name="notes"
    value={formData.notes}
    onChange={handleChange}
    rows={4}
    className={`${inputClassName} resize-y`}
  />
</label>

      {formData.status === "Interview" && (
          <div className="border-t border-gray-200 pt-5 dark:border-gray-700 md:col-span-2">
         <div className="mb-4 flex items-center justify-between">
  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
    {t("applications", "interviewDetails")}
  </h3>

  {onCancelInterview && (
    <button
      type="button"
      onClick={onCancelInterview}
      className="text-sm font-medium text-red-500 transition hover:text-red-600"
    >
      {t("applications", "cancelInterview")}
    </button>
  )}
</div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("applications", "interviewDate")}
                </label>

                <input 
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className={`${inputClassName} w-full`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("applications", "interviewTime")}
                </label>

                <input
                type="time"
                name="interviewTime"
                value={formData.interviewTime}
                onChange={handleChange}
                  className={`${inputClassName} w-full`}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("applications", "interviewType")}
                </label>

         <DropDown
  value={formData.interviewType}
  onChange={(value) =>
    handleChange({
      target: {
        name: "interviewType",
        value,
      },
    })
  }
options={[
  {
    value: "Online",
    label: t("interviewTypes", "online"),
  },
  {
    value: "On-site",
    label: t("interviewTypes", "onSite"),
  },
  {
    value: "Phone",
    label: t("interviewTypes", "phone"),
  },
]}
/>
              </div>
            </div>
          </div>
        
      )}
        <div className="md:col-span-2 flex justify-end gap-3">
         <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"  type="button" onClick={onCancel}> {t("common", "cancel")}</button>
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit"> {submitLabel}</button>
     
      </div>
    </form>
)
}
export default ApplicationForm;