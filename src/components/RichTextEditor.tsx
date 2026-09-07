import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold, Italic, Heading2, Heading3, Quote, List, ListOrdered, Link2, ImagePlus, Undo2,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  onRequestImage: () => Promise<string | null>;
  placeholder?: string;
};

const SIZES = [
  { key: "full", label: "Full width" },
  { key: "medium", label: "Medium" },
  { key: "small", label: "Small" },
  { key: "left", label: "Wrap left" },
  { key: "right", label: "Wrap right" },
] as const;

export function RichTextEditor({ value, onChange, onRequestImage, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedFigure, setSelectedFigure] = useState<HTMLElement | null>(null);
  const [figureSize, setFigureSize] = useState<string>("medium");

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  useEffect(() => {
    try {
      document.execCommand("defaultParagraphSeparator", false, "p");
      document.execCommand("styleWithCSS", false, "false");
    } catch {
      /* older browsers */
    }
  }, []);

  const emit = useCallback(() => onChange(ref.current?.innerHTML ?? ""), [onChange]);

  const run = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const insertImage = async () => {
    const url = await onRequestImage();
    if (!url) return;
    run(
      "insertHTML",
      `<figure data-size="medium"><img src="${url}" alt="" /><figcaption><br/></figcaption></figure><p><br/></p>`,
    );
  };

  const insertLink = () => {
    const url = window.prompt("Link URL");
    if (url) run("createLink", url);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const mod = e.metaKey || e.ctrlKey;
    if (!mod) return;
    const key = e.key.toLowerCase();
    if (key === "b") { e.preventDefault(); run("bold"); }
    else if (key === "i") { e.preventDefault(); run("italic"); }
    else if (key === "u") { e.preventDefault(); run("underline"); }
    else if (key === "k") { e.preventDefault(); insertLink(); }
  };

  const onClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const fig = target.closest("figure") as HTMLElement | null;
    setSelectedFigure(fig);
    if (fig) setFigureSize(fig.getAttribute("data-size") ?? "full");
  };

  const applySize = (size: string) => {
    if (!selectedFigure) return;
    selectedFigure.setAttribute("data-size", size);
    setFigureSize(size);
    emit();
  };

  return (
    <div className="mt-1 overflow-visible rounded-xl border border-input bg-background">
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 rounded-t-xl border-b border-border bg-secondary/95 px-2 py-1.5 backdrop-blur">
        <ToolbarButton label="Bold (⌘B)" onClick={() => run("bold")}><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Italic (⌘I)" onClick={() => run("italic")}><Italic className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Heading" onClick={() => run("formatBlock", "<h2>")}><Heading2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Subheading" onClick={() => run("formatBlock", "<h3>")}><Heading3 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Quote" onClick={() => run("formatBlock", "<blockquote>")}><Quote className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Bullet list" onClick={() => run("insertUnorderedList")}><List className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => run("insertOrderedList")}><ListOrdered className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Link (⌘K)" onClick={insertLink}><Link2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Insert photo" onClick={() => void insertImage()}><ImagePlus className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Undo (⌘Z)" onClick={() => run("undo")}><Undo2 className="h-4 w-4" /></ToolbarButton>

        {selectedFigure ? (
          <div className="ml-auto flex items-center gap-1 rounded-lg bg-background px-1.5 py-1">
            <span className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Photo
            </span>
            {SIZES.map((s) => (
              <button
                key={s.key}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => applySize(s.key)}
                className={
                  "rounded-md px-2 py-1 text-xs font-semibold transition-colors " +
                  (figureSize === s.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary")
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        onKeyDown={onKeyDown}
        onClick={onClick}
        data-placeholder={placeholder}
        className="prose-editor min-h-[22rem] px-4 py-4 text-base font-normal leading-relaxed outline-none"
      />
    </div>
  );
}

function ToolbarButton({
  label, onClick, children,
}: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-background hover:text-primary"
    >
      {children}
    </button>
  );
}
