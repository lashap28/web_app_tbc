import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import { Copy, RotateCcw } from 'lucide-react';
import Typing from './Typing';

const MessageList: React.FC = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const currentConversation = state.currentConversationId 
    ? state.conversations.find(c => c.id === state.currentConversationId) 
    : null;
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);
  
  if (!currentConversation) {
    return null;
  }
  
  return (
    <div className="max-w-3xl mx-auto w-full py-4 px-4">
      {currentConversation.messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

interface MessageItemProps {
  message: {
    id: string;
    role: string;
    content: string;
    timestamp: number;
    model?: string;
    isLoading?: boolean;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);
  
  const isDark = theme === 'dark';
  const isUser = message.role === 'user';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`py-5 ${
      !isUser && isDark ? 'bg-gray-800 -mx-4 px-4' : ''
    }`}>
      <div className="flex items-start space-x-3 mb-1">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? isDark ? 'bg-blue-600' : 'bg-blue-100' 
            : isDark ? 'bg-green-600' : 'bg-green-100'
        }`}>
          <span className={`text-sm font-medium ${
            isUser 
              ? isDark ? 'text-white' : 'text-blue-600' 
              : isDark ? 'text-white' : 'text-green-600'
          }`}>
            {isUser ? 'U' : 'A'}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <p className={`font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-900'
            }`}>
              {isUser ? 'You' : 'TBC Bank AI'}
            </p>
            
            {message.model && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}>
                {message.model}
              </span>
            )}
            
            <span className={`ml-2 text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          
          {message.isLoading ? (
            <div className="mt-1">
              <Typing />
            </div>
          ) : (
            <div className="mt-1">
              <p className={`whitespace-pre-wrap ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {message.content}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {!isUser && !message.isLoading && (
        <div className="flex space-x-2 ml-11 mt-2">
          <button
            onClick={copyToClipboard}
            className={`flex items-center px-2 py-1 rounded text-xs ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <Copy size={14} className="mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          
          <button
            className={`flex items-center px-2 py-1 rounded text-xs ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <RotateCcw size={14} className="mr-1" />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageList;