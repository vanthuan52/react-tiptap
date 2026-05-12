import React, { useState } from "react";

import { useEditorState, useTiptap } from "@tiptap/react";

import { MenuButton } from "../menu-button";
import YoutubeDialog from "./youtube-dialog";

const YoutubeButton = () => {
  const { editor } = useTiptap();
  const [open, setOpen] = useState(false);

  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isActive: editor.isActive("youtube"),
        canSet:
          editor.isEditable &&
          editor.can().setYoutubeVideo({
            src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          }),
      };
    },
  });

  const handleInsert = (url: string) => {
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  return (
    <>
      <MenuButton
        icon="Youtube"
        tooltip="Youtube"
        active={editorState.isActive}
        disabled={!editorState.canSet}
        onClick={() => setOpen(true)}
      />
      <YoutubeDialog
        open={open}
        onOpenChange={setOpen}
        onInsert={handleInsert}
      />
    </>
  );
};

export default YoutubeButton;
