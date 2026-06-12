import express from "express";
import Document from "../models/Document.js";
import Version from "../models/Version.js";

import { verifyJWT, requireEditor } from "../middleware/authMiddleware.js";
import { generateSummary } from "../utils/aiSummary.js";

const router = express.Router();

/* =====================================================
   LIST ALL DOCUMENTS
   Endpoint: GET /api/documents
===================================================== */
router.get("/", verifyJWT, async (req, res) => {
  try {
    const documents = await Document.find()
      .populate("createdBy", "name email")
      .sort({ updatedAt: -1 });

    res.json({ documents });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch documents", error: error.message });
  }
});

/* =====================================================
   CREATE DOCUMENT
   Endpoint: POST /api/documents/create
===================================================== */
router.post("/create", verifyJWT, requireEditor, async (req, res) => {
  try {
    const { title, content } = req.body;

    const doc = await Document.create({
      title,
      currentContent: content || "",
      createdBy: req.user.id,
    });

    if (content) {
      const summary = await generateSummary("", content);
      await Version.create({
        documentId: doc._id,
        content,
        aiSummary: summary,
        savedBy: req.user.id,
      });
    }

    res.json({
      message: "Document created successfully",
      document: doc,
    });
  } catch (error) {
    res.status(500).json({ message: "Document creation failed", error: error.message });
  }
});

/* =====================================================
   GET SINGLE DOCUMENT
   Endpoint: GET /api/documents/:id
===================================================== */
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).populate("createdBy", "name email");

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ document: doc });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch document", error: error.message });
  }
});

/* =====================================================
   SAVE VERSION + AI SUMMARY
   Endpoint: POST /api/documents/:id/version
===================================================== */
router.post("/:id/version", verifyJWT, requireEditor, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    const oldText = doc.currentContent;
    const newText = req.body.newContent;

    const summary = await generateSummary(oldText, newText);

    await Version.create({
      documentId: doc._id,
      content: newText,
      aiSummary: summary,
      savedBy: req.user.id,
    });

    doc.currentContent = newText;
    await doc.save();

    res.json({
      message: "Version saved successfully",
      aiSummary: summary,
    });
  } catch (error) {
    res.status(500).json({ message: "Version save failed", error: error.message });
  }
});

/* =====================================================
   GET VERSION HISTORY
   Endpoint: GET /api/documents/:id/history
===================================================== */
router.get("/:id/history", verifyJWT, async (req, res) => {
  try {
    const history = await Version.find({
      documentId: req.params.id,
    })
      .populate("savedBy", "name")
      .sort({ createdAt: -1 });

    res.json({ versions: history });
  } catch (error) {
    res.status(500).json({ message: "History fetch failed", error: error.message });
  }
});

/* =====================================================
   COMPARE TWO VERSIONS
   Endpoint: GET /api/documents/:docId/compare/:v1/:v2
===================================================== */
router.get("/:docId/compare/:v1/:v2", verifyJWT, async (req, res) => {
  try {
    const [v1, v2] = await Promise.all([
      Version.findById(req.params.v1).populate("savedBy", "name"),
      Version.findById(req.params.v2).populate("savedBy", "name"),
    ]);

    if (!v1 || !v2) {
      return res.status(404).json({ message: "One or both versions not found" });
    }

    if (
      v1.documentId.toString() !== req.params.docId ||
      v2.documentId.toString() !== req.params.docId
    ) {
      return res.status(400).json({ message: "Versions do not belong to this document" });
    }

    res.json({
      versionA: v1,
      versionB: v2,
    });
  } catch (error) {
    res.status(500).json({ message: "Compare failed", error: error.message });
  }
});

/* =====================================================
   ROLLBACK TO ANY VERSION
   Endpoint: POST /api/documents/:docId/rollback/:versionId
===================================================== */
router.post("/:docId/rollback/:versionId", verifyJWT, requireEditor, async (req, res) => {
  try {
    const version = await Version.findById(req.params.versionId);

    if (!version) {
      return res.status(404).json({ message: "Version not found" });
    }

    if (version.documentId.toString() !== req.params.docId) {
      return res.status(400).json({ message: "Version does not belong to this document" });
    }

    const doc = await Document.findById(req.params.docId);

    if (!doc) {
      return res.status(404).json({ message: "Document not found" });
    }

    doc.currentContent = version.content;
    await doc.save();

    res.json({
      message: "Rollback successful",
      restoredContent: version.content,
    });
  } catch (error) {
    res.status(500).json({ message: "Rollback failed", error: error.message });
  }
});

export default router;
