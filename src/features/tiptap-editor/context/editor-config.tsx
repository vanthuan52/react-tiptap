"use client";

import React, { createContext, useContext } from "react";

// -------------------------
// Types
// -------------------------

export type ImageUploadResult = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type EditorConfig = {
  /**
   * Called when user picks a file from local disk.
   * Receives the selected File, should return the uploaded image info.
   * If not provided, the image will be rendered as a local ObjectURL (not persisted).
   *
   * @example
   * onImageUpload={async (file) => {
   *   const formData = new FormData();
   *   formData.append("file", file);
   *   const res = await fetch("/api/upload", { method: "POST", body: formData });
   *   const data = await res.json();
   *   return { url: data.url, width: data.width, height: data.height };
   * }}
   */
  onImageUpload?: (file: File) => Promise<ImageUploadResult>;

  /**
   * Called when user clicks the Image toolbar button.
   * Override to open your own image picker UI (e.g. media library, Cloudinary, S3 browser...).
   * Should return the chosen image info, or null if cancelled.
   *
   * If provided, this takes priority over the local file picker.
   *
   * @example
   * onImageSelect={async () => {
   *   const image = await openMyMediaLibrary();
   *   return image ? { url: image.url, width: image.width } : null;
   * }}
   */
  onImageSelect?: () => Promise<ImageUploadResult | null>;
};

// -------------------------
// Context
// -------------------------

const EditorConfigContext = createContext<EditorConfig>({});

export const EditorConfigProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: EditorConfig;
}) => {
  return (
    <EditorConfigContext.Provider value={config}>
      {children}
    </EditorConfigContext.Provider>
  );
};

export const useEditorConfig = (): EditorConfig => {
  return useContext(EditorConfigContext);
};
