"use client";

import React, { useCallback } from "react";

import { useTiptap } from "@tiptap/react";

import { MenuButton } from "../menu-button";

/**
 * ExportWordButton — Export editor content to a .docx file.
 *
 * Requires: npm install docx file-saver @types/file-saver
 * Uncomment and wire up DocxExporter from ../../lib/docx when ready.
 */
const ExportWordButton = () => {
  const { editor } = useTiptap();

  const handleExport = useCallback(async () => {
    if (!editor) return;

    try {
      // Lazy-import to avoid loading docx unless needed
      const { DocxExporter, defaultNodeMapping, defaultMarkMapping } =
        await import("../../lib/docx");
      const { saveAs } = await import("file-saver");

      const exporter = new DocxExporter(defaultNodeMapping, defaultMarkMapping);
      // Get JSON representation of the editor content
      const json = editor.getJSON();
      const buffer = await exporter.export(json, "blob");

      saveAs(buffer as Blob, "document.docx");
    } catch (err) {
      console.error("[TiptapEditor] DOCX export failed:", err);
    }
  }, [editor]);

  return (
    <MenuButton
      icon="Download"
      tooltip="Export to Word"
      onClick={handleExport}
    />
  );
};

export default ExportWordButton;
