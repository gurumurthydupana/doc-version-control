import express from "express";
import Document from "../models/Document.js";
import Version from "../models/Version.js";

import { verifyJWT } from "../middleware/authMiddleware.js";
import { generateSummary } from "../utils/aiSummary.js";

const router = express.Router();

/* =====================================================
   ✅ 1. CREATE DOCUMENT API
   Endpoint: POST /api/documents/create
===================================================== */
router.post("/create", verifyJWT, async (req, res) => {
  try {
    const { title, content } = req.body;

    const doc = await Document.create({
      title,
      currentContent: content,
      createdBy: req.user.id,
    });

    res.json({
      message: "✅ Document Created Successfully",
      document: doc,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Document Creation Failed", error });
  }
});

/* =====================================================
   ✅ 2. SAVE VERSION + AI SUMMARY
   Endpoint: POST /api/documents/:id/version
===================================================== */
router.post("/:id/version", verifyJWT, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);

    const oldText = doc.currentContent;
    const newText = req.body.newContent;

    // Generate AI Summary
    const summary = await generateSummary(oldText, newText);

    // Save Version in Database
    await Version.create({
      documentId: doc._id,
      content: newText,
      aiSummary: summary,
      savedBy: req.user.id,
    });

    // Update Document Current Content
    doc.currentContent = newText;
    await doc.save();

    res.json({
      message: "✅ Version Saved Successfully",
      aiSummary: summary,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Version Save Failed", error });
  }
});

/* =====================================================
   ✅ 3. GET VERSION HISTORY
   Endpoint: GET /api/documents/:id/history
===================================================== */
router.get("/:id/history", verifyJWT, async (req, res) => {
  try {
    const history = await Version.find({
      documentId: req.params.id,
    }).sort({ timestamp: -1 });

    res.json({
      message: "✅ Version History Fetched Successfully",
      versions: history,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ History Fetch Failed", error });
  }
});

/* =====================================================
   ✅ 4. ROLLBACK TO ANY VERSION
   Endpoint: POST /api/documents/:docId/rollback/:versionId
===================================================== */
router.post("/:docId/rollback/:versionId", verifyJWT, async (req, res) => {
  try {
    const version = await Version.findById(req.params.versionId);

    if (!version) {
      return res.status(404).json({ message: "❌ Version Not Found" });
    }

    const doc = await Document.findById(req.params.docId);

    // Restore Content
    doc.currentContent = version.content;
    await doc.save();

    res.json({
      message: "✅ Rollback Successful",
      restoredContent: version.content,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Rollback Failed", error });
  }
});

export default router;
