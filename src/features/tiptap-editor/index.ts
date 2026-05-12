// ==========================================
// TiptapEditor — Public API
// ==========================================
// Drop this entire folder into your project (e.g. src/modules/tiptap-editor/)
// then import from this file.
//
// Usage:
//   import TiptapEditor from '@/modules/tiptap-editor';
//   import '@/modules/tiptap-editor/styles/index.css';
// ==========================================

// --- Editor (main component) ---
export { default } from "./components/editor";
export { default as TiptapEditor } from "./components/editor";
export type { TiptapEditorProps, TiptapEditorRef } from "./components/editor";

// --- Renderer ---
export { default as TiptapClientRenderer } from "./renderer/client-renderer";
export { default as TiptapServerRenderer } from "./renderer/server-renderer";

// --- Context (for advanced: inject image upload handler) ---
export {
  EditorConfigProvider,
  useEditorConfig,
} from "./context/editor-config";
export type { EditorConfig, ImageUploadResult } from "./context/editor-config";

// --- Extensions (for advanced customization) ---
export { createExtensions } from "./extensions";
