"use client";

import React, { ChangeEvent, Fragment, useCallback, useRef } from "react";

import { useEditorConfig } from "../../context/editor-config";
import { useImage } from "../../hooks/use-image";
import { MenuButton } from "../menu-button";

const ImageButton = () => {
  const { canInsert, insert } = useImage();
  const { onImageUpload, onImageSelect } = useEditorConfig();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(async () => {
    // Priority 1: Custom image picker (media library, S3 browser, etc.)
    if (onImageSelect) {
      const result = await onImageSelect();
      if (result) {
        insert({
          src: result.url,
          alt: result.alt,
          width: result.width,
          height: result.height,
          mediaKey: result.mediaKey,
        });
      }
      return;
    }

    // Priority 2: Local file picker
    fileInput.current?.click();
  }, [onImageSelect, insert]);

  const onFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const file = target.files?.[0];
      if (!file?.type.startsWith("image/")) return;

      // Priority: custom upload handler (upload to server, S3, etc.)
      if (onImageUpload) {
        try {
          const result = await onImageUpload(file);
          insert({
            src: result.url,
            alt: result.alt ?? file.name,
            width: result.width,
            height: result.height,
            mediaKey: result.mediaKey,
          });
        } catch (err) {
          console.error("[TiptapEditor] onImageUpload failed:", err);
        }
      } else {
        // Fallback: local ObjectURL (not persisted — for dev/preview only)
        const url = URL.createObjectURL(file);
        insert({ src: url, alt: file.name });
      }

      // Reset input so same file can be selected again
      target.value = "";
    },
    [insert, onImageUpload],
  );

  return (
    <Fragment>
      <MenuButton
        icon="Image"
        tooltip="Insert Image"
        disabled={!canInsert}
        onClick={handleClick}
      />
      {/* Only render file input when no custom picker is provided */}
      {!onImageSelect && (
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={onFileChange}
        />
      )}
    </Fragment>
  );
};

export default ImageButton;
