import { type JSONContent } from "@tiptap/react";

export const htmlMock = `
<h2>Welcome to Rich Text Editor</h2>
<p>A modern rich text editor built with <strong>Tiptap</strong> and <strong>Radix UI</strong>. Supports text formatting, media embedding, and advanced content structures.</p>

<h2>Text Formatting</h2>
<p>Supports various text styles: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <code>inline code</code>.</p>
<p>Also supports <sub>subscript</sub> and <sup>superscript</sup>.</p>

<h2>Text Styling</h2>
<p>Customize with <span style="color: rgb(255, 0, 0)">custom colors</span> and <span style="background-color: rgb(255, 255, 0)">background highlights</span> to emphasize important content.</p>
<p>You can combine both: <span style="background-color: rgb(59, 130, 246); color: rgb(255, 255, 255)">Blue background with white text</span> creates a tag-like appearance.</p>

<h2>Text Alignment</h2>
<p style="text-align: left">This paragraph is left-aligned, the default alignment for most text content.</p>
<p style="text-align: center">This paragraph is center-aligned, perfect for titles or important statements.</p>
<p style="text-align: right">This paragraph is right-aligned, often used for signatures or timestamps.</p>
<p style="text-align: justify">This paragraph uses justified alignment. When you have longer text content, justified alignment distributes the words evenly across the line width, creating clean edges on both sides.</p>

<h2>Headings Structure</h2>
<p>Supports heading levels from H1 to H6 for clear document hierarchy.</p>

<h2>Lists</h2>
<h3>Unordered Lists</h3>
<ul>
  <li><p>First item</p></li>
  <li><p>Second item with <strong>bold text</strong></p></li>
  <li>
    <p>Third item with nested list:</p>
    <ul>
      <li><p>Nested item 1</p></li>
      <li><p>Nested item 2 with <em>italic</em></p></li>
    </ul>
  </li>
</ul>
<h3>Ordered Lists</h3>
<ol>
  <li><p>Install dependencies</p></li>
  <li><p>Configure the editor</p></li>
  <li><p>Deploy your application</p></li>
</ol>

<h2>Blockquotes</h2>
<blockquote>
  <p>"The best way to predict the future is to invent it." <strong>- Alan Kay</strong></p>
</blockquote>

<h2>Code Blocks</h2>
<h3>JavaScript</h3>
<pre><code class="language-javascript">function greetUser(name) {
  const greeting = \`Hello, \${name}! Welcome to Tiptap Editor.\`;
  console.log(greeting);
  return greeting;
}

const message = greetUser('World');
console.log(message);</code></pre>
<h3>React (TSX)</h3>
<pre><code class="language-tsx">import { useRef } from 'react';
import TiptapEditor, { type TiptapEditorRef } from '../../tiptap-editor';

export default function MyEditor() {
  const editorRef = useRef&lt;TiptapEditorRef&gt;(null);

  return (
    &lt;TiptapEditor
      ref={editorRef}
      output="html"
      minHeight={320}
      onChange={(content) =&gt; console.log(content)}
    /&gt;
  );
}</code></pre>

<h2>Tables</h2>
<table style="min-width: 105px">
  <colgroup>
    <col style="min-width: 35px" />
    <col style="min-width: 35px" />
    <col style="min-width: 35px" />
  </colgroup>
  <tbody>
    <tr>
      <th colspan="1" rowspan="1"><p>Feature</p></th>
      <th colspan="1" rowspan="1"><p>Description</p></th>
      <th colspan="1" rowspan="1"><p>Status</p></th>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p><strong>Text Formatting</strong></p></td>
      <td colspan="1" rowspan="1"><p>Bold, italic, underline, strikethrough, code</p></td>
      <td colspan="1" rowspan="1"><p>✅ Available</p></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p><strong>Images</strong></p></td>
      <td colspan="1" rowspan="1"><p>Upload, resize, and add captions</p></td>
      <td colspan="1" rowspan="1"><p>✅ Available</p></td>
    </tr>
    <tr>
      <td colspan="1" rowspan="1"><p><strong>Tables</strong></p></td>
      <td colspan="1" rowspan="1"><p>Resizable columns with cell formatting</p></td>
      <td colspan="1" rowspan="1"><p>✅ Available</p></td>
    </tr>
  </tbody>
</table>

<h2>Images</h2>
<h3>Standalone Image</h3>
<img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=500&fit=crop" alt="Developer workspace" data-width="800" data-height="500" />
<h3>Image with Caption</h3>
<figure>
  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop" alt="Coding on laptop" data-width="800" data-height="500" />
  <figcaption>A developer working on a modern laptop with dual monitors</figcaption>
</figure>

<h2>Links</h2>
<p>Add <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev">external links</a> to reference other resources, or create <a target="_blank" rel="noopener noreferrer nofollow" href="#internal">internal links</a> for navigation within your document.</p>

<h2>Conclusion</h2>
<p>This editor provides a comprehensive set of features for creating rich, engaging content. Whether you're building a blog, documentation site, or content management system, it offers the flexibility and power you need.</p>
`;

export const mockData = {
  title: "Building a Modern Rich Text Editor with Tiptap",
  html: htmlMock,
  json: { type: "doc", content: [] } as JSONContent,
  cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=675&fit=crop",
  author: "Tiptap Demo",
  readingTime: 5,
  createdAt: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
};
