
function ApplicationForm({
    formData,
    handleChange,
    handleSubmit,
    submitLabel,
    onCancel,
}){
return(
<form className="grid gird-cols-2 gap-6 max-w-4xl rounded-xl border border-gray-200 bg-white p-6 " onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        Company
        <input className="rounded-lg border border-gray-200 px-3 py-2" type="text" name="company" required value={formData.company} onChange={handleChange}/>
      </label>

      <label className="flex flex-col gap-2">
        Position
        <input className="rounded-lg border border-gray-200 px-3 py-2" type="text" name="position" required value={formData.position} onChange={handleChange}/>
      </label>
      
      <label className="flex flex-col gap-2">
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
<option value="Interview">Interview</option>
<option value="Offer">Offer</option>
<option value="Rejected">Rejected</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        Applied date
        <input className="rounded-lg border border-gray-200 px-3 py-2" type="date" name="appliedAt" required value={formData.appliedAt} onChange={handleChange}/>
      </label>
      <div className="md:col-span-2 flex justify-end gap-3">
         <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"  type="button" onClick={onCancel}>Cancel</button>
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit"> {submitLabel}</button>
     
      </div>
    </form>
)
}
export default ApplicationForm;