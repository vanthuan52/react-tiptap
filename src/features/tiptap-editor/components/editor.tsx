"use client";

import React, {
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";

import {
  useEditor,
  TiptapContent,
  Tiptap as TiptapProvider,
  type Editor,
  type Content,
  type UseEditorOptions,
} from "@tiptap/react";

import DragHandle from "./drag-handle";
import MenuBar from "./menu-bar";
import Menus from "./menus";
import Resizer from "./resizer";
import StatusBar from "./status-bar";
import { createExtensions } from "../extensions";
import { getEditorContent } from "../helpers/tiptap";
import { cssVar, throttle } from "../helpers/utils";
import {
  EditorConfigProvider,
  type EditorConfig,
} from "../context/editor-config";

import "../styles/index.css";

// -------------------------
// Types
// -------------------------

export type TiptapEditorProps = Omit<
  UseEditorOptions,
  "onUpdate" | "extensions"
> &
  EditorConfig & {
    disabled?: boolean;
    minHeight?: string | number;
    maxHeight?: string | number;
    maxWidth?: string | number;
    placeholder?: string | Record<string, string>;
    output: "html" | "json";
    /**
     * Throttle delay (ms) for the onChange callback.
     * @default 1500
     */
    delay?: number;
    onChange?: (value: Content) => void;
  };

export type TiptapEditorRef = Editor | null;

// -------------------------
// Component
// -------------------------

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (props, ref) => {
    const {
      output = "html",
      editable = true,
      disabled = false,
      delay = 1500,
      immediatelyRender = false,
      minHeight = 320,
      maxHeight,
      maxWidth,
      placeholder,
      onChange,
      // EditorConfig props — passed to context, not to Tiptap
      onImageUpload,
      onImageSelect,
      ...restProps
    } = props;

    const isEditable = editable && !disabled;

    const throttledUpdate = useCallback(
      throttle(({ editor }: { editor: Editor }) => {
        if (!onChange) return;
        const content = getEditorContent(editor, output);
        onChange(content);
      }, delay),
      [output, delay],
    );

    const extensions = useMemo(
      () => createExtensions({ placeholder }),
      [placeholder],
    );

    const editor = useEditor({
      ...restProps,
      editable: isEditable,
      extensions,
      immediatelyRender,
      editorProps: {
        ...restProps.editorProps,
        attributes: {
          spellcheck: "false",
          ...restProps.editorProps?.attributes,
        },
      },
      onUpdate: throttledUpdate,
    });

    useImperativeHandle(ref, () => editor);

    useEffect(() => {
      if (!editor || editor.isEditable === isEditable) return;
      editor.setEditable(isEditable);
      editor.view.dispatch(editor.view.state.tr);
    }, [editor, isEditable]);

    useEffect(() => {
      cssVar("--rte-editor-min-height", minHeight, "px");
      cssVar("--rte-editor-max-height", maxHeight, "px");
      cssVar("--rte-editor-max-width", maxWidth, "px");
    }, [minHeight, maxHeight, maxWidth]);

    if (!editor) {
      return null;
    }

    const editorConfig: EditorConfig = { onImageUpload, onImageSelect };

    return (
      <EditorConfigProvider config={editorConfig}>
        <TiptapProvider editor={editor}>
          <div className="rte-editor">
            <div className="rte-editor__container">
              <MenuBar />

              <TiptapContent className="rte-editor__content">
                <Menus />
                <DragHandle />
                <Resizer />
              </TiptapContent>

              <StatusBar />
            </div>
          </div>
        </TiptapProvider>
      </EditorConfigProvider>
    );
  },
);

TiptapEditor.displayName = "TiptapEditor";

export default TiptapEditor;
