/** Extract YouTube video ID for embed */
export function youtubeEmbedUrl(url) {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export function resolveMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const base = import.meta.env.VITE_API_URL || "";
  return `${base}${url}`;
}

/** Simple markdown-like rendering: ## headers, - lists, ``` code blocks */
export function parseLessonBlocks(content) {
  if (!content) return [];

  const lines = content.split("\n");
  const blocks = [];
  let paragraph = [];
  let list = null;
  let code = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join("\n") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list?.items.length) blocks.push(list);
    list = null;
  };

  const flushCode = () => {
    if (code) {
      blocks.push(code);
      code = null;
    }
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      if (code) {
        flushCode();
      } else {
        code = { type: "code", text: "" };
      }
      continue;
    }

    if (code) {
      code.text += (code.text ? "\n" : "") + line;
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: line.slice(3).trim() });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      if (!list) list = { type: "list", items: [] };
      list.items.push(line.slice(2).trim());
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  flushCode();

  return blocks;
}
