
    function StatCard({ stat }) {
      const {icon, title, value, change} = stat
  return (
 <div className="bg-white rounded-lg p-5  border border-gray-200 flex flex-col gap-2">
  {icon}

<h3 className="text-gray-500 font-medium">
  {title}
</h3>

<p className="text-3xl font-bold">
  {value}
</p>

  <span>{change}</span>
</div>
  );
}

export default StatCard;