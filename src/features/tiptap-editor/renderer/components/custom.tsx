import React, { Suspense } from "react";
import type { ReactElement } from "react";
import { type Components } from "rehype-react";

import CopyButton from "./copy-button";
import HeadingWithAnchor from "./heading-with-anchor";

const SyntaxHighlighter = React.lazy(() => import("./syntax-highlighter"));

interface PreProps {
  children?: React.ReactNode;
  [key: string]: any;
}

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

interface ImageProps {
  src: string;
  alt?: string;
  width: string | number;
  "data-width": string | number;
  "data-height": string | number;
  [key: string]: any;
}

export const components: Partial<Components> = {
  h2: (props) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props) => <HeadingWithAnchor level={4} {...props} />,
  img: ({ src, alt, ...props }: ImageProps) => (
    <img
      src={src}
      alt={alt || ""}
      className="rounded-lg"
      loading="lazy"
    />
  ),
  iframe: ({ ...props }) => (
    <iframe
      className="w-full h-full aspect-video mx-auto rounded-lg"
      {...props}
    />
  ),
  pre: ({ children, ...props }: PreProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const code = (children as ReactElement).props.children;
    return (
      <div className="relative group not-prose">
        <CopyButton code={String(code)} />
        <pre {...(props as any)}>{children}</pre>
      </div>
    );
  },
  code: ({ children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(props.className || "");
    const code = String(children).replace(/\n$/, "");
    return match ? (
      <Suspense fallback={<code {...props}>{children}</code>}>
        <SyntaxHighlighter language={match[1]} content={code} />
      </Suspense>
    ) : (
      <code {...props}>{children}</code>
    );
  },
  table: ({ children, ...props }: any) => (
    <div className="table-wrapper">
      <table
        className="w-full"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  tr: (props: any) => (
    <tr
      className="border-b last:border-b-0 border-b-[#d1d9e0] dark:border-b-[#3d444d]"
      {...props}
    />
  ),
  td: (props: any) => <td className="px-2.5 py-3.5" {...props} />,
  th: (props: any) => <td className="px-2.5 py-3.5 font-bold" {...props} />,
};
