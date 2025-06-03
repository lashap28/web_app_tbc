import React, { useState } from 'react';
import { MessageSquare, Pin, Trash2, Check, X, Edit2 } from 'lucide-react';
import { useChat, Conversation } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';

interface ConversationListProps {
  isPinned: boolean;
  searchQuery: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ isPinned, searchQuery }) => {
  const { state, dispatch } = useChat();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const filteredConversations = state.conversations.filter(conv => {
    const matchesPinned = conv.pinned === isPinned;
    const matchesSearch = searchQuery === '' || 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPinned && matchesSearch;
  });
  
  if (filteredConversations.length === 0) {
    return (
      <div className={`px-3 py-2 rounded-md ${
        isDark ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-100'
      }`}>
        <p className="text-xs text-center">
          {isPinned 
            ? 'No pinned conversations' 
            : searchQuery 
              ? 'No conversations match your search' 
              : 'No conversations yet'
          }
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-1">
      {filteredConversations.map(conversation => (
        <ConversationItem 
          key={conversation.id}
          conversation={conversation}
        />
      ))}
    </div>
  );
};

interface ConversationItemProps {
  conversation: Conversation;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ conversation }) => {
  const { state, dispatch } = useChat();
  const { theme } = useTheme();
  const [showActions, setShowActions] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(conversation.title);
  
  const isDark = theme === 'dark';
  const isActive = state.currentConversationId === conversation.id;
  
  const handleClick = () => {
    if (!isEditing) {
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation.id });
    }
  };
  
  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'PIN_CONVERSATION', payload: conversation.id });
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_CONVERSATION', payload: conversation.id });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ 
      type: 'UPDATE_CONVERSATION_TITLE', 
      payload: { 
        id: conversation.id, 
        title: editedTitle 
      } 
    });
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedTitle(conversation.title);
    setIsEditing(false);
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div
      className={`group flex items-center px-2 py-2 rounded-md cursor-pointer ${
        isActive
          ? isDark 
            ? 'bg-gray-700' 
            : 'bg-blue-50'
          : isDark 
            ? 'hover:bg-gray-700' 
            : 'hover:bg-gray-200'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <MessageSquare 
        size={16} 
        className={`mr-2 flex-shrink-0 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`} 
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={`w-full px-1 py-0.5 text-sm rounded ${
              isDark 
                ? 'bg-gray-800 text-gray-200 border-gray-600' 
                : 'bg-white text-gray-800 border-gray-300'
            } border`}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <p className={`text-sm font-medium truncate ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {conversation.title}
          </p>
        )}
        <div className="flex items-center">
          <span className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {formatDate(conversation.timestamp)}
          </span>
          <span className={`mx-1 text-xs ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>•</span>
          <span className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {conversation.model}
          </span>
        </div>
      </div>
      
      {(showActions || conversation.pinned || isEditing) && (
        <div className="flex items-center ml-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className={`p-1 rounded-md ${
                  isDark ? 'hover:bg-gray-600 text-green-400' : 'hover:bg-gray-300 text-green-600'
                }`}
                aria-label="Save changes"
              >
                <Check size={14} />
              </button>
              <button
                onClick={handleCancel}
                className={`p-1 rounded-md ${
                  isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-300 text-gray-600'
                }`}
                aria-label="Cancel editing"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className={`p-1 rounded-md ${
                  isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-300 text-gray-600'
                }`}
                aria-label="Edit conversation name"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={handlePin}
                className={`p-1 rounded-md ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-300'
                }`}
                aria-label={conversation.pinned ? 'Unpin conversation' : 'Pin conversation'}
              >
                <Pin 
                  size={14} 
                  className={conversation.pinned 
                    ? 'text-blue-500 fill-blue-500' 
                    : isDark ? 'text-gray-400' : 'text-gray-500'
                  } 
                />
              </button>
              <button
                onClick={handleDelete}
                className={`p-1 rounded-md ${
                  isDark ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' : 'hover:bg-gray-300 text-gray-500 hover:text-red-500'
                }`}
                aria-label="Delete conversation"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversationList;