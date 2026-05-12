"use client";

import { createElement, Fragment, useEffect, useRef, useState } from "react";

import { components } from "./components/custom";
import { createProcessor } from "./utils/processor";

interface TiptapRendererProps {
  children: string;
  className?: string;
}

const TiptapRenderer = ({ children, className = "" }: TiptapRendererProps) => {
  const [Content, setContent] = useState(createElement(Fragment));
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;

    (async function () {
      const processor = createProcessor({ components });
      const output = await processor.process(children);
      if (!cancelRef.current) setContent(output.result);
    })();

    return () => {
      cancelRef.current = true;
    };
  }, [children]);

  return (
    <div className={`rte-content ${className}`.trim()}>{Content}</div>
  );
};

export default TiptapRenderer;
