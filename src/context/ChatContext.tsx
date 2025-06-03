import React, { createContext, useContext, useState, useReducer } from 'react';

// Types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
  isLoading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  model: string;
  timestamp: number;
  pinned: boolean;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  conversations: string[];
}

export interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  folders: Folder[];
  availableModels: string[];
  currentModel: string;
}

type ChatAction =
  | { type: 'SET_CURRENT_MODEL'; payload: string }
  | { type: 'NEW_CONVERSATION'; payload: Conversation }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'UPDATE_MESSAGE'; payload: { conversationId: string; messageId: string; message: Partial<Message> } }
  | { type: 'PIN_CONVERSATION'; payload: string }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'CREATE_FOLDER'; payload: Folder }
  | { type: 'ADD_TO_FOLDER'; payload: { conversationId: string; folderId: string } }
  | { type: 'UPDATE_CONVERSATION_TITLE'; payload: { id: string; title: string } };

const initialModels = ['Gemini 2.5','GPT4o-mini', 'Claude-3.5', 'Llama-3.2', 'Gemma-3', 'DeepSeek', 'Custom'];

const initialState: ChatState = {
  conversations: [],
  currentConversationId: null,
  folders: [],
  availableModels: initialModels,
  currentModel: initialModels[0],
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_CURRENT_MODEL':
      return {
        ...state,
        currentModel: action.payload,
      };
    case 'NEW_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversationId: action.payload.id,
      };
    case 'SET_CURRENT_CONVERSATION':
      return {
        ...state,
        currentConversationId: action.payload,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? { ...conv, messages: [...conv.messages, action.payload.message] }
            : conv
        ),
      };
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                messages: conv.messages.map(msg =>
                  msg.id === action.payload.messageId
                    ? { ...msg, ...action.payload.message }
                    : msg
                ),
              }
            : conv
        ),
      };
    case 'PIN_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload
            ? { ...conv, pinned: !conv.pinned }
            : conv
        ),
      };
    case 'DELETE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.filter(conv => conv.id !== action.payload),
        currentConversationId:
          state.currentConversationId === action.payload
            ? state.conversations.length > 1
              ? state.conversations.find(c => c.id !== action.payload)?.id || null
              : null
            : state.currentConversationId,
      };
    case 'CREATE_FOLDER':
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    case 'ADD_TO_FOLDER':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? { ...conv, folderId: action.payload.folderId }
            : conv
        ),
        folders: state.folders.map(folder =>
          folder.id === action.payload.folderId
            ? { ...folder, conversations: [...folder.conversations, action.payload.conversationId] }
            : folder
        ),
      };
    case 'UPDATE_CONVERSATION_TITLE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id
            ? { ...conv, title: action.payload.title }
            : conv
        ),
      };
    default:
      return state;
  }
};

interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  sendMessage: (content: string) => Promise<void>;
  startNewConversation: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New conversation',
      messages: [],
      model: state.currentModel,
      timestamp: Date.now(),
      pinned: false,
    };
    
    dispatch({ type: 'NEW_CONVERSATION', payload: newConversation });
  };

  const sendMessage = async (content: string) => {
    if (!state.currentConversationId) {
      startNewConversation();
    }
    
    const conversationId = state.currentConversationId!;
    
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId, message: userMessage },
    });
    
    const assistantMessageId = generateId();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      model: state.currentModel,
      isLoading: true,
    };
    
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { conversationId, message: assistantMessage },
    });
    
    setTimeout(() => {
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          conversationId,
          messageId: assistantMessageId,
          message: {
            content: `This is a simulated response from ${state.currentModel} model. In a real implementation, this would connect to the appropriate AI model API.`,
            isLoading: false,
          },
        },
      });
      
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation && conversation.title === 'New conversation') {
        dispatch({
          type: 'UPDATE_CONVERSATION_TITLE',
          payload: {
            id: conversationId,
            title: content.length > 30 ? `${content.substring(0, 30)}...` : content,
          },
        });
      }
    }, 1500);
  };

  return (
    <ChatContext.Provider value={{ state, dispatch, sendMessage, startNewConversation }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};