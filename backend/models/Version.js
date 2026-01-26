import mongoose from "mongoose";

const versionSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
  },

  content: String,

  aiSummary: String,

  savedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Version", versionSchema);
