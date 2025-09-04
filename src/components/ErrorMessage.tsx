import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }: { message?: string, onClose?: () => void }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
      <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
      <span className="text-red-700 flex-1">{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-red-500 hover:text-red-700 flex-shrink-0"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;