// src/app/providers/AIProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useChatHistory } from '@/app/hooks/useChatHistory';
import { ExtendedMessage } from '@/app/types/message';

interface AIState {
  messages: ExtendedMessage[];
  model: 'deepseek' | 'google';
  setMessages: (messages: ExtendedMessage[] | ((prev: ExtendedMessage[]) => ExtendedMessage[])) => void;
  setModel: (model: 'deepseek' | 'google') => void;
  clearMessages: () => void;
  isInitialized: boolean;
}

const AIContext = createContext<AIState | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [model, setModel] = useState<'deepseek' | 'google'>('deepseek');
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = usePrivy();
  const { chats } = useChatHistory();
  
  // Load most recent chat on user login - but only once
  const initializeChat = useCallback(() => {
    if (!isInitialized && user?.id && chats && chats.length > 0) {
      // Sort by createdAt in descending order and get the most recent chat
      const sortedChats = [...chats].sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt?.toDate?.() || a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt?.toDate?.() || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      
      if (sortedChats[0]?.messages) {
        setMessages(sortedChats[0].messages as ExtendedMessage[]);
      }
      setIsInitialized(true);
    }
  }, [user?.id, chats, isInitialized]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <AIContext.Provider value={{ 
      messages, 
      model, 
      setMessages, 
      setModel,
      clearMessages,
      isInitialized
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}