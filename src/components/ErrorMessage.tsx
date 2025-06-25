import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-white text-center p-8">
      <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Oops! Algo deu errado</h3>
      <p className="text-white/80 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors backdrop-blur-md border border-white/20"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Tentar Novamente</span>
        </button>
      )}
    </div>
  );
};