export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3 h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2 h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function EditorSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-[400px] rounded-xl bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
