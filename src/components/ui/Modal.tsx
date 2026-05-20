'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-[#0C0A08] border border-white/[0.06] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/[0.04]">
              {title && <h3 className="text-sm font-medium text-white">{title}</h3>}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors ml-auto"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
