"use client";

import { useRef, useState } from "react";

import TiptapEditor, {
  type TiptapEditorRef,
} from "../tiptap-editor";

const INITIAL_CONTENT = `<h2>👋 Welcome to TiptapEditor</h2><p>This is a <strong>demo</strong> of the <em>TiptapEditor</em> feature module. Try editing this text!</p><ul><li>Bold, Italic, Underline, Strikethrough</li><li>Headings H1–H6</li><li>Ordered &amp; Unordered lists</li><li>Text color &amp; background</li><li>Links, Images, Tables</li><li>Code blocks with syntax highlighting</li><li>YouTube embeds &amp; much more</li></ul><p>Select any text to see the <strong>bubble menu</strong>, or use the toolbar above.</p>`;

export default function TiptapEditorExample() {
  const editorRef = useRef<TiptapEditorRef>(null);
  const [output, setOutput] = useState<string>(INITIAL_CONTENT);
  const [tab, setTab] = useState<"editor" | "html" | "stats">("editor");

  const wordCount = editorRef.current?.storage?.characterCount?.words() ?? 0;
  const charCount =
    editorRef.current?.storage?.characterCount?.characters() ?? 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-zinc-900 dark:text-white">
              ✏️ TiptapEditor
            </span>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              Demo
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{charCount} chars</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Tabs */}
        <div className="mb-4 flex gap-1 rounded-lg border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {(["editor", "html", "stats"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-all ${
                tab === t
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {t === "editor" ? "📝 Editor" : t === "html" ? "💻 HTML Output" : "📊 Stats"}
            </button>
          ))}
        </div>

        {/* Editor Tab */}
        <div className={tab === "editor" ? "block" : "hidden"}>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <TiptapEditor
              ref={editorRef}
              output="html"
              content={INITIAL_CONTENT}
              minHeight={480}
              maxHeight={700}
              placeholder={{
                paragraph: "Start writing your content...",
                imageCaption: "Add a caption (optional)",
              }}
              onChange={(value) => setOutput(value as string)}
              onImageUpload={async (file: File) => {
                // Demo: use local ObjectURL (replace with real upload in production)
                const url = URL.createObjectURL(file);
                return { url, alt: file.name };
              }}
            />
          </div>
          <p className="mt-2 text-center text-xs text-zinc-400">
            💡 Select text to see the bubble menu · Drag the ⠿ handle to reorder blocks
          </p>
        </div>

        {/* HTML Output Tab */}
        <div className={tab === "html" ? "block" : "hidden"}>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2 dark:border-zinc-800">
              <span className="text-xs font-medium text-zinc-500">HTML Output</span>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              >
                Copy
              </button>
            </div>
            <pre className="max-h-[600px] overflow-auto p-4 text-xs text-zinc-700 dark:text-zinc-300">
              {output || <span className="text-zinc-400">No content yet...</span>}
            </pre>
          </div>
        </div>

        {/* Stats Tab */}
        <div className={tab === "stats" ? "block" : "hidden"}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Words", value: wordCount, icon: "📝" },
              { label: "Characters", value: charCount, icon: "🔤" },
              { label: "Output format", value: "HTML", icon: "💻" },
              { label: "Status", value: "Active", icon: "✅" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="mb-1 text-2xl">{stat.icon}</div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
