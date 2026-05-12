import type { Root, Element } from "hast";
import * as production from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact, { type Components } from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";

interface ProcessorOptions {
  components?: Partial<Components>;
}

const addHeadingIds = () => {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (["h2", "h3", "h4"].includes(node.tagName)) {
        const text =
          node.children[0].type === "text" ? node.children[0].value : "";
        node.properties = { ...node.properties, id: slugify(text) };
      }
    });
    return tree;
  };
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]+/g, "")
    .replace(/[-\s]+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");
}

// Strip whitespace-only text nodes from table containers and remove colgroup elements.
// React 19 does not allow text nodes inside colgroup/tbody/thead/tr.
const stripTableWhitespace = () => {
  const TABLE_CONTAINERS = new Set([
    "table",
    "tbody",
    "thead",
    "tfoot",
    "tr",
    "colgroup",
  ]);

  return (tree: Root) => {
    // Remove colgroup entirely (used only for column widths in Tiptap editor)
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "colgroup" && parent && index !== undefined) {
        (parent as Element).children.splice(index, 1);
        return ["skip", index] as any;
      }
    });

    // Remove whitespace-only text nodes from remaining table containers
    visit(tree, "element", (node: Element) => {
      if (TABLE_CONTAINERS.has(node.tagName)) {
        node.children = node.children.filter(
          (child) => !(child.type === "text" && /^\s*$/.test(child.value)),
        );
      }
    });

    return tree;
  };
};

export function createProcessor({ components }: ProcessorOptions = {}) {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(addHeadingIds)
    .use(stripTableWhitespace)
    .use(rehypeReact, {
      ...production,
      components,
    });
}
