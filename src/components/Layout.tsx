import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import Sidebar from './sidebar/Sidebar';
import ChatArea from './chat/ChatArea';
import Header from './header/Header';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ChatProvider>
      <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Header 
          toggleSidebar={toggleSidebar}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={sidebarOpen} />
          <main className="flex-1 flex flex-col overflow-hidden">
            <ChatArea />
          </main>
        </div>
      </div>
    </ChatProvider>
  );
};

export default Layout;