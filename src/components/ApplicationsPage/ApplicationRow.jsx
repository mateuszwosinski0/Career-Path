import { Menu, Trash2 } from "lucide-react";
    function ApplicationRow({ application, onStatusChange, onEdit, onDelete}) {
      const {id, company, position, status, appliedAt} = application
      const formattedDate = new Date(appliedAt).toLocaleDateString("pl-PL");
      return (
 <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_60px] items-center gap-4 px-6 py-4">
  
  <h3 className="font-bold text-lg">{company}</h3>




<p className="font-bold text-base">
  {position}
</p>
   <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium bg-white cursor-pointer" value={status} 
 onChange={(e) => onStatusChange(id, e.target.value)}
    

  >
    <option>Applied</option>
    <option>Interview</option>
    <option>Offer</option> 
    <option>Rejected</option>
  </select>


  <span className="text-gray-500 text-sm">{formattedDate}</span>
 <button type="button" 
 onClick={() =>onEdit(application)}
  aria-label={`Edit ${application.company} application`}
 >
    <Menu size={18}/>
</button>
<button
  type="button"
  onClick={() => onDelete(application.id)}
  aria-label={`Delete ${application.company} application`}
>
  <Trash2 size={18} />
</button>
</div>
  );
}

export default ApplicationRow;