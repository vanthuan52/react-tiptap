"use client";

import { useEffect, useRef, useState } from "react";

import { highlight } from "../utils/highlight";

interface SyntaxHighlighterProps {
  content?: string;
  language?: string;
}

const SyntaxHighlighter = ({ content, language }: SyntaxHighlighterProps) => {
  const [nodes, setNodes] = useState<any>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (!content || !language) return;
    cancelRef.current = false;

    highlight(content, language).then((result) => {
      if (!cancelRef.current) setNodes(result);
    });

    return () => {
      cancelRef.current = true;
    };
  }, [content, language]);

  // Fallback while loading: plain code without invalid HTML attributes
  if (!nodes) return <code>{content}</code>;
  return nodes;
};

export default SyntaxHighlighter;
