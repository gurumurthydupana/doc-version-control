import { useState } from "react";
import axios from "axios";

export default function Editor() {
  const [content, setContent] = useState("");
  const [docId, setDocId] = useState("");
  const [versions, setVersions] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzc1NzRjNTRkNjUwNDRmZDJiNjZhNCIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3Njk0Mjk5MjgsImV4cCI6MTc2OTUxNjMyOH0.IIlW8rLjwjTQ-sJl4atl-QYbd3rtmhn8NY1fGqS_FkI";

  // ✅ Create Document
  const createDocument = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/documents/create",
      {
        title: "My Document",
        content: "",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setDocId(res.data.document._id);
    alert("✅ Document Created Successfully");
  };

  // ✅ Save Version
  const saveVersion = async () => {
    await axios.post(
      `http://localhost:5000/api/documents/${docId}/version`,
      { newContent: content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("✅ Version Saved Successfully");
    fetchHistory();
  };

  // ✅ Fetch Version History
  const fetchHistory = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/documents/${docId}/history`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setVersions(res.data.versions);
  };

  // ✅ Rollback Version
  const rollbackVersion = async (versionId) => {
    const res = await axios.post(
      `http://localhost:5000/api/documents/${docId}/rollback/${versionId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setContent(res.data.restoredContent);
    alert("✅ Rollback Successful");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Editor Section */}
      <div style={{ width: "65%" }}>
        <h2>📄 Document Editor</h2>

        <button onClick={createDocument}>Create Document</button>
        <button onClick={saveVersion} disabled={!docId}>
          Save Version
        </button>

        <textarea
          rows="15"
          style={{ width: "100%", marginTop: "10px" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Version History Section */}
      <div style={{ width: "35%" }}>
        <h3>📌 Version History</h3>

        <button onClick={fetchHistory} disabled={!docId}>
          Refresh History
        </button>

        <ul>
          {versions.map((v) => (
            <li key={v._id} style={{ marginBottom: "15px" }}>
              <p>
                ✅ {v.aiSummary}
                <br />
                <small>{new Date(v.timestamp).toLocaleString()}</small>
              </p>

              <button onClick={() => rollbackVersion(v._id)}>
                Rollback
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
