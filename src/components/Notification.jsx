import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const Notification = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} ${textColor} p-4 rounded-lg shadow-lg flex items-center gap-2`}>
      <Icon className="w-5 h-5" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
};
