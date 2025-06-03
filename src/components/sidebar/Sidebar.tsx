import React from 'react';
import { Plus, Search, ChevronDown, Pin, Folder, MoreHorizontal, X } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import ConversationList from './ConversationList';
import ToolsPanel from '../tools/ToolsPanel';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { startNewConversation } = useChat();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const isDark = theme === 'dark';
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <aside 
      className={`w-64 flex flex-col border-r ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      } transition-colors duration-200`}
    >
      <div className="p-3">
        <button
          onClick={startNewConversation}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition-colors duration-200`}
        >
          <Plus size={16} className="mr-2" />
          <span>New chat</span>
        </button>
      </div>
      
      <div className={`px-3 pb-2 ${isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
        <div className={`relative rounded-md ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          <input
            type="text"
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 rounded-md text-sm ${
              isDark 
                ? 'bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
            } border-0 focus:outline-none focus:ring-1`}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-2 py-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <div className="flex items-center">
              <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`ml-1 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Pinned chats</span>
            </div>
            <Pin size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          
          <ConversationList isPinned={true} searchQuery={searchQuery} />
        </div>
        
        <div className="px-2 py-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <div className="flex items-center">
              <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`ml-1 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Recent chats</span>
            </div>
          </div>
          
          <ConversationList isPinned={false} searchQuery={searchQuery} />
        </div>
        
        <div className="px-2 py-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <div className="flex items-center">
              <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`ml-1 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Folders</span>
            </div>
            <Folder size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          </div>
          
          <div className={`px-3 py-2 rounded-md ${
            isDark ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-100'
          }`}>
            <p className="text-xs text-center">No folders yet</p>
          </div>
        </div>
      </div>
      
      <div className={`p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <ToolsPanel isOpen={true}/>
      </div>
      
      {/* <div className={`p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`flex items-center justify-between p-2 rounded-md ${
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        } cursor-pointer`}>
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDark ? 'bg-gray-700' : 'bg-blue-100'
            }`}>
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-blue-600'}`}>TB</span>
            </div>
            <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>TBC Bank</span>
          </div>
          <MoreHorizontal size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        </div>
      </div> */}



    </aside>
  );
};

export default Sidebar;