"use client";

import { LuDownload, LuEye, LuPencilLine } from "react-icons/lu";

type SaveStatus = "idle" | "saving" | "saved";

interface ActionBarProps {
  onPreview: () => void;
  onExport: () => void;
  editable: boolean;
  onToggleEditable: (v: boolean) => void;
  saveStatus?: SaveStatus;
}

const statusLabel: Record<SaveStatus, string> = {
  idle: "",
  saving: "Saving...",
  saved: "✓ Saved",
};

export default function ActionBar({
  onPreview,
  onExport,
  editable,
  onToggleEditable,
  saveStatus = "idle",
}: ActionBarProps) {
  return (
    <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
      {/* Left: toggle + status */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Editable
          </span>
          <div className="relative">
            <input
              type="checkbox"
              checked={editable}
              onChange={(e) => onToggleEditable(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-9 h-5 rounded-full transition-colors ${
                editable ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 size-4 bg-white rounded-full shadow transition-transform ${
                editable ? "translate-x-4" : ""
              }`}
            />
          </div>
        </label>

        {saveStatus !== "idle" && (
          <span
            className={`text-xs font-medium ${
              saveStatus === "saved"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-slate-400"
            }`}
          >
            {statusLabel[saveStatus]}
          </span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPreview}
          className="flex items-center gap-1.5 px-3 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium text-sm transition-colors"
        >
          <LuEye className="size-4" />
          <span>Preview</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 h-8 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md font-medium border border-slate-200 dark:border-slate-700 text-sm transition-colors"
        >
          <LuDownload className="size-4" />
          <span>Export .docx</span>
        </button>
      </div>
    </div>
  );
}
