import React from 'react';
import { Notebook as Robot, MessageSquare, FileText, Mic, Search, Layers } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';

const WelcomeScreen: React.FC = () => {
  const { state } = useChat();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-12">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
        isDark ? 'bg-blue-600' : 'bg-blue-100'
      }`}>
        <Robot size={28} className={isDark ? 'text-white' : 'text-blue-600'} />
      </div>
      
      <h1 className={`text-2xl font-bold mb-2 text-center ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Welcome to TBC Bank AI
      </h1>
      
      <p className={`text-center max-w-md mb-8 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Start a conversation with our AI assistant. You can ask questions, analyze documents, and more.
      </p>
      
      <div className={`text-sm mb-4 px-3 py-1 rounded-full ${
        isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
      }`}>
        Currently using {state.currentModel}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-8">
        <FeatureCard 
          icon={<MessageSquare size={20} />}
          title="Start a conversation"
          description="Ask anything from simple questions to complex tasks"
        />
        <FeatureCard 
          icon={<FileText size={20} />}
          title="Upload documents"
          description="Analyze documents, extract information, and get insights"
        />
        <FeatureCard 
          icon={<Search size={20} />}
          title="Internet search"
          description="Get up-to-date information from the web"
        />
      </div>
      
      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        Powered by TBC Bank R&D
      </p>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={`p-4 rounded-lg ${
      isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50 border border-gray-200'
    } transition-colors duration-200`}>
      <div className={`w-8 h-8 rounded-md flex items-center justify-center mb-3 ${
        isDark ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'
      }`}>
        {icon}
      </div>
      <h3 className={`font-medium mb-1 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

export default WelcomeScreen;