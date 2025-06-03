import React from 'react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import ToolsPanel from '../tools/ToolsPanel';

const ChatArea: React.FC = () => {
  const { state } = useChat();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const hasConversation = state.currentConversationId !== null;
  const currentConversation = state.currentConversationId 
    ? state.conversations.find(c => c.id === state.currentConversationId) 
    : null;
  
  return (
    <div className={`flex flex-col h-full ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      {currentConversation && (
        <div className={`hidden md:flex items-center px-4 py-2 border-b ${
          isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'
        }`}>
          <h2 className={`text-lg font-semibold ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {currentConversation.title}
          </h2>
          <div className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
            isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
          }`}>
            {currentConversation.model}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        {hasConversation ? (
          <MessageList />
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <div className={`p-4 border-t ${
        isDark ? 'border-gray-800' : 'border-gray-100'
      }`}>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatArea;