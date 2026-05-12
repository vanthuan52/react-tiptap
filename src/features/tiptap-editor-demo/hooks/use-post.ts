"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import postService, { type Post } from "../services/post";

type SaveStatus = "idle" | "saving" | "saved";

function debounce<T extends (...args: any[]) => any>(fn: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

export function usePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [post, setPost] = useState<Post | null>(null);

  const savePost = useCallback(async (values: Partial<Post>) => {
    try {
      setSaveStatus("saving");
      postService.save(values);
      setPost((prev) => (prev ? { ...prev, ...values } : null));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("idle");
    }
  }, []);

  const debouncedSave = useMemo(() => debounce(savePost, 1500), [savePost]);

  useEffect(() => {
    postService.get().then((p) => {
      setPost(p);
      setIsLoading(false);
    });
  }, []);

  return { savePost, debouncedSave, saveStatus, isLoading, post };
}
