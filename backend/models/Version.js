import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    aiSummary: {
      type: String,
      required: true,
    },
    savedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // IMPORTANT
);

export default mongoose.model("Version", versionSchema);