const ALLOWED_TAGS = new Set([
  "p","br","strong","b","em","i","u","s","h2","h3","blockquote","ul","ol","li",
  "a","img","figure","figcaption","hr","code","pre","span","div",
]);

const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ["href", "title", "target", "rel"],
  img: ["src", "alt", "title"],
};

const isSafeUrl = (value: string) => {
  const v = value.trim().toLowerCase();
  return !v.startsWith("javascript:") && !v.startsWith("data:text") && !v.startsWith("vbscript:");
};

/**
 * Allowlist sanitizer for admin-authored post HTML. Works on server and client
 * without a DOM: strips disallowed tags, all event handlers, and unsafe URLs.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|link|meta)[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|link|meta)\b[^>]*\/?>/gi, "");

  out = out.replace(/<\s*(\/?)([a-zA-Z0-9]+)([^>]*)>/g, (_m, close: string, rawTag: string, rawAttrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (close) return `</${tag}>`;

    const allowed = ALLOWED_ATTRS[tag] ?? [];
    const attrs: string[] = [];
    const attrRe = /([a-zA-Z0-9:_-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
    let m: RegExpExecArray | null;
    while ((m = attrRe.exec(rawAttrs)) !== null) {
      const name = m[1]!.toLowerCase();
      const value = m[3] ?? m[4] ?? "";
      if (!allowed.includes(name)) continue;
      if ((name === "href" || name === "src") && !isSafeUrl(value)) continue;
      attrs.push(`${name}="${value.replace(/"/g, "&quot;")}"`);
    }
    if (tag === "a") {
      if (!attrs.some((a) => a.startsWith("target="))) attrs.push('target="_blank"');
      if (!attrs.some((a) => a.startsWith("rel="))) attrs.push('rel="noopener noreferrer"');
    }
    if (tag === "img" && !attrs.some((a) => a.startsWith("src="))) return "";
    return `<${tag}${attrs.length ? " " + attrs.join(" ") : ""}>`;
  });

  return out;
}

export function isHtmlContent(content: string): boolean {
  return /<(p|h2|h3|ul|ol|img|blockquote|figure|div|br)\b/i.test(content);
}

export function countImages(content: string): number {
  return (content.match(/<img\b/gi) ?? []).length;
}

export function plainText(content: string, limit = 200): string {
  const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > limit ? text.slice(0, limit - 1).trimEnd() + "…" : text;
}
