import { useEffect, useRef } from "react";
import {
  Bold, Italic, Heading2, Heading3, Quote, List, ListOrdered, Link2, ImagePlus, Undo2,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  onRequestImage: () => Promise<string | null>;
  placeholder?: string;
};

export function RichTextEditor({ value, onChange, onRequestImage, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  const emit = () => onChange(ref.current?.innerHTML ?? "");

  const run = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const insertImage = async () => {
    const url = await onRequestImage();
    if (!url) return;
    run("insertHTML", `<figure><img src="${url}" alt="" /></figure><p><br/></p>`);
  };

  const insertLink = () => {
    const url = window.prompt("Link URL");
    if (url) run("createLink", url);
  };

  return (
    <div className="mt-1 overflow-hidden rounded-xl border border-input bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-secondary/60 px-2 py-1.5">
        <ToolbarButton label="Bold" onClick={() => run("bold")}><Bold className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => run("italic")}><Italic className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Heading" onClick={() => run("formatBlock", "<h2>")}><Heading2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Subheading" onClick={() => run("formatBlock", "<h3>")}><Heading3 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Quote" onClick={() => run("formatBlock", "<blockquote>")}><Quote className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Bullet list" onClick={() => run("insertUnorderedList")}><List className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => run("insertOrderedList")}><ListOrdered className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Link" onClick={insertLink}><Link2 className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Insert photo" onClick={() => void insertImage()}><ImagePlus className="h-4 w-4" /></ToolbarButton>
        <ToolbarButton label="Undo" onClick={() => run("undo")}><Undo2 className="h-4 w-4" /></ToolbarButton>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        data-placeholder={placeholder}
        className="prose-editor min-h-[22rem] px-4 py-4 text-base leading-relaxed outline-none"
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
