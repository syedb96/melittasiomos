import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon, Undo, Redo, Code } from "lucide-react";
import { useCallback } from "react";

interface Props {
  value: any;
  onChange: (json: any, html: string) => void;
  placeholder?: string;
  onOpenMedia?: (cb: (url: string) => void) => void;
}

const Btn = ({ active, onClick, children, title }: any) => (
  <button type="button" onClick={onClick} title={title}
    className={`p-2 rounded hover:bg-muted transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
    {children}
  </button>
);

export default function RichTextEditor({ value, onChange, placeholder, onOpenMedia }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4 max-w-full h-auto" } }),
      Youtube.configure({ width: 720, height: 405, HTMLAttributes: { class: "rounded-lg my-4 w-full aspect-video" } }),
      Placeholder.configure({ placeholder: placeholder ?? "Start writing your content…" }),
    ],
    content: value && Object.keys(value).length ? value : "<p></p>",
    onUpdate: ({ editor }) => onChange(editor.getJSON(), editor.getHTML()),
    editorProps: { attributes: { class: "prose prose-sm max-w-none focus:outline-none min-h-[400px] px-4 py-3" } },
  });

  const insertLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL", editor.getAttributes("link").href ?? "https://");
    if (url === null) return;
    if (url === "") return editor.chain().focus().unsetLink().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertImage = useCallback(() => {
    if (!editor) return;
    if (onOpenMedia) {
      onOpenMedia((url) => editor.chain().focus().setImage({ src: url }).run());
    } else {
      const url = window.prompt("Image URL");
      if (url) editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor, onOpenMedia]);

  const insertYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("YouTube URL");
    if (url) (editor as Editor).commands.setYoutubeVideo({ src: url });
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-border rounded-lg bg-card">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
        <Btn title="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={16} /></Btn>
        <Btn title="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></Btn>
        <Btn title="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></Btn>
        <Btn title="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={16} /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn title="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></Btn>
        <Btn title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></Btn>
        <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn title="Link" active={editor.isActive("link")} onClick={insertLink}><LinkIcon size={16} /></Btn>
        <Btn title="Image" onClick={insertImage}><ImageIcon size={16} /></Btn>
        <Btn title="YouTube" onClick={insertYoutube}><YoutubeIcon size={16} /></Btn>
        <span className="w-px h-5 bg-border mx-1" />
        <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></Btn>
        <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
