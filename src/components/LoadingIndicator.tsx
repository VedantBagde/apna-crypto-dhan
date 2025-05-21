
import React from 'react';
import { Loader } from 'lucide-react';

type LoadingIndicatorProps = {
  message?: string;
};

const LoadingIndicator = ({ message = "Loading..." }: LoadingIndicatorProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader className="w-8 h-8 text-crypto-accent1 animate-spin" />
      <p className="mt-3 text-sm text-gray-300">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
