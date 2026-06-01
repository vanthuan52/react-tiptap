# React Tiptap Editor

> A modern rich text editor built with [Tiptap v3](https://tiptap.dev/), [Radix UI](https://www.radix-ui.com/), and [Tailwind CSS v4](https://tailwindcss.com/). This is the **React + Vite** version of the reusable editor module.

> **Acknowledgments**: Inspired by and adapted from [ndtrung341/next-tiptap](https://github.com/ndtrung341/next-tiptap).

![React Tiptap Editor](https://i.imgur.com/WW1QbSW.png)

## Features

- **Text**: Bold, italic, underline, strike, code, sub/superscript, color, highlight, alignment
- **Structure**: Headings H1-H6, ordered/unordered lists, blockquotes, indent
- **Media**: Images (upload, resize, caption), YouTube embeds, tables (cell alignment, merge/split)
- **Code**: Syntax-highlighted code blocks via **Shiki** (dual light/dark theme)
- **Tools**: Drag & drop blocks, fullscreen, HTML source view (CodeMirror), Word (.docx) export
- **Rendering**: Client-side renderer for read-only display (`/preview`)
- **Theming**: Pure CSS variables (`--rte-*`) with dark mode toggle

## Demo Routes

- `/`: Editor page (ActionBar + PostForm + autosave + export)
- `/preview`: Read-only preview page

## Quick Start

```bash
git clone https://github.com/vanthuan52/react-tiptap
cd react-tiptap
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Type-check + production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Image uploads

The base editor does not ship with a storage provider. By default, selecting an
image inserts a local blob URL for preview. In production, pass your own
`onImageUpload` or `onImageSelect` adapter and return the stored image URL.

`mediaKey` is optional metadata for your storage layer, such as an S3 object key.

```tsx
<TiptapEditor
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    return {
      url: data.url,
      width: data.width,
      height: data.height,
      alt: data.alt,
      mediaKey: data.mediaKey,
    };
  }}
/>
```

## Integration

The core module lives in `src/features/tiptap-editor/`. You can copy this folder to another project and use it as a standalone feature module. Follow the **[Module Documentation](src/features/tiptap-editor/README.md)** for setup.

```tsx
import { useRef } from "react";
import TiptapEditor, { type TiptapEditorRef } from "./features/tiptap-editor";

export default function MyEditor() {
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <TiptapEditor
      ref={editorRef}
      output="html"
      minHeight={320}
      placeholder={{ paragraph: "Start typing..." }}
      onChange={(html) => console.log(html)}
    />
  );
}
```

Do not forget global imports in your app entry:

```ts
import "./styles/globals.css";
import "./features/tiptap-editor/styles/index.css";
```

## Tech Stack

| Technology                                    | Version |
| --------------------------------------------- | ------- |
| [Vite](https://vite.dev/)                     | 8       |
| [React](https://react.dev/)                   | 19      |
| [Tiptap](https://tiptap.dev/)                 | v3      |
| [Radix UI](https://www.radix-ui.com/)         | Latest  |
| [Tailwind CSS](https://tailwindcss.com/)      | v4      |
| [Shiki](https://shiki.style/)                 | 4       |
| [CodeMirror](https://codemirror.net/)         | 6       |
| [TypeScript](https://www.typescriptlang.org/) | 6       |

<br />
<p align="center"><strong>Built with React, Vite, and Tiptap</strong></p>
