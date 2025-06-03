import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Wrench, ChevronDown } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [showTools, setShowTools] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, state } = useChat();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const canSend = message.trim().length > 0;
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSend) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canSend) {
        sendMessage(message);
        setMessage('');
      }
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files selected:', files);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto w-full">
      <div className={`flex items-center border rounded-lg overflow-hidden ${
        isDark 
          ? 'bg-gray-800 border-gray-700 focus-within:border-gray-600' 
          : 'bg-white border-gray-300 focus-within:border-blue-400'
      } shadow-sm transition-colors duration-200`}>
        {/* <button
          type="button"
          onClick={handleFileUpload}
          className={`p-2 ${
            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        /> */}
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${state.currentModel || 'AI'}...`}
          rows={1}
          className={`flex-1 py-3 px-2 resize-none outline-none ${
            isDark ? 'bg-gray-800 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
        />
        
        <button
          type="button"
          className={`p-2 ${
            isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Voice input"
        >
          <Mic size={18} />
        </button>
        
        <button
          type="submit"
          disabled={!canSend}
          className={`p-2 ${
            canSend
              ? isDark 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-500 hover:text-blue-600'
              : isDark 
                ? 'text-gray-600' 
                : 'text-gray-400'
          }`}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
      
      <div className={`mt-2 text-xs flex justify-end ${
        isDark ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <p>
          <span className="mr-1">Shift + Enter</span>
          for new line
        </p>
      </div>
    </form>
  );
};

export default ChatInput;

