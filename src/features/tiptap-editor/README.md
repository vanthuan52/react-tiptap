# TiptapEditor — Feature Module

A complete WYSIWYG rich text editor built on [Tiptap v3](https://tiptap.dev/). Copy the folder, install deps, use immediately.

> **Philosophy**: This module is "immutable" — all customizations (themes, upload adapters, dark mode) are done externally via CSS variables and props. No need to modify anything inside.

---

## Installation

### 1. Copy the module

```
src/features/tiptap-editor/   ← copy this entire folder
```

### 2. Install dependencies

```bash
npm install \
  @tiptap/core @tiptap/react @tiptap/pm \
  @tiptap/starter-kit @tiptap/extensions \
  @tiptap/extension-drag-handle @tiptap/extension-drag-handle-react \
  @tiptap/extension-file-handler @tiptap/extension-image \
  @tiptap/extension-list @tiptap/extension-subscript \
  @tiptap/extension-superscript @tiptap/extension-table \
  @tiptap/extension-text-align @tiptap/extension-text-style \
  @tiptap/extension-youtube @tiptap/extension-code-block \
  @tiptap/extension-link \
  @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-tooltip \
  clsx react-colorful react-icons react-window \
  prosemirror-highlight shiki lowlight \
  prettier codemirror @codemirror/autocomplete @codemirror/commands \
  @codemirror/lang-html @codemirror/language @codemirror/state @codemirror/view \
  rehype rehype-react docx
```

> Requires **Tailwind CSS v4**.

### 3. Import styles

```tsx
// app/layout.tsx (or src/main.tsx for Vite/CRA)
import "@/features/tiptap-editor/styles/index.css";
```

### 4. Add CSS variables

```css
/* globals.css */
:root {
  --rte-bg: #fff;
  --rte-fg: #1f2328;
  --rte-border: #d1d9e0;
  --rte-primary: #0969da;
  --rte-primary-fg: #fff;
  --rte-secondary: #f0f1f3;
  --rte-secondary-fg: #59636e;
  --rte-muted: #f6f8fa;
  --rte-muted-fg: #59636e;
  --rte-accent: #818b981f;
  --rte-accent-fg: #59636e;
  --rte-tooltip: #25292e;
  --rte-tooltip-fg: #f0f0f0;
  --rte-overlay: #32324d33;
  --rte-radius: 0.5rem;
  --rte-editor-font-size: 15px;
  --rte-editor-line-height: 1.6;
  --rte-editor-code-bg: #f6f8fa;
  --rte-editor-scrollbar: #00000040;
  --rte-editor-selection: #2383e247;

  /* Shiki: activate light theme */
  .shiki span { color: var(--shiki-light); }
}
```

---

## Usage

```tsx
"use client";
import { useRef } from "react";
import TiptapEditor, { type TiptapEditorRef } from "@/features/tiptap-editor";

export default function Page() {
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <TiptapEditor
      ref={editorRef}
      output="html"
      placeholder={{ paragraph: "Start typing..." }}
      onChange={(html) => console.log(html)}
    />
  );
}
```

### With React Hook Form

```tsx
<Controller
  control={control}
  name="content"
  render={({ field }) => (
    <TiptapEditor
      ref={editorRef}
      output="html"
      onChange={field.onChange}
    />
  )}
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `output` | `"html" \| "json"` | `"html"` | Output format |
| `content` | `string \| JSONContent` | — | Initial content |
| `editable` | `boolean` | `true` | Allow editing |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `minHeight` | `string \| number` | `320` | Min height (px) |
| `maxHeight` | `string \| number` | — | Max height (px) |
| `maxWidth` | `string \| number` | — | Max width (px) |
| `placeholder` | `string \| Record<string, string>` | — | Placeholder text |
| `delay` | `number` | `1500` | onChange debounce (ms) |
| `onChange` | `(content) => void` | — | Content change callback |
| `onImageUpload` | `(file: File) => Promise<ImageUploadResult>` | — | Upload handler |
| `onImageSelect` | `() => Promise<ImageUploadResult \| null>` | — | Media picker handler |

### ImageUploadResult

```ts
type ImageUploadResult = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  mediaKey?: string;
};
```

`mediaKey` is optional storage metadata. Use it for values like an S3 object key,
asset id, or any identifier your backend needs later. When present, it is stored
on the image node and rendered as `data-media-key`.

### Ref

```tsx
editorRef.current?.getHTML();
editorRef.current?.getJSON();
editorRef.current?.storage.characterCount.words();
editorRef.current?.commands.setContent("<p>New</p>");
editorRef.current?.commands.focus();
```

---

## Image Upload

**Priority**: `onImageSelect` > `onImageUpload` > local blob URL (default)

The module intentionally does not include a storage provider. The default local
blob URL is useful for previews only; production apps should provide an upload
or picker adapter.

### Upload to server

```tsx
<TiptapEditor
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return {
      url: data.url,
      alt: data.alt,
      width: data.width,
      height: data.height,
      mediaKey: data.mediaKey,
    };
  }}
/>
```

### Custom media picker

```tsx
<TiptapEditor
  onImageSelect={async () => {
    const image = await openMyMediaLibrary();
    return image
      ? {
          url: image.url,
          width: image.width,
          height: image.height,
          mediaKey: image.mediaKey,
        }
      : null;
  }}
/>
```

---

## Renderer (Read-only)

### Client-side (CSR)

```tsx
"use client";
import { TiptapClientRenderer } from "@/features/tiptap-editor";

<TiptapClientRenderer>{html}</TiptapClientRenderer>
```

### Server-side (SSR)

```tsx
import { TiptapServerRenderer } from "@/features/tiptap-editor";

<TiptapServerRenderer>{html}</TiptapServerRenderer>
```

Both wrap content in `<div class="rte-content">` with full styles applied.

---

## Dark Mode

The module reads `--rte-*` CSS variables only — override them to support dark mode.

### Tailwind class-based (`.dark` on `<html>`)

If you use `next-themes` or toggle a `.dark` class manually, you **must** configure Tailwind v4 to use class-based dark mode. Add this to your `globals.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --rte-bg: #0d1017;
  --rte-fg: #f0f6fc;
  --rte-border: #3d444d;
  --rte-primary: #4493f8;
  --rte-secondary: #2e373e;
  --rte-secondary-fg: #b1b8c0;
  --rte-muted: #1a2029;
  --rte-muted-fg: #b1b8c0;
  --rte-accent: #2d3440;
  --rte-accent-fg: #b1b8c0;
  --rte-tooltip: #3d444d;
  --rte-tooltip-fg: #f0f0f0;
  --rte-overlay: #ffffff30;
  --rte-editor-code-bg: #1a2029;
  --rte-editor-scrollbar: #ffffff40;

  /* Shiki: activate dark theme */
  .ProseMirror pre code span { color: var(--rte-shiki-dark); }
  .shiki span { color: var(--shiki-dark); }
}
```

### System preference

```css
@media (prefers-color-scheme: dark) {
  :root {
    --rte-bg: #0d1017;
    --rte-fg: #f0f6fc;
    /* ... same variables ... */
  }
}
```
