import React from "react";

import { createPortal } from "react-dom";

import { cn } from "../../helpers/utils";

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const Dialog = ({ children, open, onOpenChange, className }: DialogProps) => {
  const onDismiss = () => {
    onOpenChange?.(false);
  };

  if (!open) return;

  return createPortal(
    <div role="dialog" className="rte-dialog" onClick={onDismiss}>
      <div className={cn("rte-dialog__content", className)} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector("body")!
  );
};

export default Dialog;
