import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Carregando...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-white">
      <Loader2 className="w-12 h-12 animate-spin mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};