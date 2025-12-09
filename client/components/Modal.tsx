"use client";

import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl">
        {/* Close X */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded p-1 text-slate-400 transition hover:bg-slate-800/50 hover:text-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {title && (
          <h2 className="mb-4 text-center text-xl font-semibold text-slate-50">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
