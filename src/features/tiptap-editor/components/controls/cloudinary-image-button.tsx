import React from "react";

import { useImage } from "../../hooks/use-image";
import useModal from "../../hooks/use-modal";
import { MenuButton } from "../menu-button";
import Dialog from "../ui/dialog";
import MediaLibrary from "../media-library";

const CloudinaryImageButton = () => {
  const { canInsert, insert } = useImage();
  const { open, handleOpen, handleClose } = useModal();

  return (
    <>
      <MenuButton
        icon="ImagePlus"
        tooltip="Cloudinary Image"
        disabled={!canInsert}
        onClick={handleOpen}
      />
      <Dialog open={open} onOpenChange={handleClose} className="rte-dialog__content--media">
        <MediaLibrary
          onClose={handleClose}
          onInsert={(image) => {
            insert({
              src: image.url,
              width: image.width,
              height: image.height,
            });
            handleClose();
          }}
        />
      </Dialog>
    </>
  );
};

export default CloudinaryImageButton;
