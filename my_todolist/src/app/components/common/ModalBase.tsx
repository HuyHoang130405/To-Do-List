"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalBase = ({ isOpen, onClose, children }: ModalBaseProps) => {
  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* content */}
          <motion.div
            initial={{ scale: 1, opacity: 0, y: 0 }}  // 👈 không bị nhỏ hay lệch
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1, opacity: 0, y: 0 }}     // 👈 tắt đi thì chỉ fade
            transition={{ duration: 0.2 }}
            className="relative z-10 bg-[#1C2341] rounded-2xl shadow-xl p-6 w-[400px] max-w-[90%] text-white"
          >
            {children}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
