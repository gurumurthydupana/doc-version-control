import ReactDiffViewer from "react-diff-viewer-continued";
import { useTheme } from "../context/ThemeContext";
import { stripHtml } from "../utils/stripHtml";
import { X } from "lucide-react";

export default function DiffViewer({ versionA, versionB, onClose }) {
  const { dark } = useTheme();

  if (!versionA || !versionB) return null;

  const oldValue = stripHtml(versionA.content);
  const newValue = stripHtml(versionB.content);

  const labelA = `v${versionA._id.slice(-6)} — ${new Date(versionA.createdAt).toLocaleString()}`;
  const labelB = `v${versionB._id.slice(-6)} — ${new Date(versionB.createdAt).toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold">Version Comparison</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {versionA.savedBy?.name || "Unknown"} → {versionB.savedBy?.name || "Unknown"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <ReactDiffViewer
            oldValue={oldValue}
            newValue={newValue}
            splitView
            useDarkTheme={dark}
            leftTitle={labelA}
            rightTitle={labelB}
            styles={{
              variables: {
                dark: {
                  diffViewerBackground: "#111827",
                  diffViewerColor: "#f3f4f6",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
