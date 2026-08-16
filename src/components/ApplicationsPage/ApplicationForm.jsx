import DropDown from "@/components/common/Dropdown";
function ApplicationForm({
    formData,
    handleChange,
    handleSubmit,
    submitLabel,
    onCancel,
}){
return(
<form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        Company
        <input className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" type="text" name="company" required value={formData.company} onChange={handleChange}/>
      </label>

      <label className="flex flex-col gap-2">
        Position
        <input className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" type="text" name="position" required value={formData.position} onChange={handleChange}/>
      </label>
      
      <label className="flex flex-col gap-2">
        Status
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
    { value: "Applied", label: "Applied" },
    { value: "Interview", label: "Interview" },
    { value: "Offer", label: "Offer" },
    { value: "Rejected", label: "Rejected" },
  ]}
/>
      </label>

      <label className="flex flex-col gap-2">
        Applied date
        <input className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100" type="date" name="appliedAt" required value={formData.appliedAt} onChange={handleChange}/>
      </label>
      <div className="md:col-span-2 flex justify-end gap-3">
         <button className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"  type="button" onClick={onCancel}>Cancel</button>
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit"> {submitLabel}</button>
     
      </div>
    </form>
)
}
export default ApplicationForm;