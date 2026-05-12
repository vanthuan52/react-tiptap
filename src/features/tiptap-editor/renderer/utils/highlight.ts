import type { JSX } from "react";

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import * as prod from "react/jsx-runtime";

import { codeToHast } from "../../lib/shiki";

export async function highlight(code: string, lang: string) {
  const out = await codeToHast(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return toJsxRuntime(out as any, {
    Fragment: prod.Fragment,
    jsx: prod.jsx,
    jsxs: prod.jsxs,
    components: {
      // Strip Shiki's <pre> wrapper — the custom.tsx pre component handles that
      pre: ({ children }) => children as any,
      // Strip Shiki's inline background-color from <code> — let CSS control it
      code: ({ children, style: _style, ...props }: any) =>
        prod.jsx("code", { ...props, children }),
    },
  }) as JSX.Element;
}

// import type { JSX } from "react";

// import { toJsxRuntime } from "hast-util-to-jsx-runtime";
// import * as prod from "react/jsx-runtime";
// import { codeToHast, codeToHtml } from "shiki/bundle/full";

// export async function highlight(code: string, lang: string) {
//   const out = await codeToHast(code, {
//     lang,
//     themes: {
//       light: "github-light-default",
//       dark: "one-dark-pro",
//     },
//     //  structure: "inline",
//   });

//   return toJsxRuntime(out as any, {
//     Fragment: prod.Fragment,
//     jsx: prod.jsx,
//     jsxs: prod.jsxs,
//     components: {
//       pre: ({ children }) => children as any,
//     },
//   }) as JSX.Element;
// }
