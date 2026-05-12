import React, { type ReactNode, type JSX } from "react";

interface HeadingWithAnchorProps {
  level: number;
  id?: string;
  children?: ReactNode;
}

const HeadingWithAnchor = ({ level, children, id }: HeadingWithAnchorProps) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Heading id={id} style={{ scrollMarginTop: "5rem" }}>
      <a
        href={`#${id}`}
        style={{ color: "inherit", textDecoration: "none", fontWeight: "inherit" }}
        className="group relative hover:before:content-['#'] hover:before:absolute hover:before:-left-5 hover:before:opacity-50 hover:before:text-[0.9em]"
      >
        {children}
      </a>
    </Heading>
  );
};

export default HeadingWithAnchor;
