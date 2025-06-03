import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';

interface ModelSelectorProps {
  models: string[];
  currentModel: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, currentModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useChat();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const handleModelChange = (model: string) => {
    dispatch({ type: 'SET_CURRENT_MODEL', payload: model });
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
          isDark 
            ? 'bg-gray-700 hover:bg-gray-600' 
            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
        } transition-colors duration-200`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentModel}</span>
        {isOpen ? 
          <ChevronUp size={16} className="ml-1" /> : 
          <ChevronDown size={16} className="ml-1" />
        }
      </button>
      
      {isOpen && (
        <div 
          className={`absolute z-10 mt-1 w-48 rounded-md shadow-lg py-1 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
          role="listbox"
        >
          {models.map((model) => (
            <button
              key={model}
              className={`block w-full text-left px-4 py-2 text-sm ${
                model === currentModel
                  ? isDark 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-blue-50 text-blue-700'
                  : isDark 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              } transition-colors duration-200`}
              role="option"
              aria-selected={model === currentModel}
              onClick={() => handleModelChange(model)}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelSelector;