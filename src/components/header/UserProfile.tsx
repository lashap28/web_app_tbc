import React, { useState } from 'react';
import { User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isDark ? 'bg-gray-700' : 'bg-blue-100'
        }`}>
          <User size={16} className={isDark ? 'text-gray-300' : 'text-blue-600'} />
        </div>
        <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
      </button>
      
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className={`px-4 py-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className="text-sm font-medium">TBC Bank User</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>user@tbcbank.ge</p>
          </div>
          
          <button
            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Settings size={16} className="mr-2" />
            <span>Settings</span>
          </button>
          
          <button
            className={`flex items-center w-full text-left px-4 py-2 text-sm ${
              isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <LogOut size={16} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;