import React, { useState } from "react";

import Button from "../ui/button";
import Input from "../ui/input";
import Label from "../ui/label";
import Dialog from "../ui/dialog";
import Icon from "../ui/icon";

interface YoutubeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (url: string) => void;
}

const YOUTUBE_PLACEHOLDER = "https://www.youtube.com/watch?v=...";

const isValidYoutubeUrl = (url: string): boolean => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)[\w-]{11}/.test(
    url,
  );
};

const YoutubeDialog = ({
  open,
  onOpenChange,
  onInsert,
}: YoutubeDialogProps) => {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [error, setError] = useState("");

  const handleInsert = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a YouTube URL.");
      return;
    }
    if (!isValidYoutubeUrl(trimmed)) {
      setError("This doesn't look like a valid YouTube URL.");
      return;
    }
    onInsert(trimmed);
    handleClose();
  };

  const handleClose = () => {
    setUrl("");
    setError("");
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleInsert();
    if (e.key === "Escape") handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="rte-youtube-dialog">
        {/* Header */}
        <div className="rte-youtube-dialog__header">
          <div className="rte-youtube-dialog__title">
            <Icon name="Youtube" size={18} />
            <span>Embed YouTube Video</span>
          </div>
          <button className="rte-youtube-dialog__close" onClick={handleClose}>
            <Icon name="Close" size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="rte-youtube-dialog__body">
          <Label as="label" htmlFor="rte-youtube-url">
            YouTube URL
          </Label>
          <Input
            id="rte-youtube-url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder={YOUTUBE_PLACEHOLDER}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {error && <p className="rte-youtube-dialog__error">{error}</p>}
          <p className="rte-youtube-dialog__hint">
            Supports youtube.com/watch, youtu.be, and YouTube Shorts links.
          </p>
        </div>

        {/* Footer */}
        <div className="rte-youtube-dialog__footer">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleInsert}>Insert Video</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default YoutubeDialog;
