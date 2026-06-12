import { Lock, Pencil } from "lucide-react";

export default function RoleBadge({ role }) {
  const isEditor = role === "editor";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isEditor
          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
      }`}
    >
      {isEditor ? <Pencil className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
      {isEditor ? "Editor" : "Viewer"}
    </span>
  );
}
