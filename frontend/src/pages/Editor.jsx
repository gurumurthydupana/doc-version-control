import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Save, ArrowLeft, Lock, RefreshCw } from "lucide-react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import RichTextEditor from "../components/RichTextEditor";
import VersionTimeline from "../components/VersionTimeline";
import DiffViewer from "../components/DiffViewer";
import RoleBadge from "../components/RoleBadge";
import { EditorSkeleton } from "../components/LoadingSkeleton";

export default function Editor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { isEditor } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docId, setDocId] = useState(isNew ? null : id);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [compareSelection, setCompareSelection] = useState([]);
  const [diffVersions, setDiffVersions] = useState(null);

  const fetchHistory = useCallback(async (currentDocId) => {
    if (!currentDocId) return;
    setHistoryLoading(true);
    try {
      const res = await client.get(`/api/documents/${currentDocId}/history`);
      setVersions(res.data.versions || []);
    } catch {
      toast.error("Failed to load version history");
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isNew) return;

    const loadDocument = async () => {
      try {
        const res = await client.get(`/api/documents/${id}`);
        const doc = res.data.document;
        setTitle(doc.title);
        setContent(doc.currentContent || "");
        setDocId(doc._id);
        await fetchHistory(doc._id);
      } catch {
        toast.error("Document not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadDocument();
  }, [id, isNew, navigate, fetchHistory]);

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Please enter a document title");
      return;
    }
    setSaving(true);
    try {
      const res = await client.post("/api/documents/create", {
        title: title.trim(),
        content,
      });
      const newDoc = res.data.document;
      setDocId(newDoc._id);
      toast.success("Document created");
      navigate(`/editor/${newDoc._id}`, { replace: true });
      fetchHistory(newDoc._id);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create document");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!docId) return;
    setSaving(true);
    try {
      const res = await client.post(`/api/documents/${docId}/version`, {
        newContent: content,
      });
      toast.success(res.data.aiSummary ? `Saved — ${res.data.aiSummary}` : "Version saved");
      fetchHistory(docId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save version");
    } finally {
      setSaving(false);
    }
  };

  const handleRollback = async (versionId) => {
    if (!window.confirm("Rollback to this version? Unsaved changes will be lost.")) return;
    try {
      const res = await client.post(`/api/documents/${docId}/rollback/${versionId}`);
      setContent(res.data.restoredContent);
      toast.success("Rolled back successfully");
      fetchHistory(docId);
    } catch (err) {
      toast.error(err.response?.data?.message || "Rollback failed");
    }
  };

  const toggleCompare = (versionId) => {
    setCompareSelection((prev) => {
      if (prev.includes(versionId)) {
        return prev.filter((id) => id !== versionId);
      }
      if (prev.length >= 2) {
        return [prev[1], versionId];
      }
      return [...prev, versionId];
    });
  };

  const handleCompare = () => {
    if (compareSelection.length !== 2) return;
    const [idA, idB] = compareSelection;
    const vA = versions.find((v) => v._id === idA);
    const vB = versions.find((v) => v._id === idB);

    if (!vA || !vB) return;

    const older = new Date(vA.createdAt) <= new Date(vB.createdAt) ? vA : vB;
    const newer = older._id === vA._id ? vB : vA;
    setDiffVersions({ versionA: older, versionB: newer });
  };

  if (loading) {
    return (
      <Layout>
        <EditorSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            {isNew ? (
              <input
                type="text"
                placeholder="Document title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold outline-none bg-transparent placeholder:text-gray-400"
              />
            ) : (
              <h1 className="text-xl font-bold">{title}</h1>
            )}
            {!isEditor && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                <Lock className="h-3 w-3" />
                Read-only — viewer access
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isEditor && <RoleBadge role="viewer" />}
          {isEditor && (
            <>
              {isNew ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Creating..." : "Create Document"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Version"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RichTextEditor
            content={content}
            onChange={setContent}
            editable={isEditor}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Version History</h2>
            {docId && (
              <button
                type="button"
                onClick={() => fetchHistory(docId)}
                disabled={historyLoading}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Refresh history"
              >
                <RefreshCw className={`h-4 w-4 ${historyLoading ? "animate-spin" : ""}`} />
              </button>
            )}
          </div>

          <VersionTimeline
            versions={versions}
            loading={historyLoading && !versions.length}
            isEditor={isEditor}
            compareSelection={compareSelection}
            onToggleCompare={toggleCompare}
            onRollback={handleRollback}
            onCompare={handleCompare}
          />
        </div>
      </div>

      {diffVersions && (
        <DiffViewer
          versionA={diffVersions.versionA}
          versionB={diffVersions.versionB}
          onClose={() => setDiffVersions(null)}
        />
      )}
    </Layout>
  );
}
