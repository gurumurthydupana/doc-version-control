// Mock AI Summary (No OpenAI key required)
export async function generateSummary(oldText, newText) {
  if (!oldText) {
    return "Initial version of the document created.";
  }

  if (newText.length > oldText.length) {
    return "New content was added to the document.";
  }

  if (newText.length < oldText.length) {
    return "Some content was removed from the document.";
  }

  return "The document content was updated.";
}
