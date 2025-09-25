import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-500',
    text: 'text-white',
  },
  error: {
    icon: AlertTriangle,
    bg: 'bg-red-500',
    text: 'text-white',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-500',
    text: 'text-white',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`fixed top-5 right-5 z-[100] flex items-center justify-between max-w-sm w-full p-4 rounded-lg shadow-lg ${config.bg} ${config.text} toast-animate-in`}
    >
      <div className="flex items-center">
        <Icon className="h-6 w-6 mr-3" />
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toast;
