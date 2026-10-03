"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Editor } from "@tiptap/react";

type BlogEditorProps = {
  onChange: (content: string) => void;
};

export function BlogEditor({ onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: "<p>Start writing your article...</p>",

    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden border border-stone-500">
      <EditorToolbar editor={editor} />

      <div className="min-h-[500px] p-6">
        <EditorContent className="border-b border-stone-500" editor={editor} />
      </div>
    </div>
  );
}

type EditorToolbarProps = {
  editor: Editor;
};

export function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex items-center bg-[#131313] gap-1 border-b p-2 border-stone-500">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="rounded px-3 py-2 text-sm hover:bg-stone-700"
      >
        B
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="rounded px-3 py-2 text-sm italic hover:bg-stone-700"
      >
        I
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="rounded px-3 py-2 text-sm underline hover:bg-stone-700"
      >
        U
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="rounded px-3 py-2 text-sm hover:bg-stone-700"
      >
        H2
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="rounded px-3 py-2 text-sm hover:bg-stone-700"
      >
        • List
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="rounded px-3 py-2 text-sm hover:bg-stone-700"
      >
        1. List
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="rounded px-3 py-2 text-sm hover:bg-stone-700"
      >
        Quote
      </button>
    </div>
  );
}
