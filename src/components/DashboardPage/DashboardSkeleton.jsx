export function StatsSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
        />
      ))}
    </>
  );
}

export function DashboardContentSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:gap-6 xl:mt-8 xl:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="animate-pulse">
            <div className="mb-6 h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-4">
              <div className="h-16 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-16 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-16 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}