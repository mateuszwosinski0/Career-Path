function StatCard({ stat }) {
  const { icon, title, value, change } = stat;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-colors dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 text-gray-400 dark:text-gray-500">
        {icon}
      </div>

      <p className="font-medium text-gray-700 dark:text-gray-300">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {change}
        
      </p>
    </div>
  );
}

export default StatCard;