import { GitCompare, RotateCcw, User, Clock } from "lucide-react";
import { TimelineSkeleton } from "./LoadingSkeleton";

export default function VersionTimeline({
  versions,
  loading,
  isEditor,
  compareSelection,
  onToggleCompare,
  onRollback,
  onCompare,
}) {
  if (loading) return <TimelineSkeleton />;

  if (!versions.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">No versions saved yet.</p>
        {isEditor && (
          <p className="mt-1 text-xs text-gray-400">Save your first version to start tracking changes.</p>
        )}
      </div>
    );
  }

  const canCompare = compareSelection.length === 2;

  return (
    <div className="space-y-4">
      {canCompare && (
        <button
          type="button"
          onClick={onCompare}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <GitCompare className="h-4 w-4" />
          Compare selected versions
        </button>
      )}

      <div className="relative space-y-0">
        {versions.map((v, idx) => {
          const isSelected = compareSelection.includes(v._id);
          const isLast = idx === versions.length - 1;

          return (
            <div key={v._id} className="relative flex gap-4 pb-6">
              {!isLast && (
                <div className="absolute left-[7px] top-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
              )}

              <button
                type="button"
                onClick={() => onToggleCompare(v._id)}
                className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 transition ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-600"
                    : "border-gray-300 bg-white hover:border-indigo-400 dark:border-gray-600 dark:bg-gray-900"
                }`}
                title="Select for comparison"
              />

              <div
                className={`flex-1 rounded-xl border p-4 transition ${
                  isSelected
                    ? "border-indigo-300 bg-indigo-50/50 dark:border-indigo-700 dark:bg-indigo-900/20"
                    : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                  {v.aiSummary}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(v.createdAt).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {v.savedBy?.name || "Unknown"}
                  </span>
                </div>

                {isEditor && (
                  <button
                    type="button"
                    onClick={() => onRollback(v._id)}
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Rollback to this version
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400">
        Click timeline dots to select two versions, then compare.
      </p>
    </div>
  );
}
