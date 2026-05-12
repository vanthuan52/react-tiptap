import parserHtml from "prettier/plugins/html.js";
import { format } from "prettier/standalone.js";

export const prettify = async (content: string) => {
  try {
    return await format(content, {
      parser: "html",
      plugins: [parserHtml],
      printWidth: 100,
      tabWidth: 2,
    });
  } catch (error) {
    console.error("Format failed:", error);
    return content;
  }
};
