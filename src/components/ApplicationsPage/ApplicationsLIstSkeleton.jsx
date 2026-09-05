function ApplicationsListSkeleton() {
  return (
    <section className="mt-6 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="grid animate-pulse grid-cols-1 gap-4 border-b border-gray-200 px-6 py-5 last:border-b-0 dark:border-gray-800 md:grid-cols-[1.5fr_2fr_1fr_1fr_220px]"
        >
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="ml-auto h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </section>
  );
}

export default ApplicationsListSkeleton;