"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { ModalBase } from "./ModalBase";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Xác nhận xoá",
  message = "Bạn có chắc chắn muốn xoá task này không? Hành động này không thể hoàn tác.",
  onClose,
  onConfirm,
}) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-5 text-center">
        {/* Icon */}
        <div className="p-4 rounded-full bg-red-500/20 shadow-inner">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-300 text-sm leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 w-full mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800/60 text-white hover:bg-gray-700/80 transition font-medium border border-white/10"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            Xoá ngay
          </button>
        </div>
      </div>
    </ModalBase>
  );
};
