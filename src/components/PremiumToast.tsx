import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface PremiumToastProps {
  toast: Toast | null;
  onClose: () => void;
}

export function PremiumToast({ toast, onClose }: PremiumToastProps) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const gradients = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-pink-500',
    info: 'from-[#6C63FF] to-[#4EA8E9]'
  };

  const Icon = icons[toast.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-6 right-6 z-50 max-w-md"
      >
        <div className="relative">
          {/* Glow */}
          <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradients[toast.type]} rounded-2xl blur-xl opacity-50`} />
          
          {/* Toast Content */}
          <div className="relative glass-medium rounded-2xl border border-white/10 p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradients[toast.type]} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            
            <p className="text-white flex-1">{toast.message}</p>
            
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for using toasts
export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({
      id: Math.random().toString(36).substr(2, 9),
      type,
      message
    });
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    hideToast
  };
}
