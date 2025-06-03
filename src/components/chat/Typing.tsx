import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Typing: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="flex space-x-1.5">
      <div className={`w-2 h-2 rounded-full animate-bounce ${
        isDark ? 'bg-gray-400' : 'bg-gray-500'
      }`} style={{ animationDelay: '0ms' }}></div>
      <div className={`w-2 h-2 rounded-full animate-bounce ${
        isDark ? 'bg-gray-400' : 'bg-gray-500'
      }`} style={{ animationDelay: '150ms' }}></div>
      <div className={`w-2 h-2 rounded-full animate-bounce ${
        isDark ? 'bg-gray-400' : 'bg-gray-500'
      }`} style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export default Typing;