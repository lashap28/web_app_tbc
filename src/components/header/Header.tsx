import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useChat } from '../../context/ChatContext';
import ModelSelector from './ModelSelector';
import UserProfile from './UserProfile';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { state } = useChat();
  
  const isDark = theme === 'dark';
  
  return (
    <header 
      className={`h-14 flex items-center justify-between px-4 border-b ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } transition-colors duration-200`}
    >
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className={`p-2 rounded-md mr-2 ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center">
          <span className="font-semibold text-lg mr-2">TBC Bank AI</span>
          <div 
            className={`h-6 w-px mx-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
          ></div>
        </div>
        
        <ModelSelector 
          models={state.availableModels} 
          currentModel={state.currentModel} 
        />
      </div>
      
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-md ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          } transition-colors duration-200 mr-2`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;