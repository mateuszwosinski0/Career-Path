
    function ApplicationItem({ application, onStatusChange}) {
      const {company, position, status, appliedAt} = application
  return (
 <div className="bg-white rounded-lg p-5  border border-gray-200 flex flex-col gap-2">
  <div className="flex justify-between items-start gap-4">
  <h3 className="font-bold text-lg">{company}</h3>

  <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium bg-white cursor-pointer" value={status} 
  onChange={(e) => onStatusChange(id, e.target.value)}
  >
    <option>Applied</option>
    <option>Interview</option>
    <option>Offer</option> 
    <option>Rejected</option>
  </select>

</div>
<p className="font-bold text-base">
  {position}
</p>



  <span className="text-gray-500 text-sm">{appliedAt}</span>
</div>
  );
}

export default ApplicationItem;