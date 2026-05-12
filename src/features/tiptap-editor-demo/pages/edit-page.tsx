import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ActionBar from "../components/action-bar";
import PostForm from "../components/post-form";
import { usePost } from "../hooks/use-post";

export default function EditPage() {
  const navigate = useNavigate();
  const [editable, setEditable] = useState(true);
  const { debouncedSave, saveStatus, isLoading, post } = usePost();

  const handleExport = async () => {
    if (!post) {
      alert("No content to export");
      return;
    }

    try {
      const { DocxExporter, defaultNodeMapping, defaultMarkMapping } = await import(
        "../../tiptap-editor/lib/docx"
      );
      const exporter = new DocxExporter(defaultNodeMapping, defaultMarkMapping);
      const blob = await exporter.export(post.json, "blob");
      const url = URL.createObjectURL(blob as Blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${post.title || "document"}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
      alert("Export failed. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)]">
        <div className="text-slate-500 dark:text-slate-400 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl w-full mx-auto py-10 px-4 sm:px-6">
      <ActionBar
        editable={editable}
        saveStatus={saveStatus}
        onToggleEditable={setEditable}
        onPreview={() => navigate("/preview")}
        onExport={handleExport}
      />
      <PostForm post={post} editable={editable} onSave={debouncedSave} />
    </div>
  );
}
