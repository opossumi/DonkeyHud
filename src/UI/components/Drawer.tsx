import React from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}

export const Drawer = ({ children, onClose, open }: DialogProps) => {
  const className = open
    ? "translate-x-0 opacity-100 "
    : "-translate-x-full opacity-0";
  return createPortal(
    <div className="dark">
      <div
        className={`${open ? "opacity-100" : "hidden opacity-0"} fixed bottom-0 left-0 right-0 top-0 z-30 bg-black/70 transition-all lg:hidden`}
        onClick={onClose}
      />
      <div
        className={`fixed left-0 top-0 z-30 flex h-screen w-[210px] flex-col rounded bg-background transition-all lg:hidden ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
