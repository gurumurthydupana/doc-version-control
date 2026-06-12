import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, FileText } from "lucide-react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import DocumentCard from "../components/DocumentCard";
import { CardSkeleton } from "../components/LoadingSkeleton";

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isEditor } = useAuth();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await client.get("/api/documents");
        setDocuments(res.data.documents || []);
      } catch (err) {
        toast.error("Failed to load documents");
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            AI-powered version control for your documents
          </p>
        </div>
        {isEditor && (
          <Link
            to="/editor/new"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            New Document
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : documents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h3 className="mb-1 text-lg font-medium">No documents yet</h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            {isEditor
              ? "Create your first document to get started."
              : "No documents have been shared yet."}
          </p>
          {isEditor && (
            <Link
              to="/editor/new"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Create Document
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      )}
    </Layout>
  );
}
