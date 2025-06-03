import React from 'react';
import { FileUp, Search, Wrench, MessageSquare, RefreshCw, Lightbulb, Mail, Database, Upload } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import FileUploader from './FileUploader';

interface ToolsPanelProps {
  isOpen: boolean;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({ isOpen }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<'files' | 'tools'>('files');
  
  const isDark = theme === 'dark';
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <aside className={`w-64 flex flex-col border-l ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
    } transition-colors duration-200`}>
      <div className={`flex border-b ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <button
          onClick={() => setActiveTab('files')}
          className={`flex-1 py-3 text-sm font-medium text-center ${
            activeTab === 'files'
              ? isDark 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-blue-600 border-b-2 border-blue-600'
              : isDark 
                ? 'text-gray-400 hover:text-gray-300' 
                : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Files
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex-1 py-3 text-sm font-medium text-center ${
            activeTab === 'tools'
              ? isDark 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-blue-600 border-b-2 border-blue-600'
              : isDark 
                ? 'text-gray-400 hover:text-gray-300' 
                : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Tools
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'files' ? (
          <FileUploader />
        ) : (
          <div className="space-y-3">
            <ToolItem 
              icon={<Search size={16} />}
              title="Internet Search"
              description="Enable web searches for up-to-date information"
              isToggle={true}
            />
            <ToolItem 
              icon={<Lightbulb size={16} />}
              title="Deep Research Mode"
              description="More thorough analysis for complex questions"
              isToggle={true}
            />
            <ToolItem 
              icon={<RefreshCw size={16} />}
              title="Chain of Thought"
              description="Show AI reasoning process step by step"
              isToggle={true}
            />
            <ToolItem 
              icon={<Mail size={16} />}
              title="Email Integration"
              description="Connect to Outlook or Gmail"
              isToggle={false}
            />
            <ToolItem 
              icon={<Database size={16} />}
              title="JIRA Integration"
              description="Create and manage JIRA tickets"
              isToggle={false}
            />
            <ToolItem 
              icon={<MessageSquare size={16} />}
              title="Microsoft Teams"
              description="Share conversations with Teams"
              isToggle={false}
            />
          </div>
        )}
      </div>
    </aside>
  );
};

interface ToolItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isToggle: boolean;
}

const ToolItem: React.FC<ToolItemProps> = ({ icon, title, description, isToggle }) => {
  const { theme } = useTheme();
  const [isEnabled, setIsEnabled] = React.useState(false);
  
  const isDark = theme === 'dark';
  
  return (
    <div className={`p-3 rounded-lg ${
      isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded flex items-center justify-center mr-2 ${
            isDark ? 'bg-gray-600 text-blue-400' : 'bg-blue-50 text-blue-600'
          }`}>
            {icon}
          </div>
          <h3 className={`font-medium text-sm ${
            isDark ? 'text-gray-200' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>
        
        {isToggle ? (
          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full ${
              isEnabled
                ? isDark ? 'bg-blue-600' : 'bg-blue-500'
                : isDark ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isEnabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        ) : (
          <button
            className={`text-xs px-2 py-1 rounded ${
              isDark 
                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Connect
          </button>
        )}
      </div>
      
      <p className={`text-xs ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  );
};

export default ToolsPanel;