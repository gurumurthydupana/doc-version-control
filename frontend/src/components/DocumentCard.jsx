import { Link } from "react-router-dom";
import { FileText, Clock, User } from "lucide-react";

export default function DocumentCard({ document }) {
  const lastEdited = document.updatedAt || document.createdAt;

  return (
    <Link
      to={`/editor/${document._id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-700"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-500" />
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
            {document.title}
          </h3>
        </div>
      </div>

      <div className="space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          Last edited {new Date(lastEdited).toLocaleString()}
        </p>
        <p className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          {document.createdBy?.name || "Unknown"}
        </p>
      </div>
    </Link>
  );
}
