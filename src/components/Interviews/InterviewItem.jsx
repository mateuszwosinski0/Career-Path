
    function InterviewItem({interview}) {
       const { company, position, interview: interviewDetails } = interview;
const { date, time, type } = interviewDetails;
  return (
 <div className="bg-white rounded-lg p-5  border border-gray-200 flex flex-col gap-2">
    <div className="flex justify-between">
        <h3  className="font-bold text-lg">{company}</h3>
        <span>{type}</span>
        </div>


<p className="font-bold text-base">
  {position}
</p>

<p className="text-lg font-semibold">
  {date} · <span>{time}</span>
</p>

  
   
</div>
  );
}

export default InterviewItem;