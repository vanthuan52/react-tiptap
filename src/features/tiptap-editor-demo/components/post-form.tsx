"use client";

import { useCallback, useEffect, useRef } from "react";

import { Controller, useForm } from "react-hook-form";

import TiptapEditor, {
  type TiptapEditorRef,
} from "../../tiptap-editor";
import type { Post } from "../services/post";

type PostFormValues = Pick<Post, "title" | "html">;

interface PostFormProps {
  post: Post | null;
  editable: boolean;
  onSave: (values: Partial<Post>) => void;
}

export default function PostForm({ post, editable, onSave }: PostFormProps) {
  const editorRef = useRef<TiptapEditorRef>(null);
  const { control, reset, watch } = useForm<PostFormValues>({
    defaultValues: { title: "", html: "" },
  });

  // Sync when post loads
  useEffect(() => {
    if (post) reset({ title: post.title, html: post.html });
  }, [post, reset]);

  // Auto‑save on change
  useEffect(() => {
    const sub = watch((values, { type }) => {
      if (type !== "change") return;
      const editor = editorRef.current;
      const wordCount = editor?.storage?.characterCount?.words() ?? 0;
      const readingTime = Math.max(1, Math.ceil(wordCount / 150));
      const json = editor?.getJSON();
      onSave({ ...values, json, readingTime });
    });
    return () => sub.unsubscribe();
  }, [watch, onSave]);

  const fieldLabel = (text: string) => (
    <label className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
      <div className="w-1 h-5 bg-indigo-500 rounded-full" />
      {text}
    </label>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        {fieldLabel("Title")}
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              disabled={!editable}
              className="w-full px-4 py-2.5 shadow border border-[#d1d9e0] rounded-md bg-white dark:bg-[#0d1017] dark:text-white dark:border-[#3d444d] outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
              placeholder="Enter post title..."
            />
          )}
        />
      </div>

      {/* Content */}
      <div>
        {fieldLabel("Content")}
        <Controller
          control={control}
          name="html"
          render={({ field }) => (
            <TiptapEditor
              ref={editorRef}
              editable={editable}
              output="html"
              content={post?.html}
              minHeight={320}
              maxHeight={640}
              maxWidth={700}
              onChange={field.onChange}
              placeholder={{
                paragraph: "Type your content here...",
                imageCaption: "Type caption for image (optional)",
              }}
              onImageUpload={async (file: File) => {
                // Demo: ObjectURL — replace with real upload in production
                const url = URL.createObjectURL(file);
                return { url, alt: file.name };
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
